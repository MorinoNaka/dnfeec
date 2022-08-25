import Growth from "@/src/Growth";

/**
 * 装备的等级对象
 * 包含 4个词条的经验总值
 * 可以通过换算,获取 4个词条的等级以及多余的exp
 * 通过给予经验条来创建growth对象
 */
export default class EGrowth {
  constructor(
    [Growtha, Growthb, Growthc, Growthd],
    ids = [-999, -999, -999, -999]
  ) {
    this.Growtha = Growtha;
    this.Growthb = Growthb;
    this.Growthc = Growthc;
    this.Growthd = Growthd;
    this.setId(ids);
  }
  getTotalExp() {
    return (
      this.Growtha.getExp() +
      this.Growthb.getExp() +
      this.Growthc.getExp() +
      this.Growthd.getExp()
    ).toFixed(2);
  }
  /**
   * 用于展示,等级+1展示
   */
  getInfo() {
    return [
      this.Growtha.getInfo(),
      this.Growthb.getInfo(),
      this.Growthc.getInfo(),
      this.Growthd.getInfo(),
    ];
  }
  setId([ida, idb, idc, idd]) {
    this.Growtha.setId(ida);
    this.Growthb.setId(idb);
    this.Growthc.setId(idc);
    this.Growthd.setId(idd);
  }
  setExp([expa, expb, expc, expd]) {
    this.Growtha.setExp(expa);
    this.Growthb.setExp(expb);
    this.Growthc.setExp(expc);
    this.Growthd.setExp(expd);
  }
  eat(eatEGrowth) {
    let cost = 10;
    const gEat = (g, eatg) => {
      let llk = false;
      //被吃的等于-900(共鸣)
      if (eatg.id === -900) {
        llk = true;
        //吃与被吃=-999（自定义就不是连连看）
      } else if (g.id === -999 || eatg.id === -999) {
        llk = false;
        //吃与被吃相等,上面判断了-999所以已经排除2个都是自定义情况
      } else if (g.id === eatg.id) {
        llk = true;
      }
      let times, cost;
      if (llk) {
        times = 1;
        cost = 10;
      } else {
        times = 0.3;
        cost = 0;
      }
      let exp = g.exp + eatg.exp * times;
      return [exp, cost];
    };

    let ra = gEat(this.Growtha, eatEGrowth.Growtha);
    let rb = gEat(this.Growthb, eatEGrowth.Growthb);
    let rc = gEat(this.Growthc, eatEGrowth.Growthc);
    let rd = gEat(this.Growthd, eatEGrowth.Growthd);

    cost = cost + ra[1] + rb[1] + rc[1] + rd[1];

    let exps = [ra[0], rb[0], rc[0], rd[0]];
    let EG = new EGrowth([
      new Growth(exps[0]),
      new Growth(exps[1]),
      new Growth(exps[2]),
      new Growth(exps[3]),
    ]);

    return [EG, cost];
  }
}
