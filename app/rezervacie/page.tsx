"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Typ pre záznam tabuľky
interface ReservationRecord {
  id: number;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  guests: number;
  price: number;
}

const initialData: ReservationRecord[] = [
  {
    id: 1,
    name: "Ján Novák",
    email: "jan.novak@example.com",
    startDate: "2024-11-01",
    endDate: "2024-11-05",
    guests: 2,
    price: 300,
  },
  {
    id: 2,
    name: "Mária Kováčová",
    email: "maria.kovacova@example.com",
    startDate: "2024-11-10",
    endDate: "2024-11-15",
    guests: 4,
    price: 600,
  },
];

export default function ReservationTable() {
  const [data, setData] = useState<ReservationRecord[]>(initialData);

  // Definícia stĺpcov
  const columns: ColumnDef<ReservationRecord>[] = [
    { header: "Meno", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Od kedy", accessorKey: "startDate" },
    { header: "Do kedy", accessorKey: "endDate" },
    { header: "Počet hostí", accessorKey: "guests" },
    { header: "Cena", accessorKey: "price" },
    {
      header: "Akcie",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          onClick={() => handleDelete(row.original.id)}
        >
          Odstrániť
        </Button>
      ),
    },
  ];

  // Funkcia na odstránenie záznamu
  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((record) => record.id !== id));
  };

  // Inicializácia tabuľky
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex justify-center mt-32">
      <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center font-semibold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="text-center">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
