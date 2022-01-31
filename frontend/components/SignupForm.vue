<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <img
          src="../img/sign_up_btn.png"
          width="200"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-card-title>
            <span class="text-h5">회원가입</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="이메일*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="비밀번호*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="passwordCheck"
                    :rules="passwordCheckRules"
                    label="비밀번호확인*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="nickname" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="category"
                    :rules="categoryRules"
                    :items="['엄마', '아빠', '딸', '아들']"
                    label="가족관계*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="year"
                    :rules="yearRules"
                    :items="yearItem"
                    label="년도*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="month"
                    :rules="monthRules"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                    label="월*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="day"
                    :rules="dayRules"
                    :items="dayItem"
                    label="일*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              type="submit"
              :disabled="!valid"
              text
              @click="dialog = false"
            >
              Signup
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      passwordCheck: "",
      category: "",
      dialog: false,
      yearItem: [],
      dayItem: [],
      year: "",
      month: "",
      day: "",
      valid: false,
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다.",
      ],
      categoryRules: [(v) => !!v || "가족관계 선택는 필수입니다."],
      yearRules: [(v) => !!v || "년도 선택는 필수입니다."],
      monthRules: [(v) => !!v || "월 선택는 필수입니다."],
      dayRules: [(v) => !!v || "일 선택는 필수입니다."],
    };
  },
  watch: {
    year: function (val) {
      this.setStartDate();
    },
    month: function (val) {
      this.setStartDate();
    },
  },
  created() {
    const birth = new Date();
    for (let i = 1900; i <= birth.getFullYear(); i++) this.yearItem.push(i);
  },
  methods: {
    async onSubmitForm() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$store.dispatch("users/signUp", {
            email: this.email,
            password: this.password,
            category: this.category,
            color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
            nickname: this.nickname,
            birth: `${this.year}-${this.month}-${this.day}`,
          });
          await this.$store.dispatch("users/loadFamilies");
          this.$router.push("/");
        } catch (err) {
          console.error(err);
        }
      }
    },
    setStartDate() {
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
  },
};
</script>

<style>
</style>