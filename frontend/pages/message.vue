<template>
  <div>
    <v-card
      v-for="(message, i) in messages"
      :key="i"
      class="px-1 py-5"
      :class="[
        message.User && message.User.id === me.id
          ? 'd-flex flex-row-reverse text-right'
          : 'd-flex',
      ]"
      tile
      text
    >
      <v-text
        class="text-h5 mx-3 px-1"
        style="line-height: 50px; vertical-align: middle"
        >{{ (message.User && message.User.category) || "" }}
        {{
          message.User.category == "아들" || message.User.category == "딸"
            ? `(${message.User.nickname})`
            : ""
        }}
      </v-text>
      <v-card
        :class="[
          message.User && message.User.id === me.id
            ? style='background-color: #C8FF54; border-radius: 10px / 10px;'
            : style='background-color: #DAFF8C; border-radius: 10px / 10px;',
        ]"
        max-width="344"
        :style='style'
      >
        <v-container>
          {{ message.message }}
        </v-container>
      </v-card>
    </v-card>

    <v-container fluid style="margin: 0px; padding: 0px; width: 100%">
      <form @submit.prevent="submit" align="center" justify="center">
        <input
          class="form-control"
          placeholder="가족에게 메시지를 보내세요 💌"
          v-model="message"
          style="
            width: 90%;
            height: 40px;
            padding: 5px;
            border: solid #C8FF54;
            border-radius: 10px / 10px;
            outline: none;
          "
        />
      </form>
    </v-container>
  </div>
</template>

<script>
import Pusher from "pusher-js";
export default {
  data() {
    return {
      username: "userdname",
      message: "",
      // messages: [],
    };
  },
  fetch({ store }) {
    return store.dispatch("chat/loadChats");
  },
  mounted() {
    Pusher.logToConsole = true;

    const pusher = new Pusher("cbcc2529e3c4bed987f0", {
      cluster: "ap3",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      this.$store.commit("chat/add", data);
    });
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch("chat/add", {
          userId: this.me.id,
          message: this.message,
        });
        this.message = "";
      } catch (err) {
        console.error(err);
      }
    },
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    },
    me() {
      return this.$store.state.users.me;
    },
  },
};
</script>

<style>
</style>