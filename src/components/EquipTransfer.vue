<template>
  <div class="drwarpper">
    <div class="consoleclazz">
      <el-row>
        <el-col :span="6">
          <div class="boxs selectedleft">
            <div class="box-icon">
              <template v-if="leftSelectedEquip">
                <img :src="'/png' + leftSelectedEquip.p.icon" class="box-img" />
              </template>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <el-icon class="box-icon"><DArrowRight /></el-icon>
        </el-col>
        <el-col :span="6">
          <div class="boxs selectedright">
            <div class="box-icon">
              <template v-if="rightSelectedEquip">
                <img
                  :src="'/png' + rightSelectedEquip.p.icon"
                  class="box-img"
                />
              </template>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <el-icon class="box-icon"><DArrowRight /></el-icon>
        </el-col>
        <el-col :span="6">
          <div class="boxs">
            <div class="box-icon">
              <template v-if="result">
                <img :src="'/png' + result.p.icon" class="box-img" />
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <EquipInfo :equip="leftSelectedEquip" />
        </el-col>
        <el-col :span="8">
          <EquipInfo :equip="rightSelectedEquip" />
        </el-col>
        <el-col :span="8">
          <EquipInfo :equip="result" />
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="12">
        <div>
          <h2>转移的装备</h2>
          <el-select
            class="m-2"
            v-model="left"
            placeholder="选择一个装备"
            @change="changeLeft"
          >
            <el-option
              v-for="(data, index) in bag"
              :key="index"
              :label="data.p.name + '/' + data.p.typeName"
              :value="index"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <h2>被转移的装备</h2>
          <el-select
            class="m-2"
            v-model="right"
            placeholder="选择一个装备"
            @change="changeRight"
          >
            <el-option
              v-for="(data, index) in bag"
              :key="index"
              :label="data.p.name + '/' + data.p.typeName"
              :value="index"
            />
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row class="mrtop">
      <span>此模拟转移会消耗蓝框装备</span>
    </el-row>
    <el-row class="mrtop">
      <el-button type="primary" round @click="transfer">转移</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ElMessage } from "element-plus";
import Equip from "@/src/Equip";
import EquipInfo from "@/components/EquipInfo";

export default {
  name: "EquipTransfer",
  components: {
    EquipInfo,
  },
  computed: {
    ...mapGetters([
      "bag",
      "left",
      "right",
      "leftSelectedEquip",
      "rightSelectedEquip",
    ]),
    result() {
      if (this.leftSelectedEquip && this.rightSelectedEquip) {
        let EG = this.leftSelectedEquip.EGrowth;
        let id = this.rightSelectedEquip.id;
        return new Equip(EG, id);
      }
      return null;
    },
  },
  methods: {
    ...mapActions(["addEquipToBag", "set", "transferEq", "addCost"]),
    changeLeft(val) {
      let eqleft = this.bag[val];
      let eqright = this.rightSelectedEquip;
      if (val === this.right) {
        ElMessage({
          message: "不能选择同一装备!",
          type: "warning",
        });
      } else if (
        eqleft &&
        eqright &&
        eqleft.p.typeName !== eqright.p.typeName
      ) {
        ElMessage({
          message: "请选择相同部位装备!",
          type: "warning",
        });
      } else {
        this.set({
          key: "left",
          value: val,
        });
      }
    },
    changeRight(val) {
      let eqleft = this.leftSelectedEquip;
      let eqright = this.bag[val];
      if (val === this.left) {
        ElMessage({
          message: "不能选择同一装备!",
          type: "warning",
        });
      } else if (
        eqleft &&
        eqright &&
        eqleft.p.typeName !== eqright.p.typeName
      ) {
        ElMessage({
          message: "请选择相同部位装备!",
          type: "warning",
        });
      } else {
        this.set({
          key: "right",
          value: val,
        });
      }
    },
    transfer() {
      this.transferEq(this.result);
      this.addCost(500);
    },
  },
};
</script>

<style scoped lang="scss">
.consoleclazz {
  border: 1px solid #303030;
  background-color: rgba(0, 0, 0, 0.45);
  padding: 10px;
}
.boxs {
  width: 38px;
  height: 38px;
  display: inline-block;
}
.selectedleft {
  border: 2px solid blue;
}
.selectedright {
  border: 2px solid red;
}
.box-icon {
  width: 38px;
  height: 38px;
  font-size: 38px;
  position: relative;
  display: inline-block;
  border-radius: 3px;
}
.box-img {
  position: relative;
  top: 0px;
  left: 0px;
  width: 38px;
  height: 38px;
  border-radius: 2px;
}
.mrtop {
  margin-top: 10px;
  span {
    color: blue;
  }
}
</style>
