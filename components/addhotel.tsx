"use client";

import React, { useState } from "react";

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    numberOfBeds: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/createroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          numberOfBeds: "",
          description: "",
          price: "",
          imageUrl: "",
        });
        setErrors([]);
        alert("Izba bola úspešne pridaná!");
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err: any) => err.message));
        } else {
          alert("Nepodarilo sa pridať izbu.");
        }
      }
    } catch (error) {
      console.error("Chyba pri odosielaní formulára:", error);
      alert("Nepodarilo sa pridať izbu.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Pridať izbu</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Názov izby"
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="numberOfBeds"
          value={formData.numberOfBeds}
          onChange={handleChange}
          placeholder="Počet postelí"
          className="w-full border rounded p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Popis"
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Cena (€)"
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="URL obrázka"
          className="w-full border rounded p-2"
        />

        {formData.imageUrl && (
          <div className="flex justify-center">
            <img
              src={formData.imageUrl}
              alt="Náhľad obrázka"
              className="rounded-md max-w-full max-h-40"
            />
          </div>
        )}

        {errors.length > 0 && (
          <div className="text-red-500 text-sm space-y-2">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Pridať izbu
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
