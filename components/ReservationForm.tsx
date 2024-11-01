// components/ReservationForm.tsx
"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ReservationForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogContent>
      <DialogTitle>Potvrdenie rezervácie</DialogTitle>
      <Input placeholder="Meno" className="mb-4" />
      <Input placeholder="Email" type="email" className="mb-4" />
      <Input placeholder="Telefón" type="tel" className="mb-4" />
      <Button onClick={onClose} className="w-full bg-green-600 text-white">
        Potvrdiť rezerváciu
      </Button>
    </DialogContent>
  </Dialog>
);

export default ReservationForm;
