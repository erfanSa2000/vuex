<template>
  <article class="card my-2 mx-2 py-2 text-center">
    <img
      :src="products.major_image.conversions.md"
      class=" card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">{{ products.title }}</h5>
      <span class="card-subtitle">تومان{{ products.price }}</span>
      <p class="card-text"></p>
      <router-link
        :to="`/product/${products.id}/${products.slug}`"
        class="btn btn-primary"
        >See More
      </router-link>
    </div>
  </article>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    products: Object,
  },
  setup(props) {},
};
</script>

<style scoped>
.card {
  width: 18rem;
}
</style>
