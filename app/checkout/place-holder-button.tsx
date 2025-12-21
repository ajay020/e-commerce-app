"use client"
import { placeOrder } from '../actions/orders';
import { redirect } from 'next/navigation';

export default function PlaceHolderButton() {

    async function handlePlaceOrder() {
        const orderId = await placeOrder();
        redirect(`/order/success/${orderId}`);
    }

    return (
        <button
            className='w-full bg-black cursor-pointer text-white py-3 rounded'
            onClick={handlePlaceOrder}
        >Place Order
        </button>
    )
}
