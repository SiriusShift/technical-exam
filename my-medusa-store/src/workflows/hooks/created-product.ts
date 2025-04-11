import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import DealModuleService from "../../modules/deal/service";
import { DEAL_MODULE } from "../../modules/deal";

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.deal_id) {
      return new StepResponse([], []);
    }

    const dealModuleService: DealModuleService = container.resolve(DEAL_MODULE);
    // Retrieve deal to ensure it exists and get customer ID if available
    await dealModuleService.retrieveDeal(additional_data.deal_id as string);

    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    // Create product-to-deal links
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [DEAL_MODULE]: {
          deal_id: additional_data.deal_id,
        },
      });
    }

    await link.create(links);

    logger.info("Linked products and customer to deal");

    return new StepResponse(links, links);
  },
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");

    await link.dismiss(links);
  }
);
