<template>
  <v-row justify="center">
    <v-dialog
      :value="isOpen"
      persistent
      max-width="460px"
    >
      <Card :item="itemToBuy">
        <template v-slot:text>
          <v-spacer />

          <v-card-text
            class="pt-4"
          >
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                  v-model="itemQuantity"
                  label="Quantity"
                  value="1"
                  :suffix="itemToBuy.name"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-menu
                  v-model="isShipDateMenuDisplay"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="shipDate"
                      label="Choose ship date"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="shipDate"
                    @input="isShipDateMenuDisplay = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </template>

        <template v-slot:actions>
          <v-card-actions>
            <v-spacer />

            <v-btn
              color="blue darken-1"
              text
              @click="onOrderDialogClose"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="onOrderDialogPlaceOrder"
            >
              Place Order
            </v-btn>
          </v-card-actions>
        </template>
      </Card>
    </v-dialog>

    <Snackbar
      :text="snackbarText"
      :display="isSnackbarDisplay"
      @onSnackbarInput="onSnackbarInput"
    />
  </v-row>
</template>

<script>
import Card from './Card'
import Snackbar from './Snackbar'
import placeOrder from "@/api/placeOrder";

export default {
  name: "OrderDialog",

  components: {
    Card,
    Snackbar
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    itemToBuy: {
      type: Object,
      default: () => ({
        "id": 0,
        "category": {},
        "name": null,
        "photoUrls": [],
        "tags": [],
        "status": null
      }),
      required: true
    }
  },

  data: () => ({
    orderData: {
      "petId": null,
      "quantity": null,
      "shipDate": null,
      "status": null,
      "complete": null
    },
    itemQuantity: 1,
    isShipDateMenuDisplay: false,
    shipDate: null,
    snackbarText: '',
    isSnackbarDisplay: false
  }),

  methods: {
    onOrderDialogClose() {
      this.$emit('onOrderDialogClose')
    },
    async onOrderDialogPlaceOrder() {
      this.orderData = {
        "petId": this.itemToBuy.id,
        "quantity": this.itemQuantity,
        "shipDate": this.shipDate,
        "status": "placed",
        "complete": true
      }

      try {
        const { data } = await placeOrder(this.orderData)

        this.$emit('onOrderDialogClose')
        this.snackbarText = `
          Your order for ${this.itemToBuy.name} x ${data.quantity} has been just placed.
          Order id is: ${data.id}.
        `
      } catch (e) {
        this.text = e.message
      } finally {
        this.isSnackbarDisplay = true
      }
    },
    onSnackbarInput(isDisplay) {
      this.isSnackbarDisplay = isDisplay
    }
  }
}
</script>

<style scoped>

</style>
