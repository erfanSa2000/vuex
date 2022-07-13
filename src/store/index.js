import { createStore } from "vuex";
import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
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
    title: "",

    sortName: "",

    productFlag: false,

    //cart
    cart: [],

    categoryFilter: '',
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

    ADD_TO_CART(state, { product, quantity }) {
      state.cart.push({
        product,
        quantity,
      });
    },

    REMOVE_ALL_FROM_CART(state, product) {
      state.cart = state.cart.filter((item) => {
        return item.product.id !== product.id;
      });
    },
    DECREASE_QUANTITY(state, product) {
      state.cart = state.cart.filter((item) => {
        if (item.quantity > 1) {
          return item.quantity--;
        } else {
          return item.product.id !== product.id;
        }
      });
    },
    setSortName(state, val) {
      state.sortName = val;
    },
    set_category_filter(state, val) {
      state.categoryFilter = val;
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
        `front/products?${
          state.sortName != "" ? "sort=" + state.sortName : ""
        }${
          state.categoryFilter != ""
            ? "&category_id=" + state.categoryFilter
            : "2"
        }
        ${state.title != "" ? "&title=" + state.title : ""}
        `
      ).then((res) => {
        commit("setProducts", res.data.data.products);
        commit("setProductFlag", true);
      });
    },

    //add to cart
    addProductToCart({ commit, state }, { product, quantity }) {
      // this lines said => if we have a product in cart dont add another new , instead increase the quantity

      let productInCart = state.cart.find((item) => {
        return item.product.id === product.id;
      });
      if (productInCart) {
        productInCart.quantity += quantity;
        return;
      }

      commit("ADD_TO_CART", { product, quantity });
    },

    // remove product from cart
    removeProductFromCartTotally({ commit }, product) {
      commit("REMOVE_ALL_FROM_CART", product);
    },
    removeProductFromCart({ commit }, product) {
      commit("DECREASE_QUANTITY", product);
    },

    addToCookies({ commit, state }) {
      commit("setCookies", state.cart);
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
    getSortName(state) {
      return state.sortName;
    },
    // show how many item are in the cart now
    cartItemCount(state) {
      // return state.cart.length;
      let current = 0;
      state.cart.forEach((item) => {
        current += item.quantity;
      });
      return current;
    },

    // calculate Total Price
    cartTotalPrice(state) {
      let total = 0;

      state.cart.forEach((item) => {
        total += item.product.price * item.quantity;
      });

      return total;
    },

    getCategoryFilter(state) {
      return state.categoryFilter;
    },

  },
});
