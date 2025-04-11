import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createBrandWorkflow } from "../../../workflows/create-brand";
import { PostAdminCreateDeal } from "./validators";
import { z } from "zod";
import { createDealWorkflow } from "../../../workflows/create-deal";

type PostAdminCreateDealType = z.infer<typeof PostAdminCreateDeal>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateDealType>,
  res: MedusaResponse
) => {
  const { result } = await createDealWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  res.json({ deal: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { data: deals } = await query.graph({
    entity: "deal",
    fields: ["*", "products.*"],
  });

  res.json({ deals });
};
