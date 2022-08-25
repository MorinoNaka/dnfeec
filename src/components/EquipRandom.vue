<template>
  <div class="drwarpper">
    <h3>本模拟器暂不支持创建自定义以及军团装备</h3>
    <div class="block">
      <h2>随机一个副本装备</h2>
      <el-row>
        <el-select v-model="dungeon" class="m-2" placeholder="选择一个副本">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-row>
      <el-row>
        <span>超10级随机概率</span>
        <el-input-number
          v-model="over10p"
          :min="0"
          :max="1"
          precision="2"
          size="small"
          :controls="false"
          @change="onOver10pChange"
        />
        <span>%</span>
      </el-row>
      <el-row>
        <span>随机区间:</span><span>{{ dungeonArea }}</span>
      </el-row>
      <el-row class="mrt">
        <el-button type="primary" round @click="getEq">获取装备</el-button>
        <el-button type="primary" round @click="getEqTen"
          >获取装备10次</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  DUNGEON_NIGHTMARE,
  DUNGEON_NOBLE,
  DUNGEON_SEVENWARGOD,
  DUNGEON_SILENTCITY,
} from "@/src/Const";
import { getEquip } from "@/src/Generate";
import { ElMessage } from "element-plus";

export default {
  name: "EquipRandom",
  data() {
    return {
      dungeon: "DUNGEON_NIGHTMARE",
      options: [
        {
          label: "英豪噩梦",
          value: "DUNGEON_NIGHTMARE",
        },
        {
          label: "机械七战神勇士",
          value: "DUNGEON_SEVENWARGOD",
        },
        {
          label: "寂静城勇士",
          value: "DUNGEON_SILENTCITY",
        },
        {
          label: "贵族机要勇士",
          value: "DUNGEON_NOBLE",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["bag", "over10p"]),
    dungeonArea() {
      let dungeonArea;
      switch (this.dungeon) {
        case "DUNGEON_NIGHTMARE":
          dungeonArea = DUNGEON_NIGHTMARE;
          break;
        case "DUNGEON_SEVENWARGOD":
          dungeonArea = DUNGEON_SEVENWARGOD;
          break;
        case "DUNGEON_SILENTCITY":
          dungeonArea = DUNGEON_SILENTCITY;
          break;
        case "DUNGEON_NOBLE":
          dungeonArea = DUNGEON_NOBLE;
          break;
      }
      return dungeonArea;
    },
  },
  methods: {
    ...mapActions(["addEquipToBag", "set"]),
    onOver10pChange(val) {
      this.set({
        key: "over10p",
        value: val,
      });
    },
    getEqTen() {
      if (this.bag.length + 10 > 69) {
        ElMessage({
          message: "超过装备数量上限70个,请删除几个再创建",
          type: "warning",
        });
        return;
      }
      Array.from({ length: 10 }, (v, i) => i).forEach(this.getEq);
    },
    getEq() {
      if (this.bag.length > 69) {
        ElMessage({
          message: "超过装备数量上限70个,请删除几个再创建",
          type: "warning",
        });
        return;
      }

      let eq = getEquip(this.dungeonArea);
      this.addEquipToBag(eq);
    },
  },
};
</script>

<style scoped>
.mrt {
  margin-top: 20px;
}
.block {
  margin-bottom: 30px;
  padding-bottom: 30px;
}
</style>
