import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";
import DealModule from "../modules/deal";
import CustomerModule from "@medusajs/medusa/customer";

const productToDealLink = defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  DealModule.linkable.deal
);

// // Link Customers to Deals
// const customerToDealLink = defineLink(
//   {
//     linkable: CustomerModule.linkable.customer,
//     isList: true,
//   },
//   DealModule.linkable.deal
// );

export { productToDealLink };
