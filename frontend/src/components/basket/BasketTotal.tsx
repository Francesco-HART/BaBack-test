import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Product } from "../../data/products.ts";
import { Discount } from "@/data/discounts.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "../ui/button.tsx";
import { PlusCircle } from "lucide-react";
import { Input } from "../ui/input.tsx";

export default function BasketTotal({
  products,
  discounts,
}: {
  products: Product[];
  discounts: Discount[];
}) {
  return (
    <Card className="self-end w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>Total</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>100 €</span>
        </div>
        <div className="flex justify-between gap-1">
          <Input className="h-6" />
          <Button size="sm" className="h-6 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Ajouter un coupon
            </span>
          </Button>
        </div>
        <div className="flex justify-between">
          <span>Coupons appliqués</span>
          <div className="flex gap-1 flex-wrap justify-end">
            {discounts.map((discount) => (
              <div key={discount.title}>
                <Badge>{discount.title}</Badge>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Montant final</span>
          <span>100 €</span>
        </div>
      </CardContent>
    </Card>
  );
}
