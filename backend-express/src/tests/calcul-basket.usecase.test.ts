import { describe, expect, it } from "@jest/globals";
import { beforeEach } from "node:test";
import { CalculPriceUsecase } from "../calcul-price.usecase";

describe("Feature calcul basket", () => {
  let calculPriceUsecase: CalculPriceUsecase = new CalculPriceUsecase();

  describe("Calcul price for product", () => {
    it("I have one product", () => {
      const expectPrice = calculPriceUsecase.handle(
        [
          {
            price: 1,
          },
        ],
        {}
      );

      const price = 1;
      expect(price).toBe(expectPrice);
    });

    it("There is two products", () => {
      const expectPrice = calculPriceUsecase.handle(
        [
          {
            price: 1,
          },

          {
            price: 2,
          },
        ],
        {}
      );

      const price = 3;
      expect(price).toBe(expectPrice);
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
        {
          discountPercentage: 10,
        }
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
        {
          discountEuro: 10,
        }
      );

      const price = 10;
      expect(price).toBe(expectPrice);
    });
  });
});
