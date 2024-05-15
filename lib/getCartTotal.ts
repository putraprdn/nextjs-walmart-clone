import { ProductContent } from "@/typings/productTypings";

export function getCartTotal(products: ProductContent[]): string {
	const total = products.reduce(
		(acc: number, curr: ProductContent) => acc + curr.content.price,
		0
	);

	return `${
		products[0]?.content.currency ? products[0]?.content.currency : "$"
	} ${total.toFixed(2)}`;
}
