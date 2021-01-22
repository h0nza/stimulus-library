import{Controller as e}from"stimulus";import t from"lodash.camelcase";function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var s=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){this.loadContent()},i.loadContent=function(){var e=this.hasReplaceTarget?this.replaceTarget:this.element;fetch(this.endpointValue).then(function(e){return e.text()}).then(function(t){var n=document.createElement("div");n.innerHTML=t,e.replaceWith(n);var i=new CustomEvent("ajax:success",{detail:""});e.dispatchEvent(i)}).catch(function(t){e.replaceWith("Sorry, this content failed to load");var n=new CustomEvent("ajax:error",{detail:""});e.dispatchEvent(n)}).finally(function(){var t=new CustomEvent("ajax:complete",{detail:""});e.dispatchEvent(t)})},t}(e);s.targets=["replace"],s.values={endpoint:String};var r=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).boundHandler=t.handler.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){var e=this;this.element.querySelectorAll("input, select, textarea").forEach(function(t){return t.addEventListener("change",e.boundHandler)})},s.disconnect=function(){var e=this;this.element.querySelectorAll("input, select, textarea").forEach(function(t){return t.removeEventListener("change",e.boundHandler)})},s.handler=function(e){this.element.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0}))},t}(e);const o=(e,t)=>{const n=e[t];return"function"==typeof n?n:(...e)=>{}},a=(e,t,n)=>{let i=e;return!0===n?i=`${t.identifier}:${e}`:"string"==typeof n&&(i=`${n}:${e}`),i},l=(e,t,n)=>{const{bubbles:i,cancelable:s,composed:r}=t||{bubbles:!0,cancelable:!0,composed:!0};return t&&Object.assign(n,{originalEvent:t}),new CustomEvent(e,{bubbles:i,cancelable:s,composed:r,detail:n})},c={dispatchEvent:!0,eventPrefix:!0},u={events:["click","touchend"],onlyVisible:!0,dispatchEvent:!0,eventPrefix:!0},h={debug:!1,logger:console};class d{constructor(e,t={}){var n,i,s;this.log=(e,t)=>{this.debug&&(this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${e}`,"color: #3B82F6","color: unset"),this.logger.log(Object.assign({controllerId:this.controllerId},t)),this.logger.groupEnd())},this.debug=null!==(i=null!==(n=null==t?void 0:t.debug)&&void 0!==n?n:e.application.stimulusUseDebug)&&void 0!==i?i:h.debug,this.logger=null!==(s=null==t?void 0:t.logger)&&void 0!==s?s:h.logger,this.controller=e,this.controllerId=e.element.id||e.element.dataset.id,this.controllerInitialize=e.initialize.bind(e),this.controllerConnect=e.connect.bind(e),this.controllerDisconnect=e.disconnect.bind(e)}}class p extends d{constructor(e,t={}){super(e,t),this.observe=()=>{this.targetElement.addEventListener("mouseenter",this.onEnter),this.targetElement.addEventListener("mouseleave",this.onLeave)},this.unobserve=()=>{this.targetElement.removeEventListener("mouseenter",this.onEnter),this.targetElement.removeEventListener("mouseleave",this.onLeave)},this.onEnter=()=>{o(this.controller,"mouseEnter").call(this.controller),this.log("mouseEnter",{hover:!0})},this.onLeave=()=>{o(this.controller,"mouseLeave").call(this.controller),this.log("mouseLeave",{hover:!1})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}class f extends d{constructor(e,t={}){super(e,t),this.observe=()=>{try{this.observer.observe(this.targetElement,this.options)}catch(e){this.controller.application.handleError(e,"At a minimum, one of childList, attributes, and/or characterData must be true",{})}},this.unobserve=()=>{this.observer.disconnect()},this.mutation=e=>{o(this.controller,"mutate").call(this.controller,e),this.log("mutate",{entries:e})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.options=t,this.observer=new MutationObserver(this.mutation),this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}const v=e=>{const t=t=>{const{innerWidth:n,innerHeight:i}=window,s={height:i||Infinity,width:n||Infinity,event:t};o(e,"windowResize").call(e,s)},n=e.disconnect.bind(e),i=()=>{window.addEventListener("resize",t),t()},s=()=>{window.removeEventListener("resize",t)};return Object.assign(e,{disconnect(){s(),n()}}),i(),[i,s]},m=(e,t=200)=>{let n=null;return function(){const i=arguments,s=this,r=()=>e.apply(s,i);n&&clearTimeout(n),n=setTimeout(r,t)}};var g=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).boundHandler=t.handler.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){var e=this.element;e.style.resize="none",e.style.boxSizing="border-box",e.addEventListener("input",this.boundHandler),e.addEventListener("focus",this.boundHandler),v(this),requestAnimationFrame(this.boundHandler)},s.windowResize=function(){this.handler()},s.handler=function(){this.autosize(this.element)},s.autosize=function(e){var t=e.offsetHeight-e.clientHeight;e.style.height="auto",e.style.height=e.scrollHeight+t+"px"},t}(e),b=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).boundHandler=t.updateCharCount.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){this.updateCharCount(),this.inputTarget.addEventListener("input",this.boundHandler)},s.disconnect=function(){this.inputTarget.removeEventListener("input",this.boundHandler)},s.updateCharCount=function(){var e=this.inputTarget.value.length;this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))},s.isValidCount=function(e){var t=0,n=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(n=this.maxValue),e>=t&&e<=n},t}(e);b.targets=["input","output"],b.values={min:Number,max:Number},b.classes=["error"];var E=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).supported=!1,t}n(t,e);var i=t.prototype;return i.connect=function(){this.supported=document.queryCommandSupported("copy"),this.hasRemoveUnusedValue&&this.removeUnusedValue&&(this.supported&&this.hasFallbackTarget?this.fallbackTarget.remove():this.hasCopyTarget&&this.copyTarget.remove())},i.select=function(e){e&&e.preventDefault(),this.sourceTarget.select()},i.copy=function(e){e&&e.preventDefault(),this.sourceTarget.select(),this.supported&&document.execCommand("copy")},t}(e);E.targets=["button","copy","fallback"],E.values={removeUnused:Boolean};var y=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){var e=this,t=this.messageValue;window.onbeforeunload=function(){return null==t||t},window.addEventListener("popstate",this.handlePopstate),window.addEventListener("submit",function(){window.removeEventListener("popstate",e.handlePopstate),window.onbeforeunload=null})},i.handlePopstate=function(e){return!1},t}(e);y.values={message:String};var w=function(e){function t(){return e.apply(this,arguments)||this}return n(t,e),t.prototype.connect=function(){console.log("Debug Controller",this,this.testTargets)},t}(e);w.targets=["test"];var T=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).initialValue=null,t.boundHandler=t.handler.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){var e=this.element;this.initialValue=this.isInputElement(e)&&this.isCheckable(e)?e.checked:e.value,e.addEventListener("input",this.boundHandler),e.addEventListener("change",this.boundHandler)},s.disconnect=function(){var e=this.element;e.removeEventListener("input",this.boundHandler),e.removeEventListener("change",this.boundHandler)},s.restore=function(){var e=this.element;this.isInputElement(e)&&this.isCheckable(e)?e.checked=this.initialValue:e.value=this.initialValue},s.handler=function(e){var t=this.element;this.initialValue!==t.value?t.setAttribute("data-dirty","true"):t.removeAttribute("data-dirty")},s.isCheckable=function(e){return"radio"===e.type||"checkbox"===e.type},s.isInputElement=function(e){return"INPUT"===e.tagName},t}(e),V=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){this.toggle()},i.toggle=function(){this.hasDisablerTarget&&this.disablerTarget.checked?this.disableInputs():this.enableInputs()},i.disableInputs=function(){this.disableTargets.forEach(function(e,t){e.disabled=!0})},i.enableInputs=function(){this.disableTargets.forEach(function(e,t){e.disabled=!1})},t}(e);V.targets=["disabler","disable"];var C=function(e){function t(){return e.apply(this,arguments)||this}return n(t,e),t.prototype.dismiss=function(){this.element.remove()},t}(e),L=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){((e,t={})=>{new f(this,t)})(0,{element:this.element,childList:!0}),this.checkEmpty()},i.mutate=function(e){this.checkEmpty()},i.checkEmpty=function(){var e=this;0===(this.hasScopeSelectorValue?this.element.querySelectorAll(this.scopeSelectorValue):this.element.children).length?(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(function(t){return e.element.classList.remove(t)}),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(function(t){return e.element.classList.add(t)}),this.element.dispatchEvent(new CustomEvent("dom:empty",{bubbles:!0,cancelable:!0}))):(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(function(t){return e.element.classList.add(t)}),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(function(t){return e.element.classList.remove(t)}),this.element.dispatchEvent(new CustomEvent("dom:not-empty",{bubbles:!0,cancelable:!0})))},t}(e);L.classes=["empty","notEmpty"],L.values={scopeSelector:String};var k=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){this.toggle()},i.toggle=function(){this.hasEnablerTarget&&this.enablerTarget.checked?this.enableInputs():this.disableInputs()},i.disableInputs=function(){this.enableTargets.forEach(function(e,t){e.disabled=!0})},i.enableInputs=function(){this.enableTargets.forEach(function(e,t){e.disabled=!1})},t}(e);k.targets=["enabler","enable"];var H=function(e){function t(){return e.apply(this,arguments)||this}return n(t,e),t.prototype.connect=function(){var e=this,t=this.element;t.onerror=function(){e.hasPlaceholderValue?t.src=e.placeholderValue:t.style.display="none"}},t}(e);H.values={placeholder:String};var S=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){if(this.options={element:this.element,threshold:.3},"IntersectionObserver"in window){var e=((e,t={})=>{const{dispatchEvent:n,eventPrefix:i}=Object.assign({},c,t),s=(null==t?void 0:t.element)||e.element,r=e.disconnect.bind(e),u=new IntersectionObserver(t=>{const[r]=t;r.isIntersecting?(t=>{if(e.isVisible=!0,o(e,"appear").call(e,t),n){const n=a("appear",e,i),r=l(n,null,{controller:e,entry:t});s.dispatchEvent(r)}})(r):e.isVisible&&(t=>{if(e.isVisible=!1,o(e,"disappear").call(e,t),n){const n=a("disappear",e,i),r=l(n,null,{controller:e,entry:t});s.dispatchEvent(r)}})(r)},t),h=()=>{u.observe(s)},d=()=>{u.unobserve(s)};return Object.assign(e,{isVisible:!1,disconnect(){d(),r()}}),h(),[h,d]})(this,this.options);this.observe=e[0],this.unobserve=e[1]}else this.loadContent()},i.appear=function(e){var t=this.element;""===t.src&&e.target===t&&e.isIntersecting&&(this.loadContent(),this.unobserve&&this.unobserve())},t}(s),I=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).maxSelections=0,t.boundHandleInputs=t.handleInputs.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){var e=this;this.inputTargets.forEach(function(t){return t.addEventListener("change",e.boundHandleInputs)})},s.disconnect=function(){var e=this;this.inputTargets.forEach(function(t){return t.removeEventListener("change",e.boundHandleInputs)})},s.handleInputs=function(e){var t=this.inputTargets.reduce(function(e,t){return t.checked?e+1:e},0),n=e.target;t>this.maxSelections?(e.preventDefault(),n.checked=!1,n.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!0})),n.dispatchEvent(new CustomEvent("limited-selection:too-many",{bubbles:!0,cancelable:!0,detail:{target:n}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=this.messageValue)):(n.dispatchEvent(new CustomEvent("limited-selection:selection",{bubbles:!0,cancelable:!0,detail:{target:n}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=""))},t}(e);I.targets=["input","error"],I.values={max:Number,message:String};var x=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).boundCheckPasswordsMatch=t.checkPasswordsMatch.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){var e=this;this.passwordTargets.forEach(function(t){return t.addEventListener("change",e.boundCheckPasswordsMatch)})},s.disconnect=function(){var e=this;this.passwordTargets.forEach(function(t){return t.removeEventListener("change",e.boundCheckPasswordsMatch)})},s.allPasswordsMatch=function(){var e=new Set(this.passwordTargets.map(function(e){return e.value}));return e.has("")||1==e.size},s.checkPasswordsMatch=function(){var e=this;this.allPasswordsMatch()?(this.element.dispatchEvent(new CustomEvent("password-confirm:match")),this.hasErrorClass&&this.passwordTargets.forEach(function(t){return t.classList.remove(e.errorClass)})):(this.element.dispatchEvent(new CustomEvent("password-confirm:no-match")),this.hasErrorClass&&this.passwordTargets.forEach(function(t){return t.classList.add(e.errorClass)}))},t}(e);x.targets=["password"],x.classes=["error"];var M=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){},i.peak=function(e){e&&e.preventDefault(),this.passwordTarget.type="text"},i.hide=function(e){e&&e.preventDefault(),this.passwordTarget.type="password"},i.toggle=function(e){e&&e.preventDefault(),"password"===this.passwordTarget.type?this.peak():this.hide()},t}(e);M.targets=["password"];var O=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).boundMessageReceived=t.messageReceived.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){window.addEventListener("message",this.boundMessageReceived)},s.disconnect=function(){window.removeEventListener("message",this.boundMessageReceived)},s.messageReceived=function(e){var t=e.data;t.hasOwnProperty("name")&&"iframe-body"===t.name&&t.hasOwnProperty("height")&&this.resize(t.height)},s.resize=function(e){this.element.style.height=e+"px"},t}(e),P=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){var e,t,n;window.self!==window.top&&(v(this),t={},null===(n=(e=this).constructor.debounces)||void 0===n||n.forEach(n=>{if("string"==typeof n&&(e[n]=m(e[n],null==t?void 0:t.wait)),"object"==typeof n){const{name:i,wait:s}=n;if(!i)return;e[i]=m(e[i],s||(null==t?void 0:t.wait))}}),this.postUpdate())},i.windowResize=function(e){this.postUpdate()},i.postUpdate=function(){var e={name:"iframe-body",height:this.getHeight()};window.parent.postMessage(e,"*")},i.getHeight=function(){var e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)},t}(e);P.debounces=["postUpdate"];var j,A=function(e){function i(){return e.apply(this,arguments)||this}n(i,e);var s=i.prototype;return s.cleanupSelf=function(){this.cleanup(this.element)},s.cleanup=function(e){var n,i,s,r=this;e.dataset.controller=(null==(n=e.dataset.controller)?void 0:n.replaceAll(new RegExp("(s|^)"+this.identifier+"(s|$)","g"),""))||"",""==e.dataset.controller&&delete e.dataset.controller;var o=new RegExp("(s|^)"+this.identifier+"\\..+?(s|$)","g");e.dataset.target=(null==(i=e.dataset.target)?void 0:i.replaceAll(o,""))||"",delete e.dataset[t(this.identifier+"-target")],""==e.dataset.target&&delete e.dataset.target,e.dataset.action=(null==(s=e.dataset.target)?void 0:s.replaceAll(o,""))||"",delete e.dataset[t(this.identifier+"-action")],""==e.dataset.action&&delete e.dataset.action;var a=this.constructor.values;a&&Object.keys(a).forEach(function(n){return delete e.dataset[t(r.identifier+"-"+n+"-value")]});var l=this.constructor.classes;l&&Object.keys(l).forEach(function(n){return delete e.dataset[t(r.identifier+"-"+n+"-class")]})},i}(e),z=function(e,t){var n=void 0===t?{}:t,i=n.behavior,s=void 0===i?"smooth":i,r=n.block,o=void 0===r?"start":r,a=n.inline,l=void 0===a?"nearest":a;try{var c=function(){e.scrollIntoView({behavior:s,block:o,inline:l})},u=function(){if("smooth"==s&&!D)return Promise.resolve(function(){try{return Promise.resolve(import("smoothscroll-polyfill")).then(function(e){j||(j=!0,(0,e.polyfill)())})}catch(e){return Promise.reject(e)}}()).then(function(){})}();return Promise.resolve(u&&u.then?u.then(c):c())}catch(e){return Promise.reject(e)}},D="scrollBehavior"in document.documentElement.style;function R(e){if(!e)return null;var t=getComputedStyle(e).overflowY;return"visible"!==t&&"hidden"!==t&&e.scrollHeight>=e.clientHeight?e:R(e.parentElement)||document.body}var N=function(e){function t(){return e.apply(this,arguments)||this}return n(t,e),t.prototype.connect=function(){var e=this;requestAnimationFrame(function(){z(e.element,{behavior:e.hasBehaviorValue?e.behaviorValue:"smooth",block:e.hasBlockValue?e.blockValue:"center",inline:e.hasInlineValue?e.inlineValue:"center"}).catch(function(){return e.element.scrollIntoView()}),e.cleanupSelf()})},t}(A);N.values={behavior:String,block:String,inline:String};var W=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){},i.scroll=function(e){var t;e&&e.preventDefault(),null!=(t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:R(this.element))&&z(t,{behavior:"smooth",block:"end"}).catch(function(){return t.scrollIntoView(!1)})},t}(e);W.values={mode:String};var q=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){},i.scroll=function(){var e=document.querySelector(this.selectorValue);e?z(e,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(function(){return e.scrollIntoView()}):console.warn("Could not find target for '"+this.selectorValue+"'")},t}(e);q.values={selector:String,behavior:String,block:String,inline:String};var B=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){},i.scroll=function(e){var t;e&&e.preventDefault(),null!=(t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:R(this.element))&&z(t,{behavior:"smooth",block:"start"}).catch(function(){return t.scrollIntoView(!1)})},t}(e);B.values={mode:String};var U=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).timeout=null,t}n(t,e);var i=t.prototype;return i.connect=function(){var e=this;requestAnimationFrame(function(){e.timeout=setTimeout(function(){return e.element.remove()},1e3*e.secondsValue)})},i.disconnect=function(){this.timeout&&clearTimeout(this.timeout)},t}(e);U.values={seconds:Number};var $=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){var e=this;if(!this.hasInsertValue)throw new Error("`insert` value was not specified");requestAnimationFrame(function(){e.hasImmediateValue&&e.immediateValue&&e.execute()})},i.execute=function(e){e&&e.preventDefault();var t=document.querySelector(this.targetValue);if(null!=t){var n=this.element.cloneNode(!0);switch(this.cleanup(n),this.insertValue){case"beforebegin":case"beforeend":case"afterend":case"afterbegin":t.insertAdjacentHTML(this.insertValue,n.outerHTML);break;case"replaceOuter":t.outerHTML=n.outerHTML;break;case"replaceInner":t.innerHTML=n.outerHTML;break;case"prepend":t.insertAdjacentHTML("afterbegin",n.outerHTML);break;case"append":t.insertAdjacentHTML("beforeend",n.outerHTML);break;default:throw new Error("`insert` value was not specified")}this.element.remove()}else this.element.dispatchEvent(new CustomEvent("teleport:error",{bubbles:!0,cancelable:!0}))},t}(A);$.values={target:String,insert:String,immediate:Boolean};var F=function(e){function t(){return e.apply(this,arguments)||this}n(t,e);var i=t.prototype;return i.connect=function(){var e=this;if(this.toggleTargets.forEach("on"===this.initialValue?function(t){return e.elementOn(t)}:function(t){return e.elementOff(t)}),(this.hasMouseEnterValue||this.hasMouseLeaveValue)&&((e,t={})=>{new p(this,t)})(),this.hasClickAwayValue&&this.clickAwayValue&&((e,t={})=>{const{onlyVisible:n,dispatchEvent:i,events:s,eventPrefix:r}=Object.assign({},u,t),o=s=>{const o=(null==t?void 0:t.element)||e.element;if(!(o.contains(s.target)||!function(e){const t=e.getBoundingClientRect(),n=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth;return t.top<=n&&t.top+t.height>=0&&t.left<=i&&t.left+t.width>=0}(o)&&n)&&(e.clickOutside&&e.clickOutside(s),i)){const t=a("click:outside",e,r),n=l(t,s,{controller:e});o.dispatchEvent(n)}},c=e.disconnect.bind(e);Object.assign(e,{disconnect(){null==s||s.forEach(e=>{window.removeEventListener(e,o,!1)}),c()}}),null==s||s.forEach(e=>{window.addEventListener(e,o,!1)})})(this),!this.hasClassValue)throw new Error("data-toggle-class-class-value must not be empty")},i.clickOutside=function(){var e=this;this.toggleTargets.forEach(function(t){e.elementWasToggled(t)&&(e.elementToggleStatus(t),e.elementToggle(t))})},i.mouseEnter=function(){if(this.hasMouseEnterValue)switch(this.mouseEnterValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}},i.mouseLeave=function(){if(this.hasMouseLeaveValue)switch(this.mouseLeaveValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}},i.on=function(e){var t=this;this.toggleTargets.forEach(function(e){t.elementToggleStatus(e),t.elementOn(e)})},i.off=function(e){var t=this;this.toggleTargets.forEach(function(e){t.elementToggleStatus(e),t.elementOff(e)})},i.toggle=function(e){var t=this;this.toggleTargets.forEach(function(e){t.elementToggleStatus(e),t.elementToggle(e)})},i.elementWasToggled=function(e){return"true"==e.dataset.toggled},i.elementToggleStatus=function(e){this.elementWasToggled(e)?delete e.dataset.toggled:e.dataset.toggled="true"},i.elementToggle=function(e){this.classValue.split(" ").forEach(function(t){return e.classList.toggle(t)})},i.elementOn=function(e){this.classValue.split(" ").forEach(function(t){return e.classList.toggle(t,!0)})},i.elementOff=function(e){this.classValue.split(" ").forEach(function(t){return e.classList.toggle(t,!1)})},t}(e);F.targets=["toggle"],F.values={class:String,mouseEnter:String,mouseLeave:String,clickAway:Boolean,initial:String};var _=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).boundHandler=t.updateWordCount.bind(i(t)),t}n(t,e);var s=t.prototype;return s.connect=function(){this.updateWordCount(),this.inputTarget.addEventListener("input",this.boundHandler)},s.disconnect=function(){this.inputTarget.removeEventListener("input",this.boundHandler)},s.updateWordCount=function(){var e=0,t=this.inputTarget.value.match(/\S+/g);this.outputTarget.innerText=(e=t&&t.length||0).toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))},s.isValidCount=function(e){var t=0,n=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(n=this.maxValue),e>=t&&e<=n},t}(e);_.targets=["input","output"],_.values={min:Number,max:Number},_.classes=["error"];export{s as AsyncBlockController,r as AutoSubmitFormController,g as AutosizeController,b as CharCountController,E as ClipboardController,y as ConfirmNavigationController,w as DebugController,T as DetectDirtyController,V as DisableInputsController,C as DismissableController,L as EmptyDomController,k as EnableInputsController,H as FallbackImageController,S as LazyBlockController,I as LimitedSelectionCheckboxesController,x as PasswordConfirmController,M as PasswordPeekController,P as ResponsiveIframeBodyController,O as ResponsiveIframeWrapperController,N as ScrollIntoFocusController,W as ScrollToBottomController,q as ScrollToController,B as ScrollToTopController,U as SelfDestructController,$ as TeleportController,F as ToggleClassController,_ as WordCountController};
//# sourceMappingURL=stimulus-library.module.js.map
