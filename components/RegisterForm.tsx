"use client";

import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    if (!name || !email || !password) {
      setErrors((prevErrors) => [...prevErrors, "Prosím vyplňte všetky polia"]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setErrors((prevErrors) => [...prevErrors, data.message]);
        } else if (data.errors) {
          setErrors(data.errors);
        }
        return;
      }

      console.log("Úspešne zaregistrovaný:", data);
      window.location.href = "/login";
    } catch (error) {
      setErrors(["Chyba pri registrácii. Skúste to neskôr."]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-gray-400 py-10 px-20 rounded-2xl shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-bold">Registrácia</h2>

        {errors.length > 0 && (
          <div className="mb-4 text-red-500">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">* Meno:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Priezvisko:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">* Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">* Heslo:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <p className="mb-4 text-blue-600 underline">
          <a href="/login">Prihlásiť sa</a>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Registrujem..." : "Registrovať"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
