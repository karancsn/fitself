/// <reference types="ojcorerouter" />
/// <reference types="ojmodulerouter-adapter" />
/// <reference types="ojknockoutrouteradapter" />
import * as ko from "knockout";
import CoreRouter = require("ojs/ojcorerouter");
import ModuleRouterAdapter = require("ojs/ojmodulerouter-adapter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import "ojs/ojknockout";
import "ojs/ojmodule-element";
import "ojs/ojtoolbar";
import "ojs/ojbutton";
import { ojNavigationList } from "ojs/ojnavigationlist";
import "ojs/ojdrawerpopup";
import { IProduct, ProductCategory } from "./interfaces";
export interface CoreRouterDetail {
    label: string;
    iconClass: string;
    cartData: ko.ObservableArray<IProduct>;
    prodData: ko.ObservableArray<ProductCategory>;
    effectiveDate: ko.Observable<string>;
}
declare class RootViewModel {
    manner: ko.Observable<string>;
    message: ko.Observable<string | undefined>;
    smScreen: ko.Observable<boolean> | undefined;
    mdScreen: ko.Observable<boolean> | undefined;
    router: CoreRouter<CoreRouterDetail> | undefined;
    moduleAdapter: ModuleRouterAdapter<CoreRouterDetail>;
    sideDrawerOn: ko.Observable<boolean>;
    navDataProvider: ojNavigationList<string, CoreRouter.CoreRouterState<CoreRouterDetail>>["data"];
    appName: ko.Observable<string>;
    selection: KnockoutRouterAdapter<CoreRouterDetail>;
    cartData: ko.ObservableArray<IProduct>;
    productCatalogue: ko.ObservableArray<ProductCategory>;
    effectiveDate: ko.Observable<string>;
    constructor();
    announcementHandler: (event: any) => void;
    toggleDrawer: () => void;
    openedChangedHandler: (event: CustomEvent) => void;
}
declare const _default: RootViewModel;
export default _default;
