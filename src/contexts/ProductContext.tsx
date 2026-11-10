
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import type { ReactNode } from "react";
import type { ProductType } from "../types/ProductType";
import { getProducts } from "../services/productService";


interface ProductContextType {
    products: ProductType[],
    load: boolean,
    error: string | null,
}

const ProductContext =
    createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<ProductType[]>([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        getProducts()
            .then(data => {
                setProducts(data);
                setError(null);
            })
            .catch(() => {
                setError("Nem sikerült betölteni a termékeket!");
            })
            .finally(() => {
                setLoad(false);
            });

    }, []);



    return (
        <ProductContext.Provider value={{
            products,
            load,
            error,
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    const context = useContext(ProductContext);

    if (context === undefined) {
        throw new Error(
            "A useTermekContext csak TermekProvideren belül használható!"
        );
    }

    return context;
}
