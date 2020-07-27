import { useState } from 'react';

let gen = 0n;

export const getKey = () => (gen++).toString(36);

export const getKeys = (length: number) => {

    const res = Array.from({ length }, (_, index) => BigInt.asUintN(64, gen + BigInt(index)).toString(36));
    gen += BigInt(length);

    return res;
};

export const useKey = () => {

    const [res] = useState(getKey());
    return res;
};

export const useKeys = (length: number) => {

    const [res] = useState(getKeys(length));
    return res;
};
