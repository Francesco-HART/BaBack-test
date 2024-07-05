import { productsStub } from "../../data/products.ts";
import BasketList from "@/components/basket/BasketList.tsx";
import BasketTotal from "@/components/basket/BasketTotal.tsx";
import AddProductButton from "@/components/basket/AddProductButton.tsx";
import { discountsStub } from "@/data/discounts.ts";

export default function Basket() {
  const basketProducts = productsStub;
  const discounts = discountsStub;

  return (
    <>
      <AddProductButton />
      <BasketList products={basketProducts} />
      <BasketTotal products={basketProducts} discounts={discounts} />
    </>
  );
}
