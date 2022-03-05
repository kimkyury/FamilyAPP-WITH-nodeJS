<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          outlined
          auto-grow
          clearable
          v-model="content"
          label="해시태그"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          @input="onChangeText"
        />
        <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
        <input
          ref="imageInput"
          type="file"
          multiple
          hidden
          @change="onChangeImages"
        />
        <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
        <div>
          <div
            v-for="(p, i) in imagePaths"
            :key="p"
            style="display: inline-block"
          >
            <img
              :src="`http://127.0.0.1:3085/${p}`"
              :alt="p"
              style="width: 200px"
            />
            <div>
              <button @click="onemoveImage(i)" type="button">제거</button>
            </div>
          </div>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import PostImages from "./PostForm";
export default {
  components: {
    PostImages,
  },
  data() {
    return {
      hideDetails: true,
      successMessages: "",
      success: false,
      content: "",
      valid: false,
    };
  },
  computed: {
    ...mapState("users", ["me"]),
    ...mapState("posts", ["imagePaths"]),
  },
  methods: {
    onChangeText(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    async onSubmitForm() {
      try {
        await this.$store.dispatch("posts/add", { content: this.content });
        this.content = "";
        this.hideDetails = false;
        this.success = true;
        this.successMessages = "게시글 등록 성공!";
      } catch (err) {
        console.error(err);
      }
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f); // {image: [file1, file2]}
      });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },
    onRemoveImage(index) {
      this.$store.commit("posts/removeImagePath", index);
    },
  },
};
</script>

<style>
</style>