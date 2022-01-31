<template>
  <div>
    <v-row justify="center" class="ma-5">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <img
            src="../img/schedule_btn.png"
            width="160"
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">일정 등록</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="내용"
                    v-model="name"
                    required
                  ></v-text-field>
                </v-col>
                <v-container>
                  <small>시작</small>
                </v-container>
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
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="start.hour"
                    :items="start.hourItem"
                    label="시"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="start.minute"
                    :items="start.minItem"
                    label="분"
                    required
                  ></v-select>
                </v-col>
                <v-container>
                  <small>종료</small>
                </v-container>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="end.year"
                    :items="end.yearItem"
                    label="년도"
                    input=""
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="end.month"
                    :items="end.monthItem"
                    label="월"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="end.day"
                    :items="end.dayItem"
                    label="일"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="end.hour"
                    :items="end.hourItem"
                    label="시"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="end.minute"
                    :items="end.minItem"
                    label="분"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>가족에게 일정을 알리세요!</small>
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
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Boolean,
    },
  },
  data: () => ({
    name: "",
    id: 0,
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
      hourItem: [],
      minItem: [],
    },
    end: {
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      yearItem: [],
      monthItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayItem: [],
      hourItem: [],
      minItem: [],
    },
    events: [],
  }),
  created() {
    let curYear = parseInt(String(new Date()).split(" ")[3], 10);
    for (let i = curYear; i <= curYear + 10; i++) this.start.yearItem.push(i);
    for (let i = curYear; i <= curYear + 10; i++) this.end.yearItem.push(i);
    for (let i = 0; i <= 23; i++) {
      this.start.hourItem.push(i);
      this.end.hourItem.push(i);
    }
    for (let i = 0; i <= 59; i++) {
      this.start.minItem.push(i);
      this.end.minItem.push(i);
    }
  },
  watch: {
    "start.year": function (val) {
      this.setStartDate();
    },
    "start.month": function (val) {
      this.setStartDate();
    },
    "end.month": function (val) {
      this.setEndDate();
    },
    "end.month": function (val) {
      this.setEndDate();
    },
    data: function (val) {
      this.dialog = true;
    },
  },
  methods: {
    async regist() {
      try {
        const start = new Date(
          this.start.year,
          parseInt(this.start.month) - 1,
          this.start.day + 1,
          parseInt(this.start.hour) - 15,
          this.start.minute,
          0
        )
          .toJSON()
          .split(".")[0];
        const end = new Date(
          this.end.year,
          parseInt(this.end.month) - 1,
          this.end.day + 1,
          parseInt(this.end.hour) - 15,
          this.end.minute,
          0
        )
          .toJSON()
          .split(".")[0];
        const result = await this.$store.dispatch("schedules/add", {
          name: this.name,
          start,
          end,
        });
        await this.$store.dispatch("schedules/loadSchedules");
      } catch (err) {
        console.error(err);
        return next(err);
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
    setEndDate() {
      this.end.dayItem = [];
      for (let i = 1; i <= 31; i++) {
        if (
          (this.end.month &&
            this.end.year &&
            this.end.month === 2 &&
            this.end.year % 4 === 0 &&
            i >= 30) ||
          (this.end.month &&
            this.end.year &&
            this.end.month === 2 &&
            this.end.year % 4 !== 0 &&
            i >= 29) ||
          ([4, 6, 9, 11].includes(this.end.month) && i >= 31)
        )
          break;
        this.end.dayItem.push(i);
      }
    },
  },
};
</script>

<style>
</style>