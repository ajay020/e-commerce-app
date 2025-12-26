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

export type ActionResult = {
    success?: boolean;
    error?: string | null;
    message?: string
};
