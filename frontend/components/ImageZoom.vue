<template>
  <div id="image-zoom">
    <header>
      <v-icon id="close-btn" @click="closeModal">mdi-close</v-icon>
    </header>
    <div id="carousel-wrapper">
      <v-container>
        <v-img
          height="500px"
          contain
          :src="`http://localhost:3085/${images}`"
        />
      </v-container>
    </div>
    <footer>
      <v-card-subtitle
        >좋아요: {{ (post.Likers && post.Likers.length) || 0 }}</v-card-subtitle
      >
      <v-card-actions>
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{ heartIcon }}</v-icon>
        </v-btn>
        <folder-replace
          v-if="dialog"
          :dialog="true"
          :postId="post.id"
          @onCloseDialog="onCloseDialog"
        ></folder-replace>
      </v-card-actions>
      <v-container>
        <template v-if="commentOpened">
          <comment-form id="comment-form" :post-id="post.id" />
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
    </footer>
  </div>
</template>

<script>
import CommentForm from "./CommentForm.vue";
import FolderReplace from "./FolderReplace.vue";
export default {
  components: { CommentForm, FolderReplace },
  props: {
    images: {
      type: String,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  },
};
</script>

<style scoped>
#image-zoom {
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#image-zoom header {
  height: 200px;
  background: #090909;
  position: relative;
  padding: 0;
  text-align: center;
}
#close-btn {
  color: gray;
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
}
#carousel-wrapper {
  height: 50%;
  background: #090909;
}
#carousel-wrapper > div {
  height: auto !important;
}
#image-zoom footer {
  height: 400px;
  background: #090909;
  position: relative;
  padding: 0;
  text-align: center;
}
#comment-form {
  background: white;
}
</style>