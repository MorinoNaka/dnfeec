import { createStore } from "vuex";

export default createStore({
  state: {
    db: [],
    bag: [],
    bagSelected: null,
    cost: 0,

    left: null,
    right: null,
    over10p: 0.01,
  },
  getters: {
    db: (state) => state.db,
    bag: (state) => state.bag,
    bagSelected: (state) => state.bagSelected,
    bagSelectedEquip: (state) => {
      return state.bag[state.bagSelected];
    },
    cost: (state) => state.cost,
    left: (state) => state.left,
    right: (state) => state.right,
    leftSelectedEquip: (state) => {
      return state.bag[state.left];
    },
    rightSelectedEquip: (state) => {
      return state.bag[state.right];
    },
    over10p: (state) => {
      return state.over10p;
    },
  },
  mutations: {
    SET_DB: (state, db) => {
      state.db = db;
    },
    SET: (state, { key, value }) => {
      state[key] = value;
    },
    ADDEQUIPTOBAG: (state, equip) => {
      state.bag.push(equip);
      state.bagSelected = state.bag.length - 1;
    },
    DELETEEQUIP: (state) => {
      state.bag.splice(state.bagSelected, 1);
      state.bagSelected = state.bag.length - 1;
    },
    TRANSFEREQ: (state, equip) => {
      state.bag[state.right] = equip;
      state.bag.splice(state.left, 1);

      state.left = null;
      state.right = null;
    },
    EATEQ: (state, equip) => {
      state.bag[state.left] = equip;
      state.bag.splice(state.right, 1);

      state.left = null;
      state.right = null;
    },
    ADDCOST: (state, cost) => {
      state.cost = state.cost + cost;
    },
    REST: (state) => {
      state.bag = [];
      state.bagSelected = null;
      state.cost = 0;
      state.left = null;
      state.right = null;
      state.over10p = 0.01;
    },
  },
  actions: {
    setDB({ commit }, db) {
      commit("SET_DB", db);
    },
    set({ commit }, kv) {
      commit("SET", kv);
    },
    addEquipToBag({ commit }, equip) {
      commit("ADDEQUIPTOBAG", equip);
    },
    deleteEquip({ commit }) {
      commit("DELETEEQUIP");
    },
    transferEq({ commit }, equip) {
      commit("TRANSFEREQ", equip);
    },
    eatEq({ commit }, equip) {
      commit("EATEQ", equip);
    },
    addCost({ commit }, cost) {
      commit("ADDCOST", cost);
    },
    rest({ commit }) {
      commit("REST");
    },
  },
  modules: {},
});
