<template>
  <div class="warpper">
    <EquipInfo :equip="bagSelectedEquip" />
    <el-row>
      <el-button
        class="delete"
        type="danger"
        round
        @click="deleteEquip"
        v-if="bagSelectedEquip"
      >
        删除
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EquipInfo from "@/components/EquipInfo";

export default {
  name: "MainInfo",
  components: {
    EquipInfo,
  },
  computed: {
    ...mapGetters(["bagSelectedEquip"]),
  },
  methods: {
    ...mapActions(["deleteEquip"]),
  },
};
</script>

<style scoped lang="scss">
.warpper {
  margin-left: 20px;
}
</style>
