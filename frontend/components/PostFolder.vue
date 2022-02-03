<template>
  <v-btn
    text
    color="white"
    elevation="0"
    width="160"
    class="mx-8"
    style="margin-bottom: 160px"
  >
    <nuxt-link :to="`/folder/${folder.id}`"
      ><img src="../img/folder_blue.png" width="160" /><br /><br />{{
        dateText
      }}</nuxt-link
    >
  </v-btn>
</template>

<script>
export default {
  props: {
    folder: {
      type: Object,
    },
  },
  computed: {
    dateText() {
      const temp = this.folder.date.split("T")[0].split("-");
      return `${temp[0]}년 ${temp[1]}월 ${temp[2]}일`;
    },
  },
};
</script>

<style>
</style>