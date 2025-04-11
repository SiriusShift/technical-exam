import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { DEAL_MODULE } from "../modules/deal";
import DealModuleService from "../modules/deal/service";

export type CreateDealStepInput = {
  name: string;
  code: string;
  quantity: number;
  disc_percent: number;
};

export const createDealStep = createStep(
  "create-deal-step",
  async (input: CreateDealStepInput, { container }) => {
    const dealModuleService: DealModuleService = container.resolve(DEAL_MODULE);

    const deal = await dealModuleService.createDeals(input);

    return new StepResponse(deal, deal.id);
  }
);

export const createDealWorkflow = createWorkflow(
  "create-deal",
  (input: CreateDealStepInput) => {
    const deal = createDealStep(input);

    return new WorkflowResponse(deal);
  }
);
