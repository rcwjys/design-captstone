import { z } from "zod";

const reportSchema = z.object({
  description: z.string().min(1, "isi dulu dodng deskripsinya"),
  location_detail: z.string().min(1, "isi dulu dong detail lokasinya"),
  user_id: z.string().min(1, "user id is required"),
});

export default reportSchema;
