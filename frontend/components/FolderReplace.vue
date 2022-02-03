<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">날짜 변경</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="year"
                  :items="yearItem"
                  label="년도"
                  input=""
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="month"
                  :items="monthItem"
                  label="월"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="day"
                  :items="dayItem"
                  label="일"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>변경할 날짜를 입력하세요</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="
              {
                $emit('onCloseDialog');
              }
            "
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              {
                $emit('onCloseDialog');
                onChangeFolder();
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
      year: "",
      month: "",
      day: "",
      yearItem: [],
      monthItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayItem: [],
    };
  },
  created() {
    let curYear = parseInt(String(new Date()).split(" ")[3], 10);
    for (let i = curYear - 10; i <= curYear + 10; i++) this.yearItem.push(i);
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
  },
  watch: {
    year: function (val) {
      this.setDate();
    },
    month: function (val) {
      this.setDate();
    },
  },
  methods: {
    setDate() {
      this.dayItem = [];
      for (let i = 1; i <= 31; i++) {
        if (
          (this.month &&
            this.year &&
            this.month === 2 &&
            this.year % 4 === 0 &&
            i >= 30) ||
          (this.month &&
            this.year &&
            this.month === 2 &&
            this.year % 4 !== 0 &&
            i >= 29) ||
          ([4, 6, 9, 11].includes(this.month) && i >= 31)
        )
          break;
        this.dayItem.push(i);
      }
    },
    async onChangeFolder() {
      try {
        await this.$store.dispatch("posts/changeFolder", {
          postId: this.postId,
          date: new Date(this.year, this.month - 1, this.day + 1)
            .toJSON()
            .split(".")[0],
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>