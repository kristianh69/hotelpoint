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
