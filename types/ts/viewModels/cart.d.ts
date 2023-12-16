/// <reference types="ojarraydataprovider" />
/// <reference types="ojmodulerouter-adapter" />
import * as ko from "knockout";
import { ojTable } from "ojs/ojtable";
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import ModuleRouterAdapter = require("ojs/ojmodulerouter-adapter");
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojtable";
import "ojs/ojcheckboxset";
import "ojs/ojbutton";
import "ojs/ojinputnumber";
import { CoreRouterDetail } from "../appController";
import { IProduct, RouterParameters } from "../interfaces";
declare class CartTableData implements IProduct {
    sku: string;
    name: string;
    flavour: string;
    quantity: number;
    unit: string;
    packSize: number;
    volumePoints: number;
    unitPrice: number;
    mrp: number;
    price15: number;
    price25: number;
    price35: number;
    price42: number;
    price50: number;
    inCartCount: ko.Observable<number>;
    dispName: string;
    constructor(orderProd: IProduct);
    decimalAdder: (aggregator: number, count: number, unitPrice: number) => number;
}
declare class CartViewModel {
    effectiveDate: ko.Observable<string>;
    private readonly args;
    itemCount: ko.PureComputed<number>;
    cartProdItems: ko.ObservableArray<IProduct>;
    cartTableData: CartTableData[];
    cartDataProvider: ArrayDataProvider<string, CartTableData>;
    columnArray: ko.ObservableArray<ojTable.Column<CartTableData['sku'], CartTableData>>;
    addDiscCol: ko.Computed<any>;
    cartDiscountSelected: ko.ObservableArray<string>;
    discountOptions: ko.ObservableArray<{
        id: string;
        value: string;
        disc: string;
    }>;
    constructor(args: ModuleRouterAdapter.ViewModelParameters<CoreRouterDetail, RouterParameters>);
    connected(): void;
    disconnected(): void;
    transitionCompleted(): void;
    adjustContentPadding(): void;
    parametersChanged: (params: RouterParameters) => void;
    backToOrder: () => void;
    numberComparator: (a: number, b: number) => number;
    stringComparator: (a: string, b: string) => number;
    readonly vpConverter: IntlNumberConverter;
    readonly amountConverter: IntlNumberConverter;
    decimalAdder: (aggregator: number, count: number, unitPrice: number) => number;
    priceTotaller: (parentContext: any) => number | undefined;
}
export = CartViewModel;
