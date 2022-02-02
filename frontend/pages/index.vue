<template>
  <!-- Conatiner -->
    <div
      align="center"
      justify="center"
      class="py-3"
      style="margin: auto; margin-top: 3%"
    >
    <input ref="imageInput" type="file" hidden @change="onChangeImage" />
    <v-btn
      fab
      elevation="0"
      color="#11D600"
      type="button"
      @click="onClickImageUpload">
      <v-icon x-large color="white">mdi-plus</v-icon>
    </v-btn>
    </div>
</template>

<script>
import SpecialDay from "../components/SpecialDay";
import MainImage from "../components/MainImage.vue";
export default {
  components: {
    SpecialDay,
    MainImage,
  },
  fetch({ store }) {
    store.dispatch("specials/loadSpecials");
    store.dispatch("posts/loadMainImage");
    return store.dispatch("users/loadFamilies");
  },
  methods: {
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImage(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f); // {image: [file1, file2]}
      });
      this.$store.dispatch("posts/uploadMainImage", imageFormData);
    },
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    path() {
      return this.$store.state.posts.mainImage;
    },
  },
};
</script>

<style>
</style>
