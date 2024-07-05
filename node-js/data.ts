export type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    imageUrl: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Microphone',
        price: 30.00,
        quantity: 2,
        description: 'Un super microphone pour enregistrer des podcasts ou des vidéos.',
        imageUrl: 'https://prd.place/400?id=12',
    },
    {
        id: '2',
        name: 'Cadre',
        price: 20.00,
        quantity: 1,
        description: 'Un cadre pour mettre une photo de famille.',
        imageUrl: 'https://prd.place/400?id=24',
    },
    {
        id: '3',
        name: 'Voiture',
        price: 10.00,
        quantity: 1,
        description: 'Une voiture télécommandée pour jouer avec les enfants.',
        imageUrl: 'https://prd.place/400?id=36',
    },
];

export type Discount = {
    title: string;
    code: string;
    type: "percent" | "fixed" | "1for1";
    amount?: number;
    rules?: {
        // Règles génerales
        totalAbove?: number;
        minimalAmount?: number;
        minimalQuantity?: number;
        // Que pour les 1for1
        productsIds?: string[];
    };
};

export const codes: Discount[] = [
    {
        title: "10% off",
        code: "10_PERCENT_OFF",
        type: "percent",
        amount: 10,
    },
    {
        title: "20€ off",
        code: "20_EURO_OFF",
        type: "fixed",
        amount: 20,
    },
    {
        title: "20€ off above 50€",
        code: "20_EURO_OFF_ABOVE_50",
        type: "fixed",
        amount: 20,
        rules: {
            minimalAmount: 50,
        },
    },
    {
        title: "1 acheté, 1 offert",
        code: "1_ACHETE_1_OFFERT_MICROPHONE",
        type: "1for1",
        rules: {
            minimalQuantity: 2,
            productsIds: ["1"],
        },
    },
];