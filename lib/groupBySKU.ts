import { ProductContent } from "@/typings/productTypings";

export function groupBySKU(
	products: ProductContent[]
): Record<string, ProductContent[]> {
	return products?.reduce(
		(acc: Record<string, ProductContent[]>, curr: ProductContent) => {
			const sku = curr.content.meta.sku;
			if (!acc[sku]) {
				acc[sku] = [];
			}
			acc[sku].push(curr);
			return acc;
		},
		{}
	);
}
