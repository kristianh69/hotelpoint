"use client";

import React, { useState } from "react";
import Image from "next/image";

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    numberOfBeds: "",
    description: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Spracovanie zmien v textových poliach
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Spracovanie nahratia obrázka
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Odoslanie formulára
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as string | Blob);
      }
    });

    try {
      const response = await fetch("api/createroom", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setFormData({
          name: "",
          numberOfBeds: "",
          description: "",
          price: "",
          image: null,
        });
        setImagePreview(null);
        alert("Izba bola úspešne pridaná!");
      } else {
        alert("Nepodarilo sa pridať izbu.");
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

        {/* Názov izby */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Názov izby"
          className="w-full border rounded p-2"
          required
        />

        {/* Počet postelí */}
        <input
          type="text"
          name="numberOfBeds"
          value={formData.numberOfBeds}
          onChange={handleChange}
          placeholder="Počet postelí"
          className="w-full border rounded p-2"
          required
        />

        {/* Popis izby */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Popis"
          className="w-full border rounded p-2"
        />

        {/* Cena */}
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Cena (€)"
          className="w-full border rounded p-2"
          required
        />

        {/* Obrázok */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded p-2"
        />

        {/* Náhľad obrázka */}
        {imagePreview && (
          <div className="flex justify-center">
            <Image
              src={imagePreview}
              alt="Náhľad obrázka"
              className="rounded-md max-w-full max-h-40"
              width={160}
              height={160}
            />
          </div>
        )}

        {/* Tlačidlo na odoslanie */}
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
