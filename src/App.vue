<template>
  <main-header/>
  <router-view></router-view>
</template>

<script>
import MainHeader from './components/shared/MainHeader.vue'
export default {
  components: { MainHeader },

}
</script>

<style>

</style>