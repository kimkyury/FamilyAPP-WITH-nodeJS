<template>
  <div>
    <v-img
      :src="`http://127.0.0.1:3085/${images}`"
      contain
      aspect-ratio="2"
      @click="zoomImages"
    />
    <image-zoom
      v-if="imageZoomed"
      :closeModal="closeModal"
      :images="images"
      :post="post"
    ></image-zoom>
  </div>
</template>

<script>
import ImageZoom from "./ImageZoom";
export default {
  components: { ImageZoom },
  props: {
    images: {
      type: String,
      required: true,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageZoomed: false,
    };
  },
  methods: {
    closeModal() {
      this.imageZoomed = false;
    },
    zoomImages() {
      this.imageZoomed = true;
    },
  },
};
</script>

<style>
</style>
</script>

<style>
</style>