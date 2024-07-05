export class CalculPriceUsecase {
  constructor() {}
  handle(
    products: { price: number }[],
    {
      discountPercentage = 0,
      discountEuro = 0,
    }: Partial<{ discountPercentage: number; discountEuro: number }>
  ): number {
    if (discountEuro > 0)
      return this.applyEuroDiscount(
        this.additionPrices(products),
        discountEuro
      );
    return this.applyPercentageDiscount(
      this.additionPrices(products),
      discountPercentage
    );
  }

  private additionPrices(products: { price: number }[]): number {
    return products.reduce((total, product) => total + product.price, 0);
  }

  applyPercentageDiscount(price: number, discountPercentage: number): number {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  }

  applyEuroDiscount(price: number, discountInEuro: number): number {
    return price - discountInEuro;
  }
}
