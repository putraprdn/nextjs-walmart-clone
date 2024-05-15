"use client";

import useCartStore from "@/store";
import { ProductContent } from "@/typings/productTypings";
import { Button } from "./ui/button";
import RemoveFromCart from "./RemoveFromCart";

function AddToCard({ product }: { product: ProductContent }) {
	const [cart, addToCart] = useCartStore((state) => [
		state.cart,
		state.addToCart,
	]);

	const howManyInCart = cart.filter(
		(item) => item.content.meta.sku === product.content.meta.sku
	).length;

	const handleAdd = () => {
		addToCart(product);
	};

	if (howManyInCart > 0) {
		return (
			<div className="flex space-x-5 items-center">
				<RemoveFromCart product={product} />
				<span>{howManyInCart}</span>
				<Button
					className="bg-walmart hover:bg-walmart/50"
					onClick={handleAdd}
				>
					+
				</Button>
			</div>
		);
	}

	return <Button onClick={handleAdd}>Add to Cart</Button>;
}

export default AddToCard;
