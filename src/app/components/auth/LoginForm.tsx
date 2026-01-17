"use client";

import React from 'react';
import { Input } from './Input';

export function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic would go here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Username"
        id="login-username"
        type="text"
        placeholder="Enter your username"
        required
        autoFocus
      />
      <Input
        label="Password"
        id="login-password"
        type="password"
        placeholder="Enter your password"
        required
      />
      
      <button
        type="submit"
        className="mt-2 w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
      >
        Log in
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a
          href="/signup"
          className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}