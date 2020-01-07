import "../css/index.scss";

import tools from "../utils/tools";

import pageItemTpl from "../template/pageItem.tpl";

import { TabModel } from "../model/tab";
const tabModel = new TabModel();

class Tab {
  constructor(doc) {
    const oTab = doc.getElementsByClassName("J_tab")[0];
    this.oNav = oTab.getElementsByClassName("nav")[0];
    this.oPage = oTab.getElementsByClassName("page")[0];
    this.oLine = this.oNav.getElementsByClassName("line")[0];
    this.oNavItems = this.oNav.getElementsByClassName("item");

    this.curIndex = 0;
    this.cityId = 0;

    this.cache = {};

    this.init();
  }
  async init() {
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    this.oNav.addEventListener("click", this.onNavClick.bind(this), false);
  }

  async render() {
    if (!this.cache[this.cityId]) {
      this.cache[this.cityId] = "";
      const data = await this.getListData(this.cityId);
      data.forEach(item => {
        this.cache[this.cityId] += tools.tplReplace(pageItemTpl(), {
          img: item.img,
          name: item.name,
          price: item.default_price,
          field: item.field,
          area: item.area
        });
      });
    }

    this.oPage.innerHTML = this.cache[this.cityId];
  }

  async getListData(cityId) {
    return await tabModel.getListData(cityId);
  }

  onNavClick(ev) {
    //事件代理
    const e = ev || window.event, //事件
      tar = e.target || e.srcElement, //点击的本身
      tagName = tar.tagName.toLowerCase(); //点击的标签名
    if (tagName === "a") {
      this.cityId = tar.parentNode.getAttribute("data-id");
      this.tabChange(tar);
    }
  }

  tabChange(target) {
    const oParent = target.parentNode;
    this.oNavItems[this.curIndex].className = "item";
    // this.curIndex = [...this.oNavItems].indexOf(oParent);
    this.curIndex = [].indexOf.call(this.oNavItems, oParent);
    this.oNavItems[this.curIndex].className += " active";
    this.oLine.style.left = this.curIndex * 100 + "px";
    this.render();
  }
}

new Tab(document);
