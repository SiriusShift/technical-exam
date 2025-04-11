import { MedusaService } from "@medusajs/framework/utils";
import { Deal } from "./models/deal";

class DealModuleService extends MedusaService({
  Deal,
}) {}

export default DealModuleService;
