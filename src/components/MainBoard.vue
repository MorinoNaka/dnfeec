<template>
  <div>
    <MainTools />
    <MainBag />
    <MainInfo />
  </div>
</template>

<script>
import MainTools from "./MainTools.vue";
import MainBag from "./MainBag.vue";
import MainInfo from "./MainInfo.vue";
export default {
  name: "MainBoard",
  components: {
    MainTools,
    MainBag,
    MainInfo,
  },
};
</script>

<style scoped lang="scss"></style>
