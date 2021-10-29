<template>
  <v-app>
    <v-card flat tile>
      <v-toolbar dense class="light-green accent-2">
        <v-toolbar-title>
          <nuxt-link to="/">With</nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <nuxt-link to="/">
            <v-icon color="white">mdi-account-outline</v-icon>
          </nuxt-link>
        </v-btn>
        <v-btn icon>
          <nuxt-link to="/">
            <v-icon color="white">mdi-account-outline</v-icon>
          </nuxt-link>
        </v-btn>
        <v-btn icon>
          <nuxt-link to="/">
            <v-icon color="white">mdi-account-outline</v-icon>
          </nuxt-link>
        </v-btn>
        <v-btn icon>
          <nuxt-link to="/">
            <v-icon color="white">mdi-account-outline</v-icon>
          </nuxt-link>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer v-bind="localAttrs" :padless="padless" class="ma-0 pa-0">
      <v-card flat tile width="100%" class="light-green accent-2 text-center">
        <v-card-text>
          <v-row justify="space-around">
            <v-btn class="ma-4" icon>
              <nuxt-link to="/">
                <v-icon size="48px" color="#EEEEEE"> mdi-home </v-icon>
              </nuxt-link>
            </v-btn>
            <v-btn class="ma-4" icon>
              <nuxt-link to="/">
                <v-icon size="48px" color="#EEEEEE"> mdi-email </v-icon>
              </nuxt-link>
            </v-btn>
            <v-btn class="ma-4" icon>
              <nuxt-link to="/calender">
                <v-icon size="48px" color="#EEEEEE"> mdi-calendar </v-icon>
              </nuxt-link>
            </v-btn>
            <v-btn class="ma-4" icon>
              <nuxt-link to="/">
                <v-icon size="48px" color="#EEEEEE"> mdi-delete </v-icon>
              </nuxt-link>
            </v-btn>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
      items: ["default", "absolute", "fixed"],
      padless: false,
      variant: "default",
    };
  },
  computed: {
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
  text-decoration: none;
}
</style>