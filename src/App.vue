<template>
  <div v-loading="loading" class="war">
    <MainBoard />
  </div>
</template>

<script>
import MainBoard from "./components/MainBoard.vue";
import access from "@/src/Access";
export default {
  name: "App",
  components: {
    MainBoard,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    let self = this;
    setTimeout(async () => {
      self.loading = true;
      await access();
      self.loading = false;
    });
  },
};
</script>

<style lang="scss">
.war {
  width: 850px;
  height: 500px;
  position: absolute;
  left: calc(50% - (850px / 2));
  top: calc(50% - (500px / 2));
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid black;
  padding: 10px;
}
</style>
