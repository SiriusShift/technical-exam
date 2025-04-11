import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types";
import { clx, Container, Heading, Text } from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";

type AdminProductDeal = AdminProduct & {
  deal?: {
    id: string;
    name: string;
    code: string;
    quantity: number;
    disc_percent: number;
  };
};

const ProductBrandWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+deal.*",
      }),
    queryKey: [["product", product.id]],
  });
  const dealName = (queryResult?.product as AdminProductDeal)?.deal?.name;
  const dealCode = (queryResult?.product as AdminProductDeal)?.deal?.code;
  const dealQuantity = (queryResult?.product as AdminProductDeal)?.deal
    ?.quantity;
  const dealDiscPercent = (queryResult?.product as AdminProductDeal)?.deal
    ?.disc_percent;

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Deal</Heading>
        </div>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          Name
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {dealName || "-"}
        </Text>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          Code
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {dealCode || "-"}
        </Text>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          Percentage
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {dealDiscPercent || "-"}%
        </Text>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductBrandWidget;
