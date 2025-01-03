import { User } from "../database";
import bcrypt from "bcrypt";
import prompt from "prompt-sync";

const vstup = prompt();

const addAdmin = async (
  email: string,
  name: string,
  surname: string,
  password: string
) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  await User.create({
    email: email,
    passwordHash: passwordHash,
    name: name,
    surname: surname || null,
    role: "admin",
  });
};

const name = vstup("uživatelske meno");
const surname = vstup("priezvisko");
const email = vstup("email");
const password = vstup("heslo");
addAdmin(email, name, surname, password);
