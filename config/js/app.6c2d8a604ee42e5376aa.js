webpackJsonp([1],{NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App"},i,!1,function(t){n("Pe99")},null,null).exports,r=n("/ocq"),s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var c=n("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App  Maple"}}},s,!1,function(t){n("UW+3")},"data-v-505fc37a",null).exports,u=n("Xxa5"),l=n.n(u),h=n("//Fk"),d=n.n(h),v=n("exGp"),f=n.n(v),p=n("mvHQ"),m=n.n(p),k={name:"RandomCheckIn",data:function(){return{dynamicTags:[],notCheckSutList:[],alreadyCheckedList:[],inputVisible:!1,inputValue:"",drawer:!1,direction:"btt",colorIndex:0,bottomShow:[],intervalId:null,bottomCount:[],curStudent:""}},created:function(){var t=this,e=localStorage.getItem("checkInStuList");this.dynamicTags=JSON.parse(e),this.dynamicTags&&this.dynamicTags.length>0?this.drawer=!1:this.drawer=!0,this.bottomShow=[],this.dynamicTags.forEach(function(e){return t.bottomShow.push({text:e,isActive:!1})}),this.notCheckSutList=[],this.dynamicTags.forEach(function(e){return t.notCheckSutList.push(e)}),this.alreadyCheckedList=[]},mounted:function(){window.addEventListener("keyup",this.handleKeyUp)},beforeDestroy:function(){window.removeEventListener("keyup",this.handleKeyUp)},methods:{toggleButton:function(t){var e=this;this.bottomShow.forEach(function(e,n){e.isActive=n===t}),this.alreadyCheckedList.forEach(function(t){for(var n=0;n<e.bottomShow.length;++n)e.bottomShow[n].text==t&&(e.bottomShow[n].isActive=!0)})},handleDrawerClose:function(t){var e=this;this.$confirm("确认关闭？").then(function(n){t(),localStorage.setItem("checkInStuList",m()(e.dynamicTags)),e.bottomShow=[],e.dynamicTags.forEach(function(t){return e.bottomShow.push({text:t,isActive:!1})}),e.notCheckSutList=[],e.dynamicTags.forEach(function(t){return e.notCheckSutList.push(t)}),e.alreadyCheckedList=[]}).catch(function(t){})},handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick(function(e){t.$refs.saveTagInput.$refs.input.focus()})},cleanData:function(){var t=this;this.$confirm("确认清空？").then(function(e){done(),t.dynamicTags=[],localStorage.setItem("checkInStuList",m()(t.dynamicTags))}).catch(function(t){})},handleInputConfirm:function(){var t=this.inputValue;t&&this.dynamicTags.push(t),this.inputVisible=!1,this.inputValue=""},handleRandomCheck:function(){var t=this;return f()(l.a.mark(function e(){var n,a,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("开始"),!(t.notCheckSutList.length<=0)){e.next=5;break}return t.resetCheck(),alert("所有同学都已点到！"),e.abrupt("return");case 5:return n=0,a=0,t.intervalId=setInterval(function(){t.toggleButton(a),n=a,a=(a+1)%t.bottomShow.length},50),e.next=10,new d.a(function(t){return setTimeout(t,1e3)});case 10:t.intervalId&&(clearInterval(t.intervalId),t.intervalId=null),t.bottomShow[n].isActive=!1,i=Math.floor(Math.random()*t.notCheckSutList.length),t.curStudent=t.notCheckSutList[i],t.alreadyCheckedList.push(t.curStudent),t.notCheckSutList.splice(i,1),t.alreadyCheckedList.forEach(function(e){for(var n=0;n<t.bottomShow.length;++n)t.bottomShow[n].text==e&&(t.bottomShow[n].isActive=!0)}),console.log(t.notCheckSutList),console.log(t.alreadyCheckedList);case 19:case"end":return e.stop()}},e,t)}))()},resetCheck:function(){var t=this;this.notCheckSutList=[],this.dynamicTags.forEach(function(e){return t.notCheckSutList.push(e)}),this.alreadyCheckedList=[],this.notCheckSutList.forEach(function(e){for(var n=0;n<t.bottomShow.length;++n)t.bottomShow[n].text==e&&(t.bottomShow[n].isActive=!1)})},handleKeyUp:function(t){13===t.keyCode&&this.showInput()}},directives:{debounce:{inserted:function(t,e){var n=void 0;t.addEventListener("click",function(){n&&clearTimeout(n),n=setTimeout(function(){e.value()},e.args||500)})}}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("div",{staticClass:"flexBodyName",attrs:{shadow:"always"}},t._l(t.bottomShow,function(e,a){return n("div",{key:a,staticClass:"botton-list"},[n("el-button",{class:{"round-color":e.isActive,"botton-list":!0},attrs:{size:"small"},on:{click:function(t){}}},[t._v(" "+t._s(e.text))])],1)}),0),t._v(" "),n("el-drawer",{attrs:{title:"修改名单",visible:t.drawer,direction:t.direction,"before-close":t.handleDrawerClose,size:"50%"},on:{"update:visible":function(e){t.drawer=e}}},[t._l(t.dynamicTags,function(e){return n("el-tag",{key:e,attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return t.handleClose(e)}}},[t._v("\n            "+t._s(e)+"\n        ")])}),t._v(" "),t.inputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm.apply(null,arguments)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):n("el-button",{ref:"addTag",staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.showInput.apply(null,arguments)}}},[t._v("\n            + 新增\n        ")]),t._v(" "),n("el-button",{staticStyle:{"margin-left":"16px",display:"flex",position:"fixed",bottom:"2%",right:"10%"},attrs:{size:"small",type:"primary"},on:{click:t.cleanData}},[t._v(" 清空\n        ")])],2),t._v(" "),n("el-button",{staticClass:"change",attrs:{type:"primary"},on:{click:function(e){t.drawer=!0}}},[t._v("\n        修改名单\n    ")]),t._v(" "),n("el-button",{directives:[{name:"debounce",rawName:"v-debounce:5000",value:t.handleRandomCheck,expression:"handleRandomCheck",arg:"5000"}],staticClass:"start",attrs:{type:"primary"}},[t._v("\n        开始点名\n    ")]),t._v(" "),n("el-button",{directives:[{name:"debounce",rawName:"v-debounce:5000",value:t.resetCheck,expression:"resetCheck",arg:"5000"}],staticClass:"reset",attrs:{type:"primary"}},[t._v("\n        重置点名\n    ")])],1)},staticRenderFns:[]};var g=n("VU/8")(k,_,!1,function(t){n("xjEZ")},"data-v-4cd9e51c",null).exports;a.default.use(r.a);var b=new r.a({routes:[{path:"/HelloWorld",name:"HelloWorld",component:c},{path:"/",name:"CheckIn",component:g}]}),y=n("zL8q"),w=n.n(y);n("tvR6");a.default.use(w.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:b,components:{App:o},template:"<App/>",render:function(t){return t(o)}})},Pe99:function(t,e){},"UW+3":function(t,e){},tvR6:function(t,e){},xjEZ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.6c2d8a604ee42e5376aa.js.map