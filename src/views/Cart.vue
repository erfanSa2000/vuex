<template>
  <section>
    <h1
      class="d-flex justify-content-center align-items-center text-bg-secondary my-2 p-4"
    >
      Shopping cart
    </h1>
    <div
      class="d-flex justify-content-center align-items-center fs-4 text-bg-secondary p-4"
    >
      Total Price = تومان {{ cartTotalPrice }}
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
            <span class="fs-3"
              >{{ item.quantity }} × {{ item.product.price }}</span
            >
            <button
              @click.prevent="removeProductFromCart(item.product)"
              class="btn bg-danger fs-5 text-light"
            >
              حذف
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
export default {
  setup() {
    const store = useStore();
    let cart = computed(() => {
      return store.state.cart;
    });
    let cartTotalPrice = computed(() => {
      return store.getters.cartTotalPrice;
    });

    function removeProductFromCart(product) {
      store.dispatch("removeProductFromCart", product);
    }
    return { cart, cartTotalPrice,removeProductFromCart };
  },
};
</script>

<style>
.inner-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
  gap: 10px;
}
</style>
