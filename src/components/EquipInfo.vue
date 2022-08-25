<template>
  <div class="warpper">
    <template v-if="equip">
      <div class="epic">{{ equip.p.name }}</div>
      <div class="epic">{{ equip.p.typeName }}</div>
      <div class="white">总经验:{{ equip.EGrowth.getTotalExp() }}</div>
      <div class="white">
        {{ equip.EGrowth.getInfo()[0] }}
      </div>
      <div class="white">
        {{ equip.EGrowth.getInfo()[1] }}
      </div>
      <div class="white">
        {{ equip.EGrowth.getInfo()[2] }}
      </div>
      <div class="white">
        {{ equip.EGrowth.getInfo()[3] }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "EquipInfo",
  props: {
    equip: Object,
  },
};
</script>

<style scoped lang="scss">
.warpper {
  border: 1px solid #303030;
  background-color: rgba(0, 0, 0, 0.45);
  float: left;
  padding: 10px;
  .epic {
    color: yellow;
  }
  .white {
    color: white;
  }
}
</style>
