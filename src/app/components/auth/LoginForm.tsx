"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';

export function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic would go here
  };

  return (
    <form onSubmit={handleSubmit} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-8 rounded-3xl shadow-xl flex flex-col gap-5">
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
        <Link
          to="/signup"
          className="font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}