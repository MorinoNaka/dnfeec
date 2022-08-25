import $store from "@/store";
import { toRaw } from "vue";
/**
 *
 */
export default class Equip {
  constructor(EGrowth, id) {
    this.EGrowth = EGrowth;
    this.id = id;
    let data = toRaw($store.getters.db).find((item) => item.id === id);
    this.p = {
      id: data.id,
      type: data.type,
      typeName: data.typeName,
      icon: data.icon,
      name: data.detail.name,
      growthProps: data.detail.prop.growthProps,
    };
    const growthProps = this.p.growthProps;
    if (growthProps.length === 4) {
      this.EGrowth.setId([
        growthProps[0].id,
        growthProps[1].id,
        growthProps[2].id,
        growthProps[3].id,
      ]);
    }
  }
  eat(equipEat) {
    return this.EGrowth.eat(equipEat.EGrowth);
  }
}
