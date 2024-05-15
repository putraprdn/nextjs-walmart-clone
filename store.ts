import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductContent } from "./typings/productTypings";

interface CartState {
	cart: ProductContent[];
	addToCart: (product: ProductContent) => void;
	removeFromCart: (product: ProductContent) => void;
}

const useCartStore = create<CartState>()(
	devtools(
		persist(
			(set, get) => ({
				cart: [],
				addToCart: (product) =>
					set((state) => ({ cart: [...state.cart, product] })),
				removeFromCart: (product) => {
					const productToRemove = get().cart.findIndex(
						(item) =>
							item.content.meta.sku === product.content.meta.sku
					);

					set((state) => {
						const newCart = [...state.cart];

						newCart.splice(productToRemove, 1);
						return { cart: newCart };
					});
				},
			}),
			{
				name: "shopping-cart-storage",
			}
		)
	)
);

export default useCartStore;
