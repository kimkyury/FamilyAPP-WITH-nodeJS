<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <img
          src="../img/special_day_btn.png"
          width="200"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-card style="overflow-x: hidden">
        <v-toolbar color="#DAFF8C" class="accent-2">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>기념일</v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader class="pt-3">생일</v-subheader>
          <v-list-item v-for="(b, i) in birth" :key="b.id">
            <v-list-item-content class="pl-3" style="font-weight: 700">
              {{ b.category
              }}{{
                b.category == "아들" || b.category == "딸"
                  ? `(${b.nickname})`
                  : ""
              }}
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content class="pl-3">
              <v-list-item-title>{{
                dateText[i] == 0 ? "D-DAY" : `${dateText[i]}일 남음`
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ b.birth }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader class="pt-3">가족기념일</v-subheader>
          <special-item v-for="(s, i) in special" :key="i" :special="s" />
          <br />
          <special-dialog></special-dialog>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SpecialDialog from "../components/SpecialDialog.vue";
import SpecialItem from "../components/SpecialItem.vue";
export default {
  components: {
    SpecialDialog,
    SpecialItem,
  },
  data() {
    return {
      dialog: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    birth() {
      return this.$store.state.users.families;
    },
    dateText() {
      const temp = this.birth.map((x) => x.birth.split("-"));
      const year = new Date().getFullYear();
      const date = temp.map((x) => {
        const now = new Date();
        let event = new Date(year, x[1] - 1, x[2] - 1);
        if (event.getTime() > now.getTime()) {
          return Math.floor(
            ((now.getTime() - event.getTime()) / (1000 * 60 * 60 * 24)) * -1 + 2
          );
        } else {
          event = new Date(year + 1, x[1] - 1, x[2] - 1);
          return Math.floor(
            ((now.getTime() - event.getTime()) / (1000 * 60 * 60 * 24)) * -1 + 2
          );
        }
      });
      return date;
    },
    special() {
      const temp = this.$store.state.specials.mainSpecials.filter(
        (x) => x[0] + 2 >= 0
      );
      const len = temp.length;
      temp.sort((a, b) => a[0] - b[0]);
      if (len == 0) return [];
      else if (len == 1) return [temp[0]];
      else if (len == 2) return [temp[0], temp[1]];
      return [temp[0], temp[1], temp[2]];
    },
  },
};
</script>