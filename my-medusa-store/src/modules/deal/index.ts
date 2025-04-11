import { Module } from "@medusajs/framework/utils";
import DealModuleService from "./service";

export const DEAL_MODULE = "deal";

export default Module(DEAL_MODULE, {
  service: DealModuleService,
});
