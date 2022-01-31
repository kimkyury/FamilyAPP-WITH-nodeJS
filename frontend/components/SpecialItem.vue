<template>
  <v-list three-line subheader>
    <v-list-item>
      <v-list-item-content class="pl-3" style="font-weight: 700">
        {{ category }}{{ name }}
        {{ content }}
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-list-item-content>
        <v-list-item-title>{{
          dateText != 0 ? `${dateText}일 남음` : "D-Day"
        }}</v-list-item-title>
        <v-list-item-subtitle>{{
          (special && special[1].date.split("T")[0]) || ""
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    special: {
      type: Array,
      required: true,
    },
  },
  computed: {
    dateText() {
      if (!this.special) return 0;
      let temp = this.special[1].date.split("-");
      temp[2] = temp[2].split("T")[0];
      const now = new Date();
      const event = new Date(temp[0], temp[1] - 1, temp[2]);
      const ans = Math.floor(
        ((now.getTime() - event.getTime()) / (1000 * 60 * 60 * 24)) * -1 + 1
      );
      return this.special && ans;
    },
    content() {
      return (this.special && this.special[1].content) || "";
    },
    category() {
      return (this.special && this.special[1].User.category) || "";
    },
    name() {
      if (
        this.special &&
        (this.special[1].User.category == "아들" ||
          this.special[1].User.category == "딸")
      ) {
        return `(${this.special[1].User.nickname})`;
      } else return "";
    },
  },
  monuted() {},
  methods: {},
};
</script>

<style>
</style>