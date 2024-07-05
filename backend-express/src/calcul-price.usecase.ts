import { ReductionGateway } from "./reduction.gateway";

export class CalculPriceUsecase {
  constructor(private readonly reductionGateway: ReductionGateway) {}
  async handle(
    products: { price: number }[],
    reductionCode: string
  ): Promise<number> {
    const reduction = await this.reductionGateway.getReductionByCode(
      reductionCode
    );

    return this.additionPrices(products);
  }

  private additionPrices(products: { price: number }[]): number {
    return products.reduce((total, product) => total + product.price, 0);
  }

  applyPercentageDiscount(price: number, discountPercentage: number): number {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  }

  applyEuroDiscount(price: number, discountInEuro: number): number {
    return Math.max(0, price - discountInEuro);
  }
}
