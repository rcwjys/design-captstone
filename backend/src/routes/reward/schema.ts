import { z } from "zod";

const rewardSchema = z.object({
  reward_name: z.string().min(1, "isi dulu dong nama rewardnya"),
  reward_stock: z.number().min(0, "eiitss stock nggak bisa lebih kecil dari 0"),
  reward_price: z.number().min(0, "eeeits harga nggak bisa lebih kecil dari 0"),
});

export const rewardsUpdateSchema = z.object({
  reward_name: z.string().min(1, "isi dulu dong nama rewardnya"),
  reward_stock: z.number().min(0, "eiitss stock nggak bisa lebih kecil dari 0"),
  reward_price: z.number().min(0, "eeeits harga nggak bisa lebih kecil dari 0"),
});

export default rewardSchema;
