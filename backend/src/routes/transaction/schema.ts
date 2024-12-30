import { z } from "zod";

const claimSchema = z.object({
  user_id: z.string().min(1, "user id required"),
  reward_id: z.string().min(1, "user id required"),
  claim_qty: z.number().min(1, "minimal claim 1 item yaa"),
});

export const cleanProgressSchema = z.object({
  report_id: z.string().min(1, "report id is required"),
  staff_id: z.string().min(1, "staff id is required"),
});

export const closeProgressSchema = z.object({
  report_id: z.string().min(1, "report id is required"),
  staff_id: z.string().min(1, "staff id is required"),
  activity_id: z.string().min(1, "activity id is required"),
});

export const closeClaimSchema = z.object({
  claim_id: z.string().min(1, "claim id is required"),
});

export default claimSchema;
