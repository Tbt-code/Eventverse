"use client";

import React from 'react';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back</h1>
        <LoginForm />
      </div>
    </div>
  );
}