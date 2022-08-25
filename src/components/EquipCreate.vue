<template>
  <div class="drwarpper">
    <h3>本模拟器暂不支持创建自定义以及军团装备</h3>
    <div class="block">
      <h2>创建一个装备</h2>
      <el-form
        label-position="right"
        label-width="100px"
        :model="formData"
        style="max-width: 460px"
      >
        <el-form-item>
          <el-switch
            v-model="formData.isResonance"
            active-text="共鸣装备"
            inactive-text="制式装备"
            @change="onSwitchChange"
          />
        </el-form-item>

        <template v-if="!formData.isResonance">
          <el-form-item label="装备类别">
            <el-select
              v-model="formData.typeName"
              class="m-2"
              placeholder="选择一个类别"
              @change="onTypeNameChange"
            >
              <el-option
                v-for="typeName in typeNames"
                :key="typeName"
                :label="typeName"
                :value="typeName"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="装备名称">
            <el-select
              v-model="formData.id"
              class="m-2"
              placeholder="选择一个装备"
            >
              <el-option
                v-for="data in tndb"
                :key="data.id"
                :label="data.detail.name + '/' + data.typeName"
                :value="data.id"
              />
            </el-select>
          </el-form-item>
        </template>
        <template v-if="formData.isResonance">
          <el-form-item label="装备名称">
            <el-select
              v-model="formData.id"
              class="m-2"
              placeholder="选择一个装备"
            >
              <el-option
                v-for="data in reList"
                :key="data.id"
                :label="data.detail.name + '/' + data.typeName"
                :value="data.id"
              />
            </el-select>
          </el-form-item>
        </template>

        <el-form-item label="一词条等级">
          <el-input-number
            v-model="formData.expa"
            :min="1"
            :max="79"
            precision="0"
          />
        </el-form-item>
        <el-form-item label="一词条超出">
          <el-input-number
            v-model="formData.overa"
            :min="0"
            :max="100"
            precision="2"
          />%
        </el-form-item>
        <el-form-item label="二词条等级">
          <el-input-number
            v-model="formData.expb"
            :min="1"
            :max="79"
            precision="0"
          />
        </el-form-item>
        <el-form-item label="二词条超出">
          <el-input-number
            v-model="formData.overb"
            :min="0"
            :max="100"
            precision="2"
          />%
        </el-form-item>
        <el-form-item label="三词条等级">
          <el-input-number
            v-model="formData.expc"
            :min="1"
            :max="79"
            precision="0"
          />
        </el-form-item>
        <el-form-item label="三词条超出">
          <el-input-number
            v-model="formData.overc"
            :min="0"
            :max="100"
            precision="2"
          />%
        </el-form-item>
        <el-form-item label="四词条等级">
          <el-input-number
            v-model="formData.expd"
            :min="1"
            :max="79"
            precision="0"
          />
        </el-form-item>
        <el-form-item label="四词条超出">
          <el-input-number
            v-model="formData.overd"
            :min="0"
            :max="100"
            precision="2"
          />%
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="getEqT">创建装备</el-button>
      <el-button type="primary" round @click="rest">还原表单</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Growth from "@/src/Growth";
import EGrowth from "@/src/EGrowth";
import { LvToExp } from "@/src/Tool";
import Equip from "@/src/Equip";
import Resonance from "@/src/Resonance";
import { ElMessage } from "element-plus";
export default {
  name: "EquipCreate",
  data() {
    return {
      reList: Resonance,
      formData: {
        isResonance: false,
        typeName: "上衣",
        id: 247,
        expa: 1,
        overa: 0,
        expb: 1,
        overb: 0,
        expc: 1,
        overc: 0,
        expd: 1,
        overd: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["bag", "db"]),
    typeNames() {
      let r = [];
      this.db.forEach((item) => {
        if (r.indexOf(item.typeName) === -1) {
          r.push(item.typeName);
        }
      });
      return r;
    },
    tndb() {
      return this.db.filter((item) => item.typeName === this.formData.typeName);
    },
  },
  methods: {
    ...mapActions(["addEquipToBag"]),
    onSwitchChange() {
      if (this.formData.isResonance) {
        this.formData.typeName = "头肩";
        this.formData.id = -901;
      } else {
        this.formData.typeName = "上衣";
        this.formData.id = 247;
      }
    },
    onTypeNameChange() {
      this.formData.id = this.db.find(
        (item) => item.typeName === this.formData.typeName
      ).id;
    },
    rest() {
      this.formData = {
        isResonance: false,
        typeName: "上衣",
        id: 247,
        expa: 1,
        overa: 0,
        expb: 1,
        overb: 0,
        expc: 1,
        overc: 0,
        expd: 1,
        overd: 0,
      };
    },
    getEqT() {
      if (this.bag.length > 69) {
        ElMessage({
          message: "超过装备数量上限70个,请删除几个再创建",
          type: "warning",
        });
        return;
      }
      const formData = this.formData;
      const exps = [
        LvToExp([formData.expa - 1, formData.overa]),
        LvToExp([formData.expb - 1, formData.overb]),
        LvToExp([formData.expc - 1, formData.overc]),
        LvToExp([formData.expd - 1, formData.overd]),
      ];
      const EG = new EGrowth([
        new Growth(exps[0]),
        new Growth(exps[1]),
        new Growth(exps[2]),
        new Growth(exps[3]),
      ]);
      let eq = new Equip(EG, formData.id);
      this.addEquipToBag(eq);
    },
  },
};
</script>

<style scoped>
.block {
  margin-bottom: 30px;
  padding-bottom: 30px;
}
</style>
