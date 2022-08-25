import Equip from "./Equip.js";
import Growth from "./Growth.js";
import EGrowth from "./EGrowth.js";
import { LvToExp } from "./Tool.js";
import $store from "@/store";
import { toRaw } from "vue";

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomLv = ([min, max]) => {
  let over10p = toRaw($store.getters.over10p);
  let a = min,
    b = max;
  let c = over10p * 100;
  let r = random(0, 100);
  if (r >= c) {
    b = max + 10;
  }
  return random(a, b);
};

export const getEquip = (dungeon) => {
  let all = toRaw($store.getters.db);
  //先选择一个装备 减去最后的共鸣
  let index = random(0, all.length - 12);
  let params = all[index];
  //确认Lv4次
  const lvs = [
    getRandomLv(dungeon),
    getRandomLv(dungeon),
    getRandomLv(dungeon),
    getRandomLv(dungeon),
  ];
  const exps = [
    LvToExp([lvs[0]]),
    LvToExp([lvs[1]]),
    LvToExp([lvs[2]]),
    LvToExp([lvs[3]]),
  ];

  let EG = new EGrowth([
    new Growth(exps[0]),
    new Growth(exps[1]),
    new Growth(exps[2]),
    new Growth(exps[3]),
  ]);

  return new Equip(EG, params.id);
};
