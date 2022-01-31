<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#11D600" dark v-bind="attrs" v-on="on">
          기념일 추가
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">기념일</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="내용*"
                  v-model="content"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="start.year"
                  :items="start.yearItem"
                  label="년도"
                  input=""
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="start.month"
                  :items="start.monthItem"
                  label="월"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="start.day"
                  :items="start.dayItem"
                  label="일"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*기념일을 등록하세요!</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              {
                (dialog = false), regist();
              }
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      start: {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        yearItem: [],
        monthItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dayItem: [],
        content: "",
      },
    };
  },
  created() {
    this.content = "";
    let curYear = parseInt(String(new Date()).split(" ")[3], 10);
    for (let i = curYear; i <= curYear + 10; i++) this.start.yearItem.push(i);
  },
  watch: {
    "start.year": function (val) {
      this.setStartDate();
    },
    "start.month": function (val) {
      this.setStartDate();
    },
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    async regist() {
      try {
        await this.$store.dispatch("specials/add", {
          content: this.content,
          date: new Date(
            this.start.year,
            this.start.month - 1,
            this.start.day + 1,
            -15,
            0
          )
            .toJSON()
            .split(".")[0],
          id: this.me.id,
        });
        await this.$store.dispatch("specials/loadSpecials");
      } catch (err) {
        console.error(err);
      }
    },
    setStartDate() {
      this.start.dayItem = [];
      for (let i = 1; i <= 31; i++) {
        if (
          (this.start.month &&
            this.start.year &&
            this.start.month === 2 &&
            this.start.year % 4 === 0 &&
            i >= 30) ||
          (this.start.month &&
            this.start.year &&
            this.start.month === 2 &&
            this.start.year % 4 !== 0 &&
            i >= 29) ||
          ([4, 6, 9, 11].includes(this.start.month) && i >= 31)
        )
          break;
        this.start.dayItem.push(i);
      }
    },
  },
};
</script>