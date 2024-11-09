import { z } from "zod";

export const authSchema = z.object({
  username: z.string().trim().min(1, "ishh, usernamenya diisi dong"),
  password: z.string().min(1, "ish passwordnya diisi dong"),
});

export default authSchema;
