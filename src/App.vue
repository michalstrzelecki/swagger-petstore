<template>
  <v-app>
    <v-main>
      <CardList :items="pets" />
    </v-main>
  </v-app>
</template>

<script>
import CardList from "@/components/CardList";

import getPets from "@/api/findPetsByStatus";

export default {
  name: 'App',

  components: {
    CardList
  },

  data: () => ({
    pets: []
  }),

  async beforeMount() {
    const { data } = await getPets()
    console.log(data[0])
    this.pets = data
  },
};
</script>
