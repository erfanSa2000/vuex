<template>
  <div id="container" class="container d-flex mx-auto my-0">
    <div class="row col-10 py-5">
      <div class="row">
        <template v-if="productFlag">
          <products
            class="row"
            :products="item"
            v-for="(item, index) in products.data"
            :key="index"
          />
        </template>
      </div>
      <section v-if="productFlag">
        <paginate
          :page-count="products.last_page"
          :initial-page="products.current_page ?? 1"
          :page-range="3"
          :margin-pages="1"
          :click-handler="clickCallback"
          :prev-text="'<'"
          :next-text="'>'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        >
        </paginate>
      </section>
    </div>
    <div class="col-3 py-5 flex-fill d-none d-sm-block">
      <div class="d-flex my-3">
        <input
          class="me-2"
          v-model="title"
          type="search"
          placeholder="Search"
          @keypress.enter="searchtarget()"
        />
        <button @click="searchtarget()" class="btn bg-success">Search</button>
      </div>
      <side-filter />
    </div>
    <loader v-if="loaderFlag" />
  </div>
</template>

<script>
import Products from "../components/Products.vue";
import SideFilter from "../components/shared/SideFilter.vue";
import Paginate from "vuejs-paginate-next";
import loader from "../components/shared/loader.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
let self;
export default {
  components: { Products, SideFilter, Paginate, loader },
  created() {
    self = this;
  },
  setup() {
    const store = useStore();
    let title = ref("");
    let productFlag = ref(null);
    let loaderFlag = ref(true);
    let filter = ref({ page: "", search: "" });
    onMounted(() => {
      getProducts();
      watch(products, (newVal) => {
        if (newVal) {
          loaderFlag.value = false;
        }
      });
    });
    let products = computed(() => {
      return store.getters.getProducts;
    });
    productFlag = computed(() => {
      return store.getters.getProductFlag;
    });
    function getProducts() {
      store.commit("setProductFlag", false);
      store.dispatch("fetchProductsFromServer", getFilter());
    }
    function getFilter() {
      filter.value.page = self.$route.query.page ?? 1;
      filter.value.search = self.$route.query.search ?? "";
      return filter.value;
    }

    //search product function
    function searchtarget() {
      store.commit("setProductFlag", false);
      store.commit("setTitle", title.value);
      store.dispatch("fetchTitle");
      loaderFlag.value = true;
    }
    //paagination callback function
    function clickCallback(pageNum) {
      self.$router.push(`/?page=${pageNum}`).then(() => {
        document
          .getElementById("container")
          .scrollIntoView({ behavior: "smooth" });
        loaderFlag.value = true;
        getProducts();
      });
    }
    return {
      title,
      products,
      getProducts,
      getFilter,
      filter,
      clickCallback,
      searchtarget,
      loaderFlag,
      productFlag,
    };
  },
};
</script>

<style>
ul.pagination {
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
a.page-link {
  cursor: pointer;
}
</style>
