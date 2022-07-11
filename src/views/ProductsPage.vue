<template>
  <div id="container" class="container d-flex mx-auto my-0">
    <div class="row col-10 py-5">
      <div class="btn-group mx-auto my-3 d-table">
        <button
          @click="mostSalse()"
          class="btn btn-light btn-outline-secondary btn-lg"
        >
          most sales
        </button>
        <button
          @click="low_to_high()"
          class="btn btn-light btn-outline-secondary btn-lg"
        >
          most dicount
        </button>
        <button
          @click="high_to_low()"
          class="btn btn-light btn-outline-secondary btn-lg"
        >
          VIP
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
    let topSales = ref("");
    let highToLow = ref("");
    let lowToHigh = ref("");
    let productFlag = ref(null);
    let loaderFlag = ref(true);
    let filter = ref({ page: "", search: "" });
    onMounted(() => {
      if (self.products == null) {
        getProducts();
      }
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
    //filter buttons
    function mostSalse() {
      store.commit("setProductFlag", false);
      store.commit("setTitle", topSales.value);
      store.dispatch("fetchTitle");
      loaderFlag.value = true;
    }
    function low_to_high() {
      store.commit("setProductFlag", false);
      store.commit("setLowTohigh", lowToHigh.value);
      store.dispatch("fetchTitle");
      loaderFlag.value = true;
    }

    function high_to_low() {
      store.commit("setProductFlag", false);
      store.commit("setHighToLow", highToLow.value);
      store.dispatch("fetchTitle");
      loaderFlag.value = true;
    }

    //paagination callback function
    function clickCallback(pageNum) {
      self.$router.push(`/products?page=${pageNum}`).then(() => {
        document
          .getElementById("container")
          .scrollIntoView({ behavior: "smooth" });
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
      top_sales,
      mostSalse,
      high_to_low,
      low_to_high,
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
