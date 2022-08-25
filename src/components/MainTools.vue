<template>
  <div>
    <div class="tools">
      <div class="cost">总消费金绿数:</div>
      <div class="cost">{{ cost }} 个</div>
      <el-button type="Warning" round @click="rest"> 初始化 </el-button>
      <el-button type="primary" round @click="open('create')">
        创建装备
      </el-button>
      <el-button type="primary" round @click="open('random')">
        随机装备
      </el-button>
      <el-button type="primary" round @click="open('eat')">
        装备成长
      </el-button>
      <el-button type="primary" round @click="open('transfer')">
        经验转移
      </el-button>
      <el-button type="primary" round @click="localsave">
        本地保存背包
      </el-button>
      <el-button type="primary" round @click="localread">
        读取本地背包
      </el-button>
      <el-button type="primary" round @click="localclear">
        清空本地内容
      </el-button>
    </div>

    <el-drawer
      :with-header="false"
      size="580px"
      v-model="create"
      title="创建装备"
      destroy-on-close
    >
      <EquipCreate />
    </el-drawer>
    <el-drawer
      :with-header="false"
      size="580px"
      v-model="random"
      title="随机装备"
      destroy-on-close
    >
      <EquipRandom />
    </el-drawer>
    <el-drawer
      :with-header="false"
      size="580px"
      v-model="eat"
      title="装备成长"
      :before-close="handleClose"
      destroy-on-close
    >
      <EquipEat />
    </el-drawer>
    <el-drawer
      :with-header="false"
      size="580px"
      v-model="transfer"
      title="经验转移"
      :before-close="handleClose"
      destroy-on-close
    >
      <EquipTransfer />
    </el-drawer>
  </div>
</template>

<script>
import EquipCreate from "./EquipCreate";
import EquipRandom from "./EquipRandom";
import EquipEat from "./EquipEat";
import EquipTransfer from "./EquipTransfer";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainTools",
  components: {
    EquipCreate,
    EquipRandom,
    EquipEat,
    EquipTransfer,
  },
  computed: {
    ...mapGetters(["cost", "bag", "cost"]),
  },
  data() {
    return {
      create: false,
      random: false,
      eat: false,
      transfer: false,
    };
  },
  methods: {
    ...mapActions(["set", "rest"]),
    open(key) {
      this[key] = true;
    },
    handleClose() {
      this.set({
        key: "left",
        value: null,
      });
      this.set({
        key: "right",
        value: null,
      });
      this.eat = false;
      this.transfer = false;
    },
    localsave() {
      localStorage.setItem("dnfeec_Bag", JSON.stringify(this.bag));
      localStorage.setItem("dnfeec_cost", JSON.stringify(this.cost));
    },
    localread() {
      let dnfeec_Bag = localStorage.getItem("dnfeec_Bag");
      let dnfeec_cost = localStorage.getItem("dnfeec_cost");
      let bag = JSON.parse(dnfeec_Bag);
      let cost = JSON.parse(dnfeec_cost);
      this.set({
        key: "bag",
        value: bag ? bag : [],
      });
      this.set({
        key: "cost",
        value: cost ? cost : 0,
      });
    },
    localclear() {
      localStorage.setItem("dnfeec_Bag", null);
      localStorage.setItem("dnfeec_cost", null);
    },
  },
};
</script>

<style scoped lang="scss">
.tools {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  float: left;
  margin-right: 20px;
  width: 140px;
  button {
    margin: 10px;
  }
  .cost {
    color: yellow;
    font-size: 16px;
  }
}
</style>
