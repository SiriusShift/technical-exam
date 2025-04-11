import { model } from "@medusajs/framework/utils";

export const Deal = model.define("deal", {
  id: model.id().primaryKey(),
  name: model.text(),
  code: model.text(),
  quantity: model.number(),
  disc_percent: model.number(),
});
