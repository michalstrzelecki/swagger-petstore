<template>
  <v-app>
    <v-main>
      <template v-if="pets.length === 0">
        <v-progress-linear
          indeterminate
          color="green"
        />
      </template>
      <template v-else>
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
            data-test-id="select-pet"
          ></v-select>
        </v-col>
        <CardList :items="pets" />
      </template>

      <Snackbar
        :text="snackbarText"
        :display="isSnackbarDisplay"
        @onSnackbarInput="onSnackbarInput"
      />
    </v-main>
  </v-app>
</template>

<script>
import CardList from "@/components/CardList";
import Snackbar from '@/components/Snackbar'

import findPetsByStatus from "@/api/findPetsByStatus";

export default {
  name: 'App',

  components: {
    CardList,
    Snackbar
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
    pets: [],
    snackbarText: '',
    isSnackbarDisplay: false
  }),

  beforeMount() {
    this.getPets()
  },

  methods: {
    async getPets() {
      try {
        const { data } = await findPetsByStatus(this.selectedPetStatus.value)
        this.pets = data
        this.snackbarText = `Found ${this.pets.length} pets.`
      } catch (e) {
        this.text = e.message
      } finally {
        this.isSnackbarDisplay = true
      }
    },
    onPetStatusChange() {
      this.getPets()
    },
    onSnackbarInput(isDisplay) {
      this.isSnackbarDisplay = isDisplay
    }
  }
};
</script>
