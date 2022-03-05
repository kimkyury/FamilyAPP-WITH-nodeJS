<template>
  <div>
    <v-img :src="`http://127.0.0.1:3085/${image}`" contain aspect-ratio="2" />
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

