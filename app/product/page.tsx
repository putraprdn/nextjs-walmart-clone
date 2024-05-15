import Image from "next/image";
import { notFound } from "next/navigation";
import fetchProduct from "@/lib/fetchProduct";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AddToCard from "@/components/AddToCard";

type Props = {
	searchParams: {
		url: string;
	};
};

async function ProductPage({ searchParams: { url } }: Props) {
	const product = await fetchProduct(url);
	if (!product) return notFound();

	return (
		<div className="p-4 lg:p-10 flex flex-col lg:flex-row w-full">
			<div className="hidden lg:inline space-y-4">
				{product.content.images.map((image, i) => (
					<Image
						key={image}
						src={image}
						alt={`${product.content.title} ${i}`}
						width={90}
						height={90}
						className="border rounded-sm"
					/>
				))}
			</div>

			<Carousel
				opts={{
					loop: true,
				}}
				className="w-3/5 mb-10 lg:mb-0 lg:w-full self-start flex items-center max-w-xl mx-auto lg:mx-20"
			>
				<CarouselContent>
					{product.content.images.map((image, i) => (
						<CarouselItem key={i}>
							<div className="p-1">
								<div className="flex aspect-square items-center justify-center p-2 relative">
									<Image
										src={image}
										alt={`${product.content.title} ${i}`}
										width={400}
										height={400}
									/>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			<div className="flex-1 border rounded-md w-full p-5 space-y-5">
				<h1 className="text-3xl font-bold">{product.content.title}</h1>

				<div className="space-x-2">
					{product.content.breadcrumbs.map((breadcrumb, i) => (
						<Badge
							key={i}
							className={breadcrumb}
							variant={"outline"}
						>
							{breadcrumb}
						</Badge>
					))}
				</div>

				<div
					dangerouslySetInnerHTML={{
						__html: product.content.description,
					}}
					className="py-5"
				/>

				{product.content.rating && (
					<p className="text-yellow-500 text-sm">
						{product.content.rating.rating} ★
						<span className="text-gray-400 ml-2">
							({product.content.rating.count})
						</span>
					</p>
				)}

				<p className="text-2xl font-bold mt-2">
					{product?.content?.currency} {product.content.price}
				</p>

                <AddToCard product={product} />

				<hr />

				<h3 className="font-bold text-xl pt-10">Specifications</h3>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Specification</TableHead>
							<TableHead>Value</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{product.content.specifications.map((spec) => (
							<TableRow key={spec.key}>
								<TableCell className="font-bold">
									{spec.key}
								</TableCell>
								<TableCell>{spec.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default ProductPage;
