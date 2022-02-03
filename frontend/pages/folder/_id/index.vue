<template>
  <v-container v-if="post">
    <post-card v-for="p in post" :key="p.id" :post="p" />
  </v-container>
  <div v-else>해당 아이디의 게시글이 존재하지 않습니다.</div>
</template>

<script>
import PostCard from "~/components/PostCard";
export default {
  components: {
    PostCard,
  },
  computed: {
    post() {
      const data = this.$store.state.posts.mainPosts.filter(
        (v) => v.FolderId === parseInt(this.$route.params.id, 10)
      );
      if (data.length === 0) {
        this.$store
          .dispatch("posts/removeFolder", {
            folderId: this.$route.params.id,
          })
          .then(() => {
            this.$router.push({
              path: `/album`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return data;
    },
  },
};
</script>

<style>
</style>