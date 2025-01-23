import {TIndexes, TProduct, TProductIndexes} from "./types";


export class ProductIndexes extends Map implements TProductIndexes {
    key: keyof TProduct;

    index(product: TProduct) {
        const key = product[this.key as keyof TProduct];
        if (this.has(key)) {
            const existed = this.get(key)!;
            this.set(
                key,
                Array.isArray(existed) ? [...existed, product] : [existed, product]
            );
        }
        else {
            this.set(key, product);
        }
    }

    constructor(key: keyof TProduct) {
        super();
        this.key = key;
    }
}