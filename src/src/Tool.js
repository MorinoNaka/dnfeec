import { exps } from "@/src/Const.js";

/**
 * 所有等级从0开始!!!!展示时+1
 */

export const ExpToLv = (exp) => {
  let index = exps.findIndex((e) => {
    return e > exp;
  });
  let lv = index - 1;
  if (index === -1) {
    return [78, 0];
  }
  let overflow = exp - exps[lv];
  let next = exps[lv + 1] - exps[lv];
  let over = (overflow / next) * 100;
  return [lv, over];
};

export const LvToExp = ([lv, over = 0]) => {
  let expBase = exps[lv];
  let next = exps[lv + 1] - exps[lv];
  let expOver = next * (over / 100);
  expOver = isNaN(expOver) ? 0 : expOver;
  return expBase + expOver;
};
