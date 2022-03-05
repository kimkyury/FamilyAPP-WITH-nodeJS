<template>
  <!-- Conatiner -->
  <div
    align="center"
    justify="center"
    class="py-3"
    content-class = "box"
    style="margin: auto; margin-top: 3%"
  >
  <div
    align = "center"
    class="box"
  >
    <v-img
      :src="`http://127.0.0.1:3085/${path.src}`"
      contain
      content-class = "shape"
      aspect-ratio="1"
      width="300"
    />
    </div>
    <input ref="imageInput" type="file" hidden @change="onChangeImage" /><br />
    <img src="../img/image_plus.png" width="56" v-on:click="onClickImageUpload" /><br /><br /><br />
    <special-day></special-day><br /><br />
  </div>
</template>

<script>
import SpecialDay from "../components/SpecialDay";
import MainImage from "../components/MainImage.vue";
import PostImages from "../components/PostImages.vue";
export default {
  components: {
    SpecialDay,
    MainImage,
    PostImages,
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
.box{

  border: 10px solid transparent;
  border-radius: 150px;
  background-image: 
    linear-gradient(#444444, #444444), 
    linear-gradient(to right, #d9da8cbe, #ffcdf3aa, #96d8a4aa);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-bottom: 10px;
  
  width: 350px;
  height: 300px;

  overflow:hidden;
}
.shape{
  width: 100%;
  height: 100%;
}
</style>
