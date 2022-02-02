<template>
  <div>
    <v-img :src="`http://localhost:3085/${image}`" contain aspect-ratio="2" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

