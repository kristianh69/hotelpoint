"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const session = useSession();
  if (session.status === "authenticated") redirect("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
      console.log("User successfully logged in");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-gray-400 py-10 px-20 rounded-2xl shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-bold">Login</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 mb-5 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
          <p className="mt-2 text-blue-600 underline">
            <a href="/registracia">Nemam učet</a>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
