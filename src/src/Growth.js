import { ExpToLv } from "./Tool";

/**
 * 单个词条对象
 * 由exp构成
 */
export default class Growth {
  constructor(exp, id) {
    this.exp = exp;
    this.id = id;
  }
  setExp(exp) {
    this.exp = exp;
  }
  setId(id) {
    this.id = id;
  }
  getExp() {
    return this.exp;
  }
  getLv() {
    return ExpToLv(this.exp);
  }
  /**
   * 用于展示,等级+1展示
   */
  getInfo() {
    let lvinfo = this.getLv();
    return "LV:" + (lvinfo[0] + 1) + "(EXP" + lvinfo[1].toFixed(2) + ")%";
  }
}
