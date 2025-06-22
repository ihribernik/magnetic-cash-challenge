import { atom } from 'jotai';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export const cartAtom = atom<CartItem[]>([]);