import { createStore } from "vuex";
import axios from "axios";
const Axios = axios.create({
  baseURL: "https://api.elinorboutique.com/v1/",
});

export default createStore({
  state: {
    //products state
    products: null,
    // product detail state
    product: null,
    // title state
    title: null,
    productFlag: false,
  },
  mutations: {
    setProducts(state, list) {
      state.products = list;
    },

    setProduct(state, value) {
      state.product = value;
    },

    setTitle(state, val) {
      state.title = val;
    },
    setProductFlag(state, Boolean) {
      state.productFlag = Boolean;
    },
  },
  actions: {
    //get products list from server
    async fetchProductsFromServer({ commit }, filter) {
      await Axios.get(
        `front/products?page=${filter.page}${
          filter.search != "" ? "&keyword=" + filter.search : ""
        }`
      ).then((res) => {
        commit("setProducts", res.data.data.products);
        commit("setProductFlag", true);
      });
    },

    // get product detail from server
    async fetchProductFromServer({ commit }, id) {
      await Axios.get("front/products/" + id).then((res) => {
        commit("setProduct", res.data.data.product);
      });
    },

    // get products to search betweeen them
    async fetchTitle({ commit, state }) {
      await Axios.get(
        `front/products?sort=${
          state.top_sales != "" ? "&sort" + state.top_sales : ""
        }${state.title != "" ? "&title=" + state.title : ""}`
      ).then((res) => {
        commit("setProducts", res.data.data.products);
        commit("setProductFlag", true);
      });
    },

    // saeed style
    //     async callApiForProducts({ commit, state }) {
    //       const { data } = await axios.get(
    //         `https://api.elinorboutique.com/v1/front/products?${
    //           state.title ? "&title=" + state.title : ""
    //         }"&page=1"
    // `
    //       );
    //       commit("setProducts", data.data.products.data);
    //     },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProduct(state) {
      return state.product;
    },
    getTitle(state) {
      return state.title;
    },
    getProductFlag(state) {
      return state.productFlag;
    },
  },
});
