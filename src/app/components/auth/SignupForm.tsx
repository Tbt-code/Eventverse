"use client";

import React from 'react';
import { Input } from './Input';

export function SignupForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic would go here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Email"
        id="signup-email"
        type="email"
        placeholder="name@example.com"
        required
        autoFocus
      />
      <Input
        label="Username"
        id="signup-username"
        type="text"
        placeholder="Choose a username"
        required
      />
      <Input
        label="Password"
        id="signup-password"
        type="password"
        placeholder="Create a password"
        required
      />
      <Input
        label="Confirm Password"
        id="signup-confirm-password"
        type="password"
        placeholder="Confirm your password"
        required
      />
      
      <button
        type="submit"
        className="mt-2 w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
      >
        Create account
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a
          href="/login"
          className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          Log in
        </a>
      </p>
    </form>
  );
}