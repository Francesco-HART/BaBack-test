export interface ReductionGateway {
  getReductionByCode(code: string): Promise<ReductionType>;
}

export type ReductionType =
  | {
      discountEuro: number;
    }
  | {
      discountPercentage: number;
    };
