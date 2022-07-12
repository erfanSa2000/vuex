<template>
  <section>
    <article class="card" v-for="item in cart" :key="item.id">
      <figure>
        <img :src="item.major_image.conversions.md" />
      </figure>
      <h2>{{ item.title }}</h2>
      <span>{{ item.price }}</span>
    </article>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
