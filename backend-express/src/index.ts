import {type Product, productsStub} from "./data/products"

const calculateFinalPrice = (basket: Product[], discountCodes?: string[]): number => {
    return 0
}

// console.log(calculateFinalPrice(productsStub, ["10_PERCENT_OFF"]))

export { calculateFinalPrice }
