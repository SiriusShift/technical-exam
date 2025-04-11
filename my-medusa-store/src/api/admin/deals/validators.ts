import { z } from "zod";

export const PostAdminCreateDeal = z.object({
  name: z.string(),
  code: z.string(),
  quantity: z.number(),
  disc_percent: z.number(),
});
