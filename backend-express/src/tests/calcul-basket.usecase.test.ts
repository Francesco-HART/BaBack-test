import { describe, expect, it, beforeEach } from "@jest/globals";
import { CalculPriceUsecase } from "../calcul-price.usecase";
import { ReductionGateway, ReductionType } from "../reduction.gateway";

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
        [
          {
            name: "product2",

            price: 1,
          },
        ],
        ""
      );

      const price = 1;
      expect(expectPrice).toBe(price);
    });

    it("There is two products", async () => {
      const expectPrice = await calculPriceUsecase.handle(
        [
          {
            name: "product2",

            price: 1,
          },

          {
            name: "product2",

            price: 2,
          },
        ],
        ""
      );

      const price = 3;
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
          {
            name: "product2",

            price: 10,
          },
          {
            name: "product2",

            price: 10,
          },
        ],
        "1"
        // {
        //   discountPercentage: 10,
        // }
      );

      const price = 18;
      expect(price).toBe(expectPrice);
    });

    it("Promotion of 30€", async () => {
      givenReductionCodeExist({
        code: "1",
        discountEuro: 10,
      });
      const expectPrice = await calculPriceUsecase.handle(
        [
          {
            name: "product2",

            price: 10,
          },
          {
            name: "product2",

            price: 10,
          },
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
          {
            name: "product2",

            price: 10,
          },
          {
            name: "product2",

            price: 10,
          },
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
          {
            name: "product1",
            price: 15,
          },
          {
            name: "product2",

            price: 10,
          },
        ],
        "1"
      );

      const price = 15;
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
