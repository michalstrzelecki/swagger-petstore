<template>
  <v-container fluid>
    <OrderDialog
      :isOpen="isOrderDialogOpen"
      :itemToBuy="itemToBuy"
      @onOrderDialogClose="onOrderDialogClose"
    />

    <v-row>
      <!-- item.id is not unique -->
      <v-col
        v-for="(item, key) in items"
        :key="key"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="2"
      >
        <Card
          :item="item"
        >
          <template v-slot:actions>
            <v-card-actions>
              <v-spacer />

              <v-btn icon>
                <v-icon
                    @click.stop="onAddToBasket(item)"
                >
                  mdi-basket-plus-outline
                </v-icon>
              </v-btn>
            </v-card-actions>
          </template>
        </Card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderDialog from "@/components/OrderDialog";
import Card from './Card'

export default {
  name: "CardList",

  components: {
    Card,
    OrderDialog
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    isOrderDialogOpen: false,
    itemToBuy: {}
  }),

  methods: {
    onAddToBasket(item) {
      this.itemToBuy = { ...item }
      this.isOrderDialogOpen = true
    },
    onOrderDialogClose() {
      this.isOrderDialogOpen = false
    }
  }
}
</script>

<style scoped>

</style>
