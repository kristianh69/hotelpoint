import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Meno je povinné"), // Povinné pole
  surname: yup.string().optional(), // Voliteľné pole
  email: yup.string().email("Neplatný email").required("Email je povinný"),
  password: yup
    .string()
    .min(6, "Heslo musí mať aspoň 6 znakov")
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
