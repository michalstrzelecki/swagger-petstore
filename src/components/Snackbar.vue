<template>
  <v-snackbar
    :value="display"
    :timeout="timeout"
    @input="onSnackbarInput"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="onSnackbarClose"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",

  props: {
    text: {
      type: String,
      required: true
    },
    display: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    timeout: 7000,
  }),

  methods: {
    onSnackbarInput(isDisplay) {
      this.$emit('onSnackbarInput', isDisplay)
    },
    onSnackbarClose() {
      this.$emit('onSnackbarInput', false)
    }
  }
}
</script>

<style scoped>

</style>
