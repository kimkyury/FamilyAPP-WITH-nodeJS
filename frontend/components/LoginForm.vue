<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <img
          src="../img/sign_in_btn.png"
          width="200"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-card-title>
            <span class="text-h5">👨‍👩‍👧‍👦 로그인을 해볼까요?</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-account"
                    v-model="email"
                    :rules="emailRules"
                    label="당신의 이메일을 적어주세요! *"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-eye-off-outline"
                    v-model="password"
                    label="비밀번호를 적어주세요!*"
                    :rules="passwordRules"
                    type="password"
                    required
                  ></v-text-field>
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
              Login
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
      valid: false,
      dialog: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
    };
  },
  methods: {
    async onSubmitForm() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$store.dispatch("users/logIn", {
            email: this.email,
            password: this.password,
          });
          this.$router.push("/");
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>

<style>
</style>