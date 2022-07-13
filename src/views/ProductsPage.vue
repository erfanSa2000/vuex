<template>
  <div id="container" class="container d-flex mx-auto my-0">
    <div class="row col-10 py-5">
      <div class="d-flex align-items-center gap-3">
        <button
          class="btn bg-secondary fs-5 text-light"
          @click="sortFilter('top_sales')"
        >
          پرفروش ترین
        </button>
        <button
          class="btn bg-secondary fs-5 text-light"
          @click="sortFilter('low_to_high')"
        >
          ارزان ترین
        </button>
        <button
          class="btn bg-secondary fs-5 text-light"
          @click="sortFilter('newest')"
        >
          جدیدترین
        </button>
      </div>
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
      <div class="card">
        <article class="card-group-item">
          <header class="card-header">
            <h6 class="title">Brands</h6>
          </header>
          <div class="filter-content">
            <div class="d-flex flex-column">
              <button @click="catFilter('2')" class="btn my-1">زنانه</button>
              <button @click="catFilter('4')" class="btn my-1">اکسسوری</button>
              <button @click="catFilter('21')" class="btn my-1">
                شال و روسری
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <loader v-if="loaderFlag" />
  </div>
</template>

<script>
import Products from "../components/Products.vue";
import Paginate from "vuejs-paginate-next";
import loader from "../components/shared/loader.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
let self;
export default {
  components: { Products, Paginate, loader },
  created() {
    self = this;
  },
  setup() {
    const store = useStore();
    let title = ref("");
    // let newestval = ref("newest");
    // let top_sales_val = ref("top_sales");
    // let low_to_high_val = ref("low_to_high");
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
    // filter categories
    function catFilter(newVal) {
      store.commit("setProductFlag", false);
      store.commit("set_category_filter", newVal);
      store.dispatch("fetchTitle");
      loaderFlag.value = true;
    }

    //filter buttons function
    function sortFilter(val) {
      store.commit("setProductFlag", false);
      store.commit("setSortName", val);
      store.dispatch("fetchTitle");
      loaderFlag.value = true;
    }
    // function newest() {
    //   store.commit("setProductFlag", false);
    //   store.commit("setSortName", newestval.value);
    //   store.dispatch("fetchTitle");
    //   loaderFlag.value = true;
    // }
    // function low_to_high() {
    //   store.commit("setProductFlag", false);
    //   store.commit("setSortName", low_to_high_val.value);
    //   store.dispatch("fetchTitle");
    //   loaderFlag.value = true;
    // }

    // function top_sales() {
    //   store.commit("setProductFlag", false);
    //   store.commit("setSortName", top_sales_val.value);
    //   store.dispatch("fetchTitle");
    //   loaderFlag.value = true;
    // }

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
      sortFilter,
      catFilter,
      // newest,
      // newestval,
      // top_sales_val,
      // top_sales,
      // low_to_high,
      // low_to_high_val,
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
