<template>
  <v-autocomplete
    v-model="itemValue"
    :items="options"
    item-text="label"
    item-value="value"
    class="default"
    background-color="white"
    outlined
    dense
    multiple
    hide-details
    clearable
  ></v-autocomplete>
</template>

<script>
export default {
  name: "QueryMultiSelect",
  props: {
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    options: [],
    itemValue: null,
  }),
  async mounted() {
    // Get the select options, defined in the parent
    this.options = await this.getData();
    // Set the select value to the props value
    this.itemValue = this.value;
  },
  computed: {},
  methods: {
    getData() {
      return Promise.resolve([]);
    },
  },
  watch: {
    itemValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>
