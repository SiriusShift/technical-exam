import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { PostAdminCreateBrand } from "./admin/brands/validators";
import { z } from "zod";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { PostAdminCreateDeal } from "./admin/deals/validators";

export const GetBrandsSchema = createFindParams();
export const GetProductsQuery = createFindParams();

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetBrandsSchema, {
          defaults: ["id", "name", "products.*"],
          isList: true,
        }),
      ],
    },
    {
      matcher: "/store/products",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetProductsQuery, {
          defaults: [
            "id",
            "title",
            "description",
            "variants.id",
            "thumbnail",
            "discountable",
            "variants.title",
            "variants.prices.id",
            "variants.prices.amount",
            "variants.prices.currency_code", // Include the currency_code here
          ],
          isList: true,
        }),
      ],
    },
    {
      matcher: "/admin/deals",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateDeal)],
    },
    {
      matcher: "/admin/deals",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetProductsQuery, {
          defaults: [
            "id",
            "name",
            "code",
            "quantity",
            "disc_percent",
            "products.*",
          ],
          isList: true,
        }),
      ],
    },
  ],
});
