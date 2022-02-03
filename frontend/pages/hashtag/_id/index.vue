<template>
  <v-container>
    <div>
      <v-container v-if="hashtagPosts">
        <post-card v-for="p in hashtagPosts" :key="p.id" :post="p" />
      </v-container>
      <v-container v-else>xx</v-container>
    </div>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard";
export default {
  components: {
    PostCard,
  },
  fetch({ store, params }) {
    return store.dispatch("posts/loadHashtagPosts", {
      hashtag: encodeURIComponent(params.id),
    });
  },
  computed: {
    hashtagPosts() {
      return this.$store.state.posts.mainPosts;
    },
  },
};
</script>

<style>
</style>