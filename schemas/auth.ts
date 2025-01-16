import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Meno je povinné"),
  surname: yup.string().optional(),
  email: yup
    .string()
    .email("Zadaný e-mail nie je platný")
    .required("E-mail je povinný"),

  password: yup
    .string()
    .min(8, "Heslo musí mať aspoň 8 znakov")
    .matches(/[A-Z]/, "Heslo musí obsahovať aspoň jedno veľké písmeno")

    .matches(/[0-9]/, "Heslo musí obsahovať aspoň jednu číslicu")

    .required("Heslo je povinné"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Neplatný email").required("Email je povinný"),
  password: yup.string().required("Heslo je povinné"),
});
export const roomSchema = yup.object().shape({
  name: yup.string().required("Názov je povinný"),
  numberOfBeds: yup
    .number()
    .typeError("Počet postelí musí byť číslo")
    .required("Počet postelí je povinný"),
  tags: yup.string().required("Popis je povinný").max(150),
  description: yup.string().required("Popis je povinný"),
  price: yup
    .number()
    .typeError("Cena musí byť číslo")
    .required("Cena je povinná"),
  imageUrl: yup
    .string()
    .url("Neplatná URL adresa")
    .required("URL obrázka je povinná"),
});

export const bookingSchema = yup.object().shape({
  RoomId: yup.number().required(),
  StartingDate: yup
    .string()
    .datetime()
    .transform((value) => {
      return new Date(value);
    })
    .required(),
  EndingDate: yup
    .string()
    .datetime()
    .transform((value) => {
      return new Date(value);
    })
    .required(),
});
export const deleteBooking = yup.object().shape({
  id: yup.string().required(),
});
