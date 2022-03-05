<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <img src="../img/photo_upload.png" width="56" v-bind="attrs" v-on="on" />
      </template>
      <v-card>
        <v-card-title
         class ="half_background_title">
          <span class="text-h5">🖼 추억 등록하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  outlined
                  auto-grow
                  clearable
                  v-model="content"
                  label="제목"
                  :hide-details="hideDetails"
                  @input="onChangeText"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-col>
          <input
            ref="imageInput"
            type="file"
            multiple
            hidden
            @change="onChangeImages"
          />
        <img src="../img/image_plus.png" width="56" @click="onClickImageUpload">  
          <br/><br/>
          <div>
            <div
              v-for="(p, i) in imagePaths"
              :key="p"
              style="display: inline-block"
            >
              <img
                :src="`http://127.0.0.1:3085/${p}`"
                :alt="p"
                style="width: 200px"
              />
              <div>
                <button @click="onRemoveImage(i)" type="button">제거</button>
              </div>
            </div>
          </div>
        </v-col>
        <v-container>
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
              prepend-icon = "mdi-calendar-blank"
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="
              {
                dialog = false;
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
                (dialog = false), onSubmitForm();
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
import { mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    hideDetails: true,
    successMessages: "",
    success: false,
    content: "",
    valid: false,
    year: "",
    month: "",
    day: "",
    yearItem: [],
    monthItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    dayItem: [],
  }),
  created() {
    let curYear = parseInt(String(new Date()).split(" ")[3], 10);
    for (let i = curYear - 10; i <= curYear + 10; i++) this.yearItem.push(i);
  },
  watch: {
    year: function (val) {
      this.setDate();
    },
    month: function (val) {
      this.setDate();
    },
  },
  computed: {
    ...mapState("users", ["me"]),
    ...mapState("posts", ["imagePaths"]),
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
    async clearImage() {
      await this.$store.dispatch("posts/clearImage");
    },
    onChangeText(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    async onSubmitForm() {
      try {
        await this.$store.dispatch("posts/add", {
          content: this.content,
          date: new Date(this.year, this.month - 1, this.day + 1)
            .toJSON()
            .split(".")[0],
        });
        this.content = "";
        this.hideDetails = false;
      } catch (err) {
        console.error(err);
      }
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f); // {image: [file1, file2]}
      });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },
    onRemoveImage(index) {
      this.$store.commit("posts/removeImagePath", index);
    },
  },
};
</script>
<style>
</style>