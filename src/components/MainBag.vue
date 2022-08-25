<template>
  <div class="bag">
    <div
      class="box"
      v-for="(equip, index) in bag"
      @click="selectedEq(index)"
      :key="index"
    >
      <div class="boxs" :class="selectedClass(index)">
        <div class="box-icon">
          <img :src="'/png' + equip.p.icon" class="box-img" />
        </div>
      </div>
    </div>
    <div class="box" v-for="i in 70 - bag.length" :key="i"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainBag",
  computed: {
    ...mapGetters(["bag", "bagSelected", "left", "right"]),
  },
  methods: {
    ...mapActions(["set"]),
    selectedEq(index) {
      if (this.bagSelected === index) {
        this.set({
          key: "bagSelected",
          value: null,
        });
      } else {
        this.set({
          key: "bagSelected",
          value: index,
        });
      }
    },
    selectedClass(index) {
      if (this.left === index) {
        return "selectedleft";
      }
      if (this.right === index) {
        return "selectedright";
      }

      if (this.bagSelected === index) {
        return "selected";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bag {
  width: 385px;
  height: 450px;
  border: 1px solid #303030;
  background-color: rgba(0, 0, 0, 0.45);
  float: left;
  .box {
    height: 40px;
    width: 40px;
    border: 1px solid #1a1a1a;
    background-color: rgba(0, 0, 0, 0.5);
    margin-right: 3px;
    margin-bottom: 3px;
    padding-right: 10px;
    float: left;
    position: relative;
    .boxs {
      width: 38px;
      height: 38px;
      position: absolute;
      top: 0px;
      left: 5px;
    }
    .selected {
      border: 2px solid yellow;
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
  }
}
</style>
