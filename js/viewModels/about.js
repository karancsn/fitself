define(["require","exports","knockout","../appController","ojs/ojmodule-element-utils","../accUtils","ojs/ojcontext","ojs/ojrouter","ojs/ojinputtext"],(function(require,e,t,o,i,s,r,n){"use strict";return class{constructor(){this.passcodeClick=e=>{"29910131"===this.passcode()&&this.router.go("order")};let e=r.getPageContext().getBusyContext().addBusyState({description:"wait for header"});this.headerConfig=t.observable({view:[],viewModel:null}),this.footerConfig=t.observable({view:[],viewModel:null}),this.passcode=t.observable(),this.router=n.rootInstance,i.createView({viewPath:"views/footer.html"}).then((t=>{this.footerConfig({view:t,viewModel:{}}),i.createView({viewPath:"views/header.html"}).then((t=>{this.headerConfig({view:t,viewModel:o.default.getHeaderModel()}),e()}))}))}connected(){s.announce("About page loaded."),document.title="About"}disconnected(){}transitionCompleted(){}}}));