/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["exports","ojs/ojvcomponent","preact","jquery","ojs/ojanimation","ojs/ojdomutils","ojs/ojcore-base","ojs/ojpopup","ojs/ojdrawerutils","hammerjs"],function(e,t,s,r,o,i,n,a,l,d){"use strict";r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r,d=d&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d;var p,h=function(e,t,s,r){var o,i=arguments.length,n=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(i<3?o(n):i>3?o(t,s,n):o(t,s))||n);return i>3&&n&&Object.defineProperty(t,s,n),n};const u=oj,c=oj.PopupService,w=window,D=oj.ZOrderUtils;e.DrawerPopup=p=class extends s.Component{constructor(){super(...arguments),this.state={opened:this.props.opened,id:t.getUniqueId(),viewportResolvedDisplayMode:this.getViewportResolvedDisplayMode()},this.rootRef=s.createRef(),this.isShiftKeyActive=!1,this.drawerResizeHandler=null,this.handleKeyDown=e=>{if(e.key===l.DrawerConstants.keys.ESC)return void this.selfClose();const t=this.getFocusables();if(e.key===l.DrawerConstants.keys.TAB&&"modal"===this.props.modality){this.isShiftKeyActive=e.shiftKey;const{length:s,0:r,[s-1]:o}=t;if(!s)return e.preventDefault(),void this.rootRef.current.focus();if(e.shiftKey){if(document.activeElement===r)return e.preventDefault(),void o.focus()}else if(document.activeElement===o)return e.preventDefault(),void r.focus()}},this.autoDismissHandler=e=>{const t=this.getFocusables(),s=this.rootRef.current.parentNode;if("focus-loss"===this.props.autoDismiss){const r=this.isTargetDescendantOfOwnZorderLayerOrItsNextSiblings(s,e.target);if("focus"===e.type&&"modal"===this.props.modality&&!r){e.preventDefault();const s=e.relatedTarget,r=t[0],o=t[t.length-1];return void(s===r?o.focus():r.focus())}r||(p.idsClosedWithAutoDismiss.push(this.state.id),this.selfClose())}},this.getFocusables=()=>this.rootRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'),this.isTargetDescendantOfOwnZorderLayerOrItsNextSiblings=(e,t)=>{const s=[e];let r=e.nextSibling;for(;r;)s.push(r),r=r.nextSibling;return s.some(e=>e.contains(t))},this.resizeHandler=()=>{const e=this.state.viewportResolvedDisplayMode,t=this.getViewportResolvedDisplayMode();e!==t&&this.setState({viewportResolvedDisplayMode:t})},this.handleSwipeAction=()=>{this.selfClose()}}static getDerivedStateFromProps(e,t){return p.idsClosedWithAutoDismiss.indexOf(t.id)>-1&&e.opened?{opened:!1}:e.opened!==t.opened?{opened:e.opened}:null}render(e){return this.isDrawerOpened()||this.wasDrawerOpenedInPrevState()||this.isDrawerClosedWithAutoDismiss()?s.h(t.Root,{ref:this.rootRef,class:this.getPopupStyleClasses(this.props.edge),tabIndex:-1,role:this.props.role||"dialog",onKeyDown:this.handleKeyDown},s.h("div",{class:"oj-drawer-full-height"},e.children)):s.h(t.Root,null)}isDrawerOpened(){return this.state[l.DrawerConstants.stringOpened]}wasDrawerOpenedInPrevState(){return this.openedPrevState}isDrawerClosedWithAutoDismiss(){return p.idsClosedWithAutoDismiss.indexOf(this.state.id)>-1}selfClose(){var e,t;null===(t=(e=this.props).onOpenedChanged)||void 0===t||t.call(e,!1)}openOrCloseDrawer(e){this.isDrawerOpened()!=e.opened&&(this.openedPrevState=this.isDrawerOpened());const t=r(this.rootRef.current),s=c.getInstance(),o=this.getPopupServiceOptions(e);this.isDrawerOpened()?[D.STATUS.CLOSE,D.STATUS.UNKNOWN].indexOf(D.getStatus(t)>-1)&&s.open(o):D.getStatus(t)===D.STATUS.OPEN&&s.close(o)}getPopupServiceOptions(e){const t=this.props.edge,s=r(this.rootRef.current),o={},i=c.OPTION;o[i.POPUP]=s,o[i.LAUNCHER]=r(document.activeElement),o[i.MODALITY]=this.props.modality,o[i.LAYER_SELECTORS]=this.getDrawerSurrogateLayerSelectors(),o[i.LAYER_LEVEL]=c.LAYER_LEVEL.TOP_LEVEL,o[i.POSITION]=this.getDrawerPosition(t);const n=c.EVENT;return o[i.EVENTS]={[n.POPUP_BEFORE_OPEN]:()=>this.beforeOpenHandler(t,o),[n.POPUP_AFTER_OPEN]:()=>this.afterOpenHandler(t,e),[n.POPUP_BEFORE_CLOSE]:()=>this.beforeCloseHandler(t),[n.POPUP_AFTER_CLOSE]:()=>this.afterCloseHandler(e),[n.POPUP_AUTODISMISS]:e=>this.autoDismissHandler(e),[n.POPUP_REFRESH]:()=>{s.position(this.getDrawerPosition(t))}},o}beforeOpenHandler(e,t){l.DrawerUtils.disableBodyOverflow();const s=t[c.OPTION.POPUP],r=t[c.OPTION.POSITION];s.show(),s.position(r);const i=u.Context.getContext(this.rootRef.current).getBusyContext().addBusyState({description:"Animation in progress"}),n=o.slideIn(this.rootRef.current,l.DrawerUtils.getAnimationOptions(l.DrawerConstants.stringSlideIn,e));return n.then(i),n}afterOpenHandler(e,t){l.DrawerUtils.enableBodyOverflow(),this.handleFocus(t);const s=r(this.rootRef.current),o=D.getStatus(s);if(null===this.drawerResizeHandler&&(this.drawerResizeHandler=this.drawerResizeCallback.bind(this,s,e)),i.addResizeListener(this.rootRef.current,this.drawerResizeHandler,0,!0),o===D.STATUS.OPEN&&!this.isDrawerOpened()){const e=c.getInstance(),s=this.getPopupServiceOptions(t);e.close(s)}}drawerResizeCallback(e,t){e.position(this.getDrawerPosition(t))}handleFocus(e){if(this.state.opened&&e.opened!==this.state.opened){const e=this.rootRef.current.querySelectorAll("[autofocus]"),{length:t,0:s}=e;if(t>0)return void s.focus();const r=this.getFocusables();let o=this.rootRef.current;if(r.length)for(let e=0;e<r.length;e++)if(!0!==r[e].disabled){o=r[e];break}o.focus()}}beforeCloseHandler(e){l.DrawerUtils.disableBodyOverflow(),i.removeResizeListener(this.rootRef.current,this.drawerResizeHandler);const t=u.Context.getContext(this.rootRef.current).getBusyContext().addBusyState({description:"Animation in progress"}),s=o.slideOut(this.rootRef.current,l.DrawerUtils.getAnimationOptions(l.DrawerConstants.stringSlideOut,e));return s.then(t),s}afterCloseHandler(e){var t,s;l.DrawerUtils.enableBodyOverflow();const o=r(this.rootRef.current),i=D.getStatus(o);if(this.isDrawerClosedWithAutoDismiss()&&(p.idsClosedWithAutoDismiss.splice(p.idsClosedWithAutoDismiss.indexOf(this.state.id),1),i===D.STATUS.CLOSE&&this.props.opened&&(null===(s=(t=this.props).onOpenedChanged)||void 0===s||s.call(t,!1))),i===D.STATUS.CLOSE&&this.isDrawerOpened()){const t=c.getInstance(),s=this.getPopupServiceOptions(e);t.open(s)}else this.wasDrawerOpenedInPrevState()||this.forceUpdate()}getDrawerSurrogateLayerSelectors(){let e=l.DrawerConstants.DrawerPopupStyleSurrogate;return"modal"===this.props.modality&&(e+=` ${l.DrawerConstants.stringOjDrawer}${l.DrawerConstants.charDash}modal`),e}getDrawerPosition(e){let t=`${e} ${"bottom"===e?"bottom":"top"}`,s={my:t,at:t,of:window,collision:"none"};return oj.PositionUtils.normalizeHorizontalAlignment(s,l.DrawerUtils.isRTL())}getPopupStyleClasses(e){const t={};return this.getViewportResolvedDisplayMode()===l.DrawerConstants.stringFullOverlay&&(t[l.DrawerConstants.styleDisplayMode(l.DrawerConstants.stringFullOverlay)]=!0),l.DrawerUtils.getStyleClassesMapAsString(Object.assign(t,l.DrawerUtils.getCommonStyleClasses(e)))}componentDidUpdate(e,t){this.handleComponentUpdate(t)}componentDidMount(){if(window.addEventListener(l.DrawerConstants.stringResize,()=>{this.resizeHandler()}),this.openedPrevState=this.props.opened,p.defaultProps.opened!=this.props.opened){const e=Object.assign({},this.state);e.opened=!1,this.handleComponentUpdate(e)}}componentWillUnmount(){window.removeEventListener(l.DrawerConstants.stringResize,()=>{this.resizeHandler()})}getViewportResolvedDisplayMode(){return l.DrawerUtils.getViewportWidth()>=l.DrawerConstants.fullWidthDrawerChangeThreshold?l.DrawerConstants.stringOverlay:l.DrawerConstants.stringFullOverlay}handleComponentUpdate(e){this.openOrCloseDrawer(e),this.isDrawerOpened()&&"swipe"===this.props.closeGesture&&this.registerCloseWithSwipeListener(),!1===this.isDrawerOpened()&&e.opened&&this.unregisterCloseWithSwipeListener()}registerCloseWithSwipeListener(){this.hammerInstance=new d(w),this.props.edge===l.DrawerConstants.stringBottom&&this.hammerInstance.get("swipe").set({direction:d.DIRECTION_DOWN}),this.hammerInstance.on(this.getSwipeCloseDirection(this.props.edge),this.handleSwipeAction)}getSwipeCloseDirection(e){switch(e){case l.DrawerConstants.stringStart:return l.DrawerUtils.isRTL()?"swiperight":"swipeleft";case l.DrawerConstants.stringEnd:return l.DrawerUtils.isRTL()?"swipeleft":"swiperight";case l.DrawerConstants.stringBottom:return"swipedown"}}unregisterCloseWithSwipeListener(){this.hammerInstance&&this.hammerInstance.off(this.getSwipeCloseDirection(this.props.edge),this.handleSwipeAction)}},e.DrawerPopup.defaultProps={autoDismiss:"focus-loss",edge:"start",modality:"modal",opened:!1,closeGesture:"swipe"},e.DrawerPopup.idsClosedWithAutoDismiss=[],e.DrawerPopup.metadata={slots:{"":{}},properties:{opened:{type:"boolean",writeback:!0},edge:{type:"string",enumValues:["start","end","bottom"]},modality:{type:"string",enumValues:["modal","modeless"]},autoDismiss:{type:"string",enumValues:["focus-loss","none"]},closeGesture:{type:"string",enumValues:["swipe","none"]}},extension:{_WRITEBACK_PROPS:["opened"],_READ_ONLY_PROPS:[],_OBSERVED_GLOBAL_PROPS:["role"]}},e.DrawerPopup=p=h([t.customElement("oj-drawer-popup")],e.DrawerPopup),Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=ojdrawerpopup.js.map