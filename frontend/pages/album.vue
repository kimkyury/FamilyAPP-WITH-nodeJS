<template>
  <div>
    <v-spacer></v-spacer>
    <v-container>
      <v-form @submit.prevent="onSearchHashtag">
        <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
          <v-text-field
            v-model="hashtag"
            label="해시태그검색"
            hide-details
            prepend-icon="mdi-magnify"
          />
        </div>
      </v-form>
    </v-container>
    <v-container>
      <post-dialog />
      <br /><br /><br /><br />
    </v-container>
    <v-container style="text-align: center">
      <post-folder v-for="f in folders" :key="f.id" :folder="f"></post-folder>
    </v-container>
  </div>
</template>

<script>
import PostDialog from "~/components/PostDialog";
import PostFolder from "~/components/PostFolder";

export default {
  components: {
    PostDialog,
    PostFolder,
  },
  data() {
    return {
      hashtag: "",
    };
  },
  fetch({ store, params }) {
    store.dispatch("posts/loadFolders");
    return store.dispatch("posts/loadPosts");
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    folders() {
      return this.$store.state.posts.folders;
    },
  },

  methods: {
    onSearchHashtag() {
      this.$router.push({
        path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
      });
      this.hashtag = "";
    },
  },
  head() {
    return {
      title: "With",
    };
  },
};
</script>

<style>
</style>