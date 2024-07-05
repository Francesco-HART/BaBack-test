import { Product } from "./data";

export default function main(products: Product[], codes: string[]): number {
    const discountByCodes = groupDiscountCodes(codes);
    let total = calcTotal(products);

    // calcByOneBoughtOneOffer
    // calcByFixedPrice
    // calcByPercentage

    return total;
}

function calcTotal(products: Product[]): number {
    return 0;
}

function groupDiscountCodes(codes: string[]) {

}

function calcByPercentage() {

}

function calcByOneBoughtOneOffer(): number {

}

function calcByFixedPrice(): number {

}