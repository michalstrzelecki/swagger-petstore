<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="2"
      >
        <Card :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from './Card'

export default {
  name: "CardList",

  components: {
    Card
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
