<template>
  <v-app>
    <template v-if="me">
      <v-card text tile>
        <v-toolbar class="accent-2" elevation="0" color="#DAFF8C">
          <v-toolbar-title>
            <nuxt-link to="/"
              ><img src="../img/logo.png" width="90"
            /></nuxt-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn
            class="mx-1"
            small
            fab
            elevation="0"
            color="#11D600"
            @click="onLogoutForm"
          >
            <v-icon color="white">mdi-logout</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
      <v-main>
        <nuxt />
      </v-main>
      <v-footer v-bind="localAttrs" :padless="padless" class="ma-0 pa-0">
        <v-card
          text
          tile
          width="100%"
          class="accent-2 text-center"
          color="#DAFF8C"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-btn
                v-for="x in menu"
                :key="x[0]"
                class="ma-3"
                fab
                elevation="0"
                color="#11D600"
              >
                <nuxt-link :to="`/${x[1]}`">
                  <v-icon large color="white"> mdi-{{ x[0] }} </v-icon>
                </nuxt-link>
              </v-btn>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-footer>
    </template>
    <template v-else>
      <v-row align="center">
        <v-container>
          <login-form /><br /><br />
          <signup-form />
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
        ["image-album", "album"],
        ["message", "message"],
        ["calendar", "calendar"],
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