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
    cartItem: [],
    //cart
    // cart: [],
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

    setCartProduct(state, item) {
      state.cartItem = item;
    },
    // add to cart
    // addToCart(state, product) {
    //   let item = state.cart.find((i) => i.id === product.id);

    //   if (item) {
    //     item.quantity++;
    //   } else {
    //     state.cart.push({ ...product, quantity: 1 });
    //   }
    // },
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

    //addToCart
    async addToCart({ commit, state }) {
      await Axios.post("cart", state.product).then((res) => {
        commit("setProduct", res.data.data.products);
      });
    },

    // get product from cart

    async fetchProductFromCard({ commit }) {
      await Axios.get("cart").then((res) => {
        commit("setCartProduct", res.data.data.product);
      });
    },
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
    getCartProducct(state) {
      return state.cartItem;
    },
    //add to cart
    // productQuantity: (state) => (product) => {
    //   const item = state.cart.find((i) => i.id === product.id);

    //   if (item) return item.quantity;
    //   else return null;
    // },
  },
});
