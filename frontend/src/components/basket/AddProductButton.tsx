import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {productsStub} from "@/data/products";
import {Select} from "@radix-ui/react-select";
import {PlusCircle} from "lucide-react";
import {SelectContent, SelectItem, SelectTrigger, SelectValue,} from "../ui/select";

export default function AddProductButton() {
	return (
		<div className="flex items-center">
			<div className="ml-auto flex items-center gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button size="sm" className="h-8 gap-1">
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Add Product
							</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add Product</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Choisir un produit" />
								</SelectTrigger>
								<SelectContent>
									{productsStub.map((product) => (
										<SelectItem value={product.id}>{product.name}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<DialogFooter>
							<Button type="submit">Add product</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
