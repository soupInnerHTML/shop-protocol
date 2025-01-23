import {TProduct, TProductIndexes, TProducts, TSearchParams, TShop} from "./types";
import {ProductIndexes} from "./indexes";

export class Shop implements TShop {

    products: TProducts = new Map();

    private nameIndexes: TProductIndexes = new ProductIndexes("name");
    private producerIndexes: TProductIndexes = new ProductIndexes("producer");

    private SEARCH_LIMIT: number = 10

    private searchProducts({
       products,
       searchString,
       name,
       nameTransform = (product: TProduct) => product.name
    }: TSearchParams) {
        if (name.includes(searchString)) {
            if (Array.isArray(products)) {
                return products.map((product) => nameTransform(product))
            } else {
                return [products.name];
            }
        }
    }

    addNewProduct(product: TProduct): boolean {
        if(this.products.has(product.id)) {
            return false;
        }

        this.products.set(product.id, product);
        this.nameIndexes.index(product)
        this.producerIndexes.index(product)
        return true;
    }

    deleteProduct(id: string): boolean {
        return this.products.delete(id);
    }

    listProductsByName(searchString: string): string[] {
        const results: string[] = [];

        this.nameIndexes.forEach((products, name) => {
            if(results.length === this.SEARCH_LIMIT) {
                return results;
            }

            const searchResults = this.searchProducts({
                products,
                name,
                searchString,
                nameTransform: (product) => `${product.producer} - ${product.name}`
            });
            if(searchResults) {
                results.push(...searchResults);
            }
        });

        return results;
    }

    listProductsByProducer(searchString: string): string[] {
        const results: string[] = [];

        [...this.producerIndexes.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([name, products]) => {
                if(results.length === this.SEARCH_LIMIT) {
                    return results;
                }
                const searchResults = this.searchProducts({products, name, searchString});

                if(searchResults) {
                    results.push(...searchResults);
                }
            });

        return results;
    }
}