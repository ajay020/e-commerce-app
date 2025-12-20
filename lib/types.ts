export type GuestCartItem = {
    productId: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export type CartProductSnapshot = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
};
