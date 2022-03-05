<template>
  <v-app>
    <template v-if="me">
      <v-card text elevation="0">
        <v-toolbar class="accent-2 rounded-lg" elevation="5" color="white">
          <v-toolbar-title>
            <nuxt-link to="/"
              ><img src="../img/with_logo2.png" width="90"
            /></nuxt-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <img src="../img/logout_btn.png" width="40" v-on:click="onLogoutForm" />
        </v-toolbar>
      </v-card>
      <v-main>
        <nuxt />
      </v-main>
      <v-footer v-bind="localAttrs" :padless="padless" class="ma-0 pa-0" elevation="5">
        <v-card
          text
          width="100%"
          class="text-center pt-2 accent-2 rounded-lg"
          color="white"
        >
          <v-card-text>
            <v-row justify="space-around">
              <div v-for="x in menu" :key="x[0]">
                <nuxt-link :to="`/${x[1]}`">
                  <img :src="require(`../img/${x[0]}.png`)" width="40"/>
                </nuxt-link>
              </div>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-footer>
    </template>
    <template v-else>
      <v-row align="center">
        <v-container fluid style="margin: 0px; padding: 0px; width: 100%">
          <div align="center" justify="center">
          <img src="../img/with_logo.png" width="300"><br /><br />
          </div>
          <v-sheet class="overflow-hidden pt-8" color="#FFFCEF" elevation="0" height="240" width="100%">
          <login-form /><br /><br />
          <signup-form />
          </v-sheet>
        </v-container>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";
import SignupForm from "~/components/SignupForm";
export default {
  components: { LoginForm, SignupForm },
  data() {
    return {
      menu: [
        ["album", "album"],
        ["chatting", "message"],
        ["calender", "calendar"],
      ],
      isLoginForm: false,
      isLoggin: false,
      padless: false,
      variant: "default",
      model: 0,
      items: ["main1", "main3", "main4"],
    };
  },
  methods: {
    async onLogoutForm() {
      try {
        const result = await this.$store.dispatch("users/logOut");
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    },
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>

<style>
a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}
</style>