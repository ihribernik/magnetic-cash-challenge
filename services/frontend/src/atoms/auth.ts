import { atom } from "jotai";
export const jwtAtom = atom(null);
export const isAuthenticatedAtom = atom((get) => !!get(jwtAtom));
