<template>
  <!-- Conatiner -->
    <div
    align="center"
    justify="center"
    class="py-3"
    style="margin: auto; margin-top: 3%"
  >
      <input ref="imageInput" type="file" hidden @change="onChangeImage" />
    <v-btn
      fab
      elevation="0"
      color="#11D600"
      type="button"
      @click="onClickImageUpload"
      >
      
      <v-icon x-large color="white">mdi-plus</v-icon></v-btn
    >

    </div>

</template>

