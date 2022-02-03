<template>
  <div style="margin-bottom: 20px">
    <post-images :images="post.Image.src" :post="post"></post-images>
    <v-card>
      <template v-for="(node, i) in nodes">
        <nuxt-link
          v-if="node.startsWith('#')"
          :key="i"
          :to="`/hashtag/${node.slice(1)}`"
          >{{ node }}</nuxt-link
        >
        <template v-else>{{ node }}</template>
      </template>
    </v-card>
    <v-card>
      <v-card-subtitle
        >좋아요: {{ (post.Likers && post.Likers.length) || 0 }}</v-card-subtitle
      >
      <v-card-actions>
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{ heartIcon }}</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn dark color="orange" @click="dialog = true">날짜변경</v-btn>
          </div>
        </v-menu>
        <folder-replace
          v-if="dialog"
          :dialog="true"
          :postId="post.id"
          @onCloseDialog="onCloseDialog"
        ></folder-replace>
      </v-card-actions>
    </v-card>
    <v-container>
      <template v-if="commentOpened">
        <comment-form :post-id="post.id" />
        <v-list>
          <v-list-item v-for="c in post.Comments" :key="c.id">
            <v-list-item-avatar color="teal">
              <span>{{ c.User.category[0] }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <h3>{{ c.User.category }}</h3>
              <div>{{ c.content }}</div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-container>
  </div>
</template>

<script>
import PostImages from "./PostImages";
import CommentForm from "./CommentForm.vue";
import FolderReplace from "./FolderReplace.vue";
export default {
  components: { PostImages, CommentForm, FolderReplace },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onCloseDialog() {
      this.dialog = false;
    },
    onRemovePost() {
      this.$store.dispatch("posts/remove", {
        postId: this.post.id,
      });
    },
    onEditPost() {
      this.$store.dispatch("posts/update", {
        postId: this.post.id,
      });
    },
    onToggleComment() {
      if (!this.commentOpened) {
        this.$store.dispatch("posts/loadComments", {
          postId: this.post.id,
        });
      }
      this.commentOpened = !this.commentOpened;
    },
    onClickHeart() {
      if (!this.me) {
        return alert("로그인이 필요합니다.");
      }
      if (this.liked) {
        return this.$store.dispatch("posts/unlikePost", {
          postId: this.post.id,
        });
      }
      return this.$store.dispatch("posts/likePost", {
        postId: this.post.id,
      });
    },
  },
  data() {
    return {
      commentOpened: false,
      dialog: false,
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    nodes() {
      return this.post.content.split(/(#[^\s#]+)/);
    },
    liked() {
      return (this.post.Likers || []).find(
        (v) => v.id == (this.me && this.me.id)
      );
    },
    heartIcon() {
      return this.liked ? "mdi-heart" : "mdi-heart-outline";
    },
    src() {},
  },
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>