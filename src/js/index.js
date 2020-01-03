import "../css/reset.scss";
import "../css/base.scss";
import "../css/index.scss";

class Tab {
  constructor(doc) {
    const oTab = doc.getElementsByClassName("J_tab")[0];
    this.oNav = doc.getElementsByClassName("nav")[0];
    this.oPage = doc.getElementsByClassName("page")[0];
    this.line = this.oNav.getElementsByClassName("line")[0];
    this.oNavItems = this.oNav.getElementsByClassName("item");
  }
  init() {}

  bindEvent() {
    this.oNav.addEventListener("click", this.onNavClick.bind(this));
  }
  onNavclick(ev) { //事件代理
    const e = ev || window.event,
      tar = e.target || e.srcElement,
      tagName = tar.tagName.toLowerCase();
  }
}

let tab = new Tab(document);
console.log(tab.line);



