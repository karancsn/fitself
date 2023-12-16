interface RouterParameters {
    c: string;
    s: string;
}
interface IProduct {
    sku: string;
    name: string;
    flavour: string;
    quantity: number;
    unit: string;
    packSize: number;
    volumePoints: number;
    mrp: number;
    price15: number;
    price25: number;
    price35: number;
    price42: number;
    price50: number;
    inCartCount: ko.Observable<number>;
}
declare class ProductCategory {
    category: string;
    sku: string;
    products: IProduct[];
    constructor(category: string);
    add(item: IProduct): void;
}
export { ProductCategory, IProduct, RouterParameters };
