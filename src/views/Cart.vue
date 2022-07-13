<template>
  <section>
    <h1
      class="d-flex justify-content-center align-items-center text-bg-secondary my-2 p-4"
    >
      Shopping cart
    </h1>
    <div
      class="d-flex justify-content-around align-items-center text-bg-secondary p-4"
    >
      <span class="fs-4 text-light">
        Total Price = تومان {{ cartTotalPrice }}</span
      >
      <button class="btn bg-success text-warning fs-5 btn-outline-warning">ثبت خرید</button>
    </div>
    <div class="container my-5">
      <div class="inner-container">
        <article
          class="card w-75 mx-auto d-flex flex-row gap-5 align-items-center"
          v-for="item in cart"
          :key="item.product"
        >
          <img class="w-25" :src="item.product.major_image.url" />
          <div class="d-flex flex-column gap-5">
            <h3 class="fs-4">{{ item.product.title }}</h3>
            <div class="d-flex align-items-center gap-3">
              <span class="d-flex align-items-center gap-2">
                <button
                  @click="addToCart()"
                  class="btn bg-secondary text-light fs-4"
                >
                  +
                </button>
                <span class="fs-5">{{ item.quantity }}</span>
                <button
                  :class="{ disabledButton: item.quantity == 1 }"
                  @click.prevent="removeProductFromCart(item.product)"
                  class="btn bg-secondary text-light fs-4"
                >
                  -
                </button>
              </span>
              <span class="fs-3">×</span>
              <span class="fs-3"> {{ item.product.price }}</span>
            </div>
            <button
              @click.prevent="removeProductFromCartTotally(item.product)"
              class="btn bg-danger fs-5 text-light"
            >
              حذف از سبد خرید
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();

    let cart = computed(() => {
      return store.state.cart;
    });
    let cartTotalPrice = computed(() => {
      return store.getters.cartTotalPrice;
    });
    let product = computed(() => {
      return store.getters.getProduct;
    });
    function removeProductFromCart(product) {
      store.dispatch("removeProductFromCart", product);
    }
    function removeProductFromCartTotally(product) {
      store.dispatch("removeProductFromCartTotally", product);
    }
    function addToCart() {
      store.dispatch("addProductToCart", {
        product: product.value,
        quantity: 1,
      });
    }
    return {
      cart,
      cartTotalPrice,
      removeProductFromCart,
      removeProductFromCartTotally,
      addToCart,
      product,
    };
  },
};
</script>

<style>
.inner-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
  gap: 10px;
}
.disabledButton {
  opacity: 0.7;
  pointer-events: none;
}
</style>
