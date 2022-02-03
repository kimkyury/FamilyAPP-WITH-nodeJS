<template>
  <v-form
    ref="form"
    v-model="valid"
    style="position: relative"
    @submit.prevent="onSubmitForm"
  >
    <v-textarea
      v-model="content"
      filled
      auto-grow
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessages"
      @input="onChangeTextarea"
    />
    <v-btn color="#11D600" dark absolute top right type="submit">작성</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      content: "",
      success: false,
      successMessages: "",
      hideDetails: true,
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onChangeTextarea(value) {
      console.log("선택");
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    async onSubmitForm() {
      try {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch("posts/addComment", {
            id: Date.now(),
            postId: this.postId,
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
          });
          this.content = "";
          this.success = true;
          this.successMessages = "댓글이 작성되었습니다.";
          this.hideDetails = false;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
</style>