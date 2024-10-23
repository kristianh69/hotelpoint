"use client";

import React, { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setError("Prosím vyplňte všetky polia");
    } else {
      setError("");
      console.log("Registrujem:", { username, email, password });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-gray-400 py-10 px-20  rounded-2xl shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-bold">Registrácia</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Užívateľské meno:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Heslo:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <p className="mb-4 text-blue-600 underline">
          <a href="/login"> Prihlasiť sa </a>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrovať
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
