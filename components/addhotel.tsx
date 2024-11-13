"use client";

import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    NumberOfbeds: 1,
    description: "",
    tags: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value as string | Blob)
    );

    try {
      await axios.post("/api/rooms", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Izba bola úspešne pridaná!");
    } catch (error) {
      console.error("Chyba pri pridávaní izby:", error);
      alert("Nepodarilo sa pridať izbu.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Pridajte novú izbu</h2>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Názov izby"
          className="w-full"
          required
        />
        <Input
          type="number"
          name="NumberOfbeds"
          value={formData.NumberOfbeds}
          onChange={handleChange}
          placeholder="Počet postelí"
          className="w-full"
          min="1"
          required
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Popis"
          className="w-full"
        />
        <Input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Značky (napr. luxusná, rodinná)"
          className="w-full"
        />
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Cena (€)"
          className="w-full"
          min="0"
          step="0.01"
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        {imagePreview && (
          <div className="flex justify-center">
            <img
              src={imagePreview}
              alt="Náhľad obrázka"
              className="rounded-md max-w-full max-h-40"
            />
          </div>
        )}

        <Button type="submit" className="w-full bg-blue-600 text-white">
          Pridať izbu
        </Button>
      </form>
    </div>
  );
};

export default AddRoomForm;
