// app/auth/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1a1f2e] p-8 rounded-lg border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to the Clubhouse
          </h1>
          <p className="text-gray-400">
            Connect your Strava account to continue
          </p>
        </div>

        <button
          onClick={() => signIn('strava', { callbackUrl: '/clubhouse' })}
          className="w-full px-6 py-4 bg-[#fc4c02] text-white font-bold rounded-lg hover:bg-[#e44402] transition flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
          </svg>
          Continue with Strava
        </button>

        <p className="text-gray-500 text-sm text-center mt-6">
          We'll sync your runs automatically. No spam, ever.
        </p>
      </div>
    </div>
  );
}

