import { describe, expect, it, beforeEach } from "@jest/globals";
import { CalculPriceUsecase } from "../calcul-price.usecase";
import { ReductionGateway, ReductionType } from "../reduction.gateway";

describe("Feature calcul basket", () => {
  let calculPriceUsecase: CalculPriceUsecase;
  let reductionsGateway: ReductionGateway;
  beforeEach(() => {
    reductionsGateway = new StubReductionCodeGateway();
    calculPriceUsecase = new CalculPriceUsecase(reductionsGateway);
  });

  describe.only("Calcul price for product", () => {
    it("I have one product", async () => {
      const expectPrice = await calculPriceUsecase.handle(
        [
          {
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
            price: 1,
          },

          {
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
    it("Apply promotion of 30%", () => {
      const expectPrice = calculPriceUsecase.handle(
        [
          {
            price: 10,
          },
          {
            price: 10,
          },
        ],
        ""
        // {
        //   discountPercentage: 10,
        // }
      );

      const price = 18;
      expect(price).toBe(expectPrice);
    });

    it("Promotion of 30€", () => {
      const expectPrice = calculPriceUsecase.handle(
        [
          {
            price: 10,
          },
          {
            price: 10,
          },
        ],
        ""
        // {
        //   discountEuro: 10,
        // }
      );

      const price = 10;
      expect(price).toBe(expectPrice);
    });
    it("Promotion of 30€ and price is 20€", () => {
      const expectPrice = calculPriceUsecase.handle(
        [
          {
            price: 10,
          },
          {
            price: 10,
          },
        ],
        ""
        // {
        //   discountEuro: 30,
        // }
      );

      const price = 0;
      expect(price).toBe(expectPrice);
    });
  });
});

class StubReductionCodeGateway implements ReductionGateway {
  reduction: ReductionType | undefined;
  getReductionByCode(code: string): Promise<ReductionType> {
    return new Promise((resolve) => resolve(this.reduction!));
  }
}
