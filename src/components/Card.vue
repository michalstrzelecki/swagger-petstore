<template>
  <v-card>
    <v-card-text>
      <div class="text-overline text-center">{{ item.status }}</div>
    </v-card-text>

    <!-- There is a bug in the api which prevents from fetching the list of image urls -->
    <v-img
      :src="`https://loremflickr.com/640/480/animal?random=${item.id}`"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="item.name"></v-card-title>
    </v-img>

    <slot name="text"></slot>
    <slot name="actions"></slot>
  </v-card>
</template>

<script>
export default {
  name: "Card",

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.v-dialog > .v-card > .v-card__text {
  padding: 24px 20px;
}
</style>
