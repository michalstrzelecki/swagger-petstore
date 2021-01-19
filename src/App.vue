<template>
  <v-app>
    <v-main>
      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >
        <v-select
            v-model="selectedPetStatus"
            :items="petStatus"
            hint="Change pet availability"
            solo
            return-object
            persistent-hint
            @change="onPetStatusChange"
        ></v-select>
      </v-col>
      <CardList :items="pets" />
    </v-main>
  </v-app>
</template>

<script>
import CardList from "@/components/CardList";

import findPetsByStatus from "@/api/findPetsByStatus";

export default {
  name: 'App',

  components: {
    CardList
  },

  data: () => ({
    selectedPetStatus: {
      text: 'Available',
      value: 'available'
    },
    petStatus: [
      {
        text: 'Available',
        value: 'available'
      },
      {
        text: 'Pending',
        value: 'pending'
      },
      {
        text: 'Sold',
        value: 'sold'
      }
    ],
    pets: []
  }),

  beforeMount() {
    this.getPets()
  },

  methods: {
    async getPets() {
      const { data } = await findPetsByStatus(this.selectedPetStatus.value)
      console.log(data[0])
      this.pets = data
    },
    onPetStatusChange() {
      this.getPets()
    }
  }
};
</script>
