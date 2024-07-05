import { ReductionGateway } from "./reduction.gateway";

export class CalculPriceUsecase {
  constructor(private readonly reductionGateway: ReductionGateway) {}
  async handle(
    products: {
      name: string;
      quantity: number;
      price: number;
    }[],
    reductionCode: string
  ): Promise<number> {
    const reduction = await this.reductionGateway.getReductionByCode(
      reductionCode
    );

    if (reduction && reduction.discountPercentage)
      return this.applyPercentageDiscount(
        this.additionPrices(products),
        reduction?.discountPercentage
      );

    if (reduction && reduction.discountEuro)
      return this.applyEuroDiscount(
        this.additionPrices(products),
        reduction?.discountEuro
      );

    if (reduction && reduction.freeProduct)
      return this.applyFreeProduct(products);

    return this.additionPrices(products);
  }

  private additionPrices(
    products: { price: number; quantity: number }[]
  ): number {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  applyPercentageDiscount(price: number, discountPercentage: number): number {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  }

  applyEuroDiscount(price: number, discountInEuro: number): number {
    return Math.max(0, price - discountInEuro);
  }

  findCheapestProduct(
    products: { price: number; quantity: number }[]
  ): { price: number } | null {
    if (products.length === 0) return null;
    return products.reduce(
      (cheapest, product) =>
        product.price < cheapest.price ? product : cheapest,
      products[0]
    );
  }

  applyFreeProduct(products: { price: number; quantity: number }[]): number {
    const total = this.additionPrices(products);
    const cheapestProduct = this.findCheapestProduct(products);
    if (cheapestProduct) {
      return total - cheapestProduct.price;
    }
    return total;
  }
}
