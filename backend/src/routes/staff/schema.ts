import { z } from "zod";

const staffSchema = z.object({
  email: z.string().min(1, "emailnya di isi dong"),
  name: z.string().min(1, "namanya di isi dong"),
  password: z.string().min(1, "passwordnya di isi dong"),
});

export const staffAuthSchema = z.object({
  email: z.string().min(1, "emailnya di isi dong"),
  password: z.string().min(1, "passwordnya di isi dong"),
});

export default staffSchema;
