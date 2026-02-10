// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "strava",
      name: "Strava",
      type: "oauth",
      authorization: {
          url: "https://www.strava.com/oauth/authorize",
          params: {
            scope: "read,activity:read_all,profile:read_all", // Add activity:read_all
            approval_prompt: "force", // Force re-authorization
            response_type: "code",
          },
        },
      token: {
        url: "https://www.strava.com/oauth/token",
        async request({ client, params, checks, provider }) {
          // Manually exchange code for token
          const response = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: process.env.STRAVA_CLIENT_ID!,
              client_secret: process.env.STRAVA_CLIENT_SECRET!,
              code: params.code as string,
              grant_type: "authorization_code",
            }),
          });

          const tokens = await response.json();

          if (!response.ok) {
            console.error("Strava token error:", tokens);
            throw new Error("Failed to fetch Strava tokens");
          }

          return { tokens };
        },
      },
      userinfo: "https://www.strava.com/api/v3/athlete",
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: `${profile.firstname} ${profile.lastname}`,
          email: profile.email || null,
          image: profile.profile,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔐 SignIn callback triggered');
      console.log('Account provider:', account?.provider);
      console.log('Profile ID:', (profile as any)?.id);
    
      if (account?.provider === "strava" && profile) {
        try {
          const stravaProfile = profile as any;
        
          console.log('Checking for existing user with Strava ID:', stravaProfile.id);
        
          const { data: existingUser, error: selectError } = await supabase
            .from('users')
            .select('id')
            .eq('strava_id', stravaProfile.id)
            .single();  

          console.log('Existing user:', existingUser);
          console.log('Select error:', selectError);    

          if (!existingUser) {
            console.log('Creating new user...');
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                strava_id: stravaProfile.id,
                name: `${stravaProfile.firstname} ${stravaProfile.lastname}`,
                profile_image_url: stravaProfile.profile,
                email: stravaProfile.email,
              })
              .select()
              .single();
          
            console.log('New user created:', newUser);
            console.log('Insert error:', insertError);
          } 

          const { data: dbUser, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('strava_id', stravaProfile.id)
            .single();  

          console.log('DB User for account linking:', dbUser);
          console.log('User error:', userError);    

          if (dbUser && account.access_token) {
            console.log('Upserting account with tokens...');
            console.log('Has access token:', !!account.access_token);
            console.log('Has refresh token:', !!account.refresh_token);

            const { data: accountData, error: accountError } = await supabase
              .from('accounts')
              .upsert({
                user_id: dbUser.id,
                type: 'oauth',
                provider: 'strava',
                provider_account_id: stravaProfile.id.toString(),
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
              }, {
                onConflict: 'provider,provider_account_id'
              })
              .select();
          
            console.log('Account upsert result:', accountData);
            console.log('Account error:', accountError);
          } else {
            console.log('⚠️ Missing dbUser or access_token!');
          }

        } catch (error) {
          console.error('SignIn callback error:', error);
          return false; // Block sign-in on error
        }
      }

      console.log('SignIn callback complete');
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        const { data: dbUser } = await supabase
          .from('users')
          .select('id, strava_id, name, profile_image_url')
          .eq('strava_id', parseInt(token.sub))
          .single();

        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
            stravaId: dbUser.strava_id,
          };
        }
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = (profile as any).id.toString();
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};