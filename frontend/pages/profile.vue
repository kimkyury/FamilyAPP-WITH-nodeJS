<!-- 필요 X -->
<template>
  <div>
    <v-btn @click="onLogoutForm">로그아웃</v-btn>
  </div>
</template>

<script>
export default {
  components: {},
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
  },
  middleware: "authenticated",
};
</script>

<style>
</style>