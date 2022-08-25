import axios from "axios";
import $store from "@/store";
import Resonance from "@/src/Resonance";

const getAllDataAsync = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("./datas/all.json")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getEquipDataAsync = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get("./datas/" + id + ".json")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default async () => {
  let datas = [];
  let allData = await getAllDataAsync();
  for (let i = 0; i < allData.length; i++) {
    let item = allData[i];
    let detail = await getEquipDataAsync(item.id);
    if (
      detail.name.indexOf("森林之魔女") > -1 ||
      detail.name.indexOf("恩特精灵") > -1 ||
      detail.name.indexOf("蓝灵绿") > -1 ||
      detail.name.indexOf("深潜迷航") > -1 ||
      detail.name.indexOf("军团") > -1 ||
      detail.name.indexOf("金龙") > -1 ||
      detail.name.indexOf("真龙") > -1 ||
      detail.name.indexOf("黑龙") > -1 ||
      detail.name.indexOf("火龙") > -1 ||
      detail.name.indexOf("天界联合军") > -1
    ) {
      continue;
    }
    datas.push({
      ...item,
      detail,
    });
  }
  //共鸣灵力
  datas = [...datas, ...Resonance];

  await $store.dispatch("setDB", datas);
};
