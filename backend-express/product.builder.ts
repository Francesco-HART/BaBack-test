import { ProductsType } from "./src/reduction.gateway";

export class productBuilder {
  product = {
    type: ProductsType.PULL,
    name: "",
    quantity: 1,
    price: 0,
  };

  withName(name: string) {
    this.product.name = name;
    return this;
  }
  withType(type: ProductsType) {
    this.product.type = type;
    return this;
  }
  withQuantity(quantity: number) {
    this.product.quantity = quantity;
    return this;
  }

  withPrice(price: number) {
    this.product.price = price;
    return this;
  }

  build(): {
    name: string;
    quantity: number;
    price: number;
    type: ProductsType;
  } {
    return this.product;
  }
}
