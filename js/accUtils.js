/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["require","exports"],(function(require,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.announce=void 0;let n=["off","polite","assertive"];e.announce=function(e,t){void 0!==t&&-1!==n.indexOf(t)||(t="polite");let o={bubbles:!0,detail:{message:e,manner:t}};document.getElementById("globalBody").dispatchEvent(new CustomEvent("announce",o))}}));