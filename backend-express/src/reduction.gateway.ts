export interface ReductionGateway {
  getReductionByCode(code: string): Promise<ReductionType>;
}

export type ReductionType = {
  code: string;
  discountEuro?: number;
  discountPercentage?: number;
  freeProduct?: boolean;
};
