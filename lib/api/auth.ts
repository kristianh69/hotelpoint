export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<string> => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await response.json()).id;
};
