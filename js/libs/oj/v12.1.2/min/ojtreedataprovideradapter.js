/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","ojs/ojdataprovideradapter-base","ojs/ojdataprovider","ojs/ojmap"],function(e,t,n,a){"use strict";e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a;class r extends t{constructor(e){super(e),this.treeDataSource=e,this._addTreeDataSourceEventListeners(),this._parentKey=null,this._parentInfoMap=new a}destroy(){this._removeTreeDataSourceEventListeners()}getChildDataProvider(e){if(this._parentInfoMap.has(e)){const t=new r(this.treeDataSource);return t._parentKey=e,t._parentInfoMap=this._parentInfoMap,t}return null}fetchFirst(e){return new this.AsyncIterable(new this.AsyncIterator(this._getFetchFunc(e),e))}getTotalSize(){return Promise.resolve(this.treeDataSource.getChildCount(this._parentKey))}isEmpty(){const e=this.treeDataSource.getChildCount();return-1===e?"unknown":e>0?"no":"yes"}getCapability(e){return e===r._SORT&&"full"===this.treeDataSource.getCapability(e)?{attributes:"multiple"}:"fetchByKeys"===e||"fetchByOffset"===e?{implementation:"iteration"}:null}_getFetchFunc(e){const t=this;if(null!=e&&null!=e[r._SORTCRITERIA]){return function(e,n){return function(a,i){if(i){const i={};return i[r._KEY]=e,i[r._DIRECTION]=n,new Promise(function(e,n){t.treeDataSource.sort(i,{success(){e(t._getTreeDataSourceFetch(a)(a))},error(e){n(e)}})})}return t._getTreeDataSourceFetch(a)(a)}}(e[r._SORTCRITERIA][0][r._ATTRIBUTE],e[r._SORTCRITERIA][0][r._DIRECTION])}return this._getTreeDataSourceFetch(e)}_getTreeDataSourceFetch(e){const t=this;return function(e){const n=t.treeDataSource.getSortCriteria();if(null!==n&&"none"!=n[r._DIRECTION]&&null==e[r._SORTCRITERIA]){e[r._SORTCRITERIA]=[];const a=new t.SortCriterion(t,n[r._KEY],n[r._DIRECTION]);e[r._SORTCRITERIA].push(a)}return t._isFetching=!0,new Promise(function(n,a){t.treeDataSource.fetchChildren(t._parentKey,{start:0,end:-1},{success(a){t._isFetching=!1;const i=[],s=[],o=a.getStart(),h=a.getCount();let l,u,c;for(l=0;l<h;l++)u=a.getData(o+l),i.push(u),c=a.getMetadata(o+l),c[r._LEAF]||t._parentInfoMap.set(c[r._KEY],c),s.push(new t.ItemMetadata(t,c[r._KEY]));n(new t.AsyncIteratorReturnResult(t,new t.FetchListResult(t,e,i,s)))},error(e){t._isFetching=!1,a(e)}})})}}_addTreeDataSourceEventListeners(){this.removeAllListeners(),this.addListener("change",this._handleChange),this.addListener("refresh",this._handleRefresh)}_removeTreeDataSourceEventListeners(){this.removeListener("change"),this.removeListener("refresh")}_handleChange(e){const t=e[r._OPERATION];"insert"===t?this._handleInsert(e):"delete"===t?this._handleDelete(e):"update"===t&&this._handleUpdate(e)}_handleInsert(e){const t=e[r._DATA],a=e[r._INDEX],i=e[r._KEY],s=e[r._PARENT],o=new this.ItemMetadata(this,i),h=new Set;h.add(i);const l=e[r._METADATA];null!=l&&l[r._LEAF]&&this._parentInfoMap.set(i,l);const u=new this.DataProviderAddOperationEventDetail(this,h,null,null,[s],[o],[t],[a]),c=new this.DataProviderMutationEventDetail(this,u,null,null);this.dispatchEvent(new n.DataProviderMutationEvent(c))}_handleDelete(e){const t=e[r._DATA],a=e[r._INDEX],i=e[r._KEY],s=new this.ItemMetadata(this,i),o=new Set;o.add(i),this._parentInfoMap.delete(i);const h=new this.DataProviderOperationEventDetail(this,o,[s],[t],[a]),l=new this.DataProviderMutationEventDetail(this,null,h,null);this.dispatchEvent(new n.DataProviderMutationEvent(l))}_handleUpdate(e){let t=e[r._DATA],a=e[r._INDEX],i=e[r._KEY],s=new this.ItemMetadata(this,i),o=new Set;o.add(i);let h=new this.DataProviderOperationEventDetail(this,o,[s],[t],[a]),l=new this.DataProviderMutationEventDetail(this,null,null,h);self.dispatchEvent(new n.DataProviderMutationEvent(l))}_handleRefresh(e){this._isFetching||(this._parentInfoMap.clear(),this.dispatchEvent(new n.DataProviderRefreshEvent))}}return r._SORTCRITERIA="sortCriteria",r._INDEX="index",r._PARENT="parent",r._LEAF="leaf",r._OPERATION="operation",e._registerLegacyNamespaceProp("TreeDataSourceAdapter",r),n.FetchByKeysMixin.applyMixin(r),n.FetchByOffsetMixin.applyMixin(r),r});
//# sourceMappingURL=ojtreedataprovideradapter.js.map