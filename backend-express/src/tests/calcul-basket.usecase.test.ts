import { describe, expect, it, beforeEach } from "@jest/globals";
import { CalculPriceUsecase } from "../calcul-price.usecase";
import {
  ProductsType,
  ReductionGateway,
  ReductionType,
} from "../reduction.gateway";
import { productBuilder } from "../../product.builder";

describe("Feature calcul basket", () => {
  let calculPriceUsecase: CalculPriceUsecase;
  let reductionsGateway: StubReductionCodeGateway;
  beforeEach(() => {
    reductionsGateway = new StubReductionCodeGateway();
    calculPriceUsecase = new CalculPriceUsecase(reductionsGateway);
  });

  describe("Calcul price for product", () => {
    it("I have one product", async () => {
      const expectPrice = await calculPriceUsecase.handle(
        [new productBuilder().withQuantity(1).withPrice(1).build()],
        ""
      );

      const price = 1;
      expect(expectPrice).toBe(price);
    });

    it("There is two products", async () => {
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder()
            .withName("product1")
            .withQuantity(1)
            .withPrice(1)
            .build(),

          new productBuilder()
            .withName("product2")
            .withQuantity(1)
            .withPrice(2)
            .build(),
        ],
        ""
      );

      const price = 3;
      expect(expectPrice).toBe(price);
    });

    it("There is two same products", async () => {
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder()
            .withName("product2")
            .withQuantity(2)
            .withPrice(1)
            .build(),
        ],
        ""
      );

      const price = 2;
      expect(expectPrice).toBe(price);
    });
  });

  describe("Apply promotion code", () => {
    it("Apply promotion of 30%", async () => {
      givenReductionCodeExist({
        code: "1",
        discountPercentage: 10,
      });

      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder().withName("product2").withPrice(10).build(),

          new productBuilder().withName("product2").withPrice(10).build(),
        ],
        "1"
        // {
        //   discountPercentage: 10,
        // }
      );

      const price = 18;
      expect(price).toBe(expectPrice);
    });

    it("Promotion of 10€", async () => {
      givenReductionCodeExist({
        code: "1",
        discountEuro: 10,
      });
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder().withName("product1").withPrice(10).build(),

          new productBuilder().withName("product2").withPrice(10).build(),
        ],
        "1"
      );

      const price = 10;
      expect(price).toBe(expectPrice);
    });
    it("Promotion of 30€ and price is 20€", async () => {
      givenReductionCodeExist({
        code: "1",
        discountEuro: 30,
      });
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder().withName("product1").withPrice(10).build(),

          new productBuilder().withName("product2").withPrice(10).build(),
        ],
        "1"
      );

      const price = 0;
      expect(price).toBe(expectPrice);
    });

    it("Promotion of one buy one free product ", async () => {
      givenReductionCodeExist({
        code: "1",
        freeProduct: true,
      });
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder().withName("product1").withPrice(15).build(),

          new productBuilder().withName("product2").withPrice(10).build(),
        ],
        "1"
      );

      const price = 15;
      expect(price).toBe(expectPrice);
    });

    it("Promotion of 10% apply only for tshirt", async () => {
      givenReductionCodeExist({
        code: "1",
        discountPercentage: 10,
        productType: ProductsType.TSHIRT,
      });
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder()
            .withName("product1")
            .withType(ProductsType.PULL)
            .withPrice(10)
            .build(),
          new productBuilder()
            .withName("product2")
            .withType(ProductsType.TSHIRT)
            .withPrice(10)
            .build(),
        ],
        "1"
      );

      const price = 19;
      expect(price).toBe(expectPrice);
    });

    it("Promotion of 10% for 30€ order", async () => {
      givenReductionCodeExist({
        code: "1",
        discountPercentage: 10,
        reductionPrice: 30,
      });
      const expectPrice = await calculPriceUsecase.handle(
        [
          new productBuilder()
            .withName("product1")
            .withType(ProductsType.PULL)
            .withPrice(10)
            .build(),
          new productBuilder()
            .withName("product2")
            .withType(ProductsType.TSHIRT)
            .withPrice(10)
            .build(),
        ],
        "1"
      );

      const price = 20;
      expect(price).toBe(expectPrice);
    });
  });

  function givenReductionCodeExist(reductionCode: ReductionType) {
    reductionsGateway.reduction = reductionCode;
  }
});

class StubReductionCodeGateway implements ReductionGateway {
  reduction: ReductionType | undefined;
  getReductionByCode(code: string): Promise<ReductionType> {
    return new Promise((resolve) => resolve(this.reduction!));
  }
}
