<template>
  <div class="flex w-full h-full" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "igt-tab",
  props: {
    name: {required: true},
    selected: {default: false},
    hasAlert: {default: false},
    canSelect: {default: true},
  },

  data() {
    return {
      isActive: false,
      isAlert: false,
    };
  },

  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-');
    }
  },

  mounted() {
    this.isActive = this.selected;
    this.isAlert = this.hasAlert;
  },

  methods: {
    setAlert(status) {
      this.isAlert = status;
    },
  },
}
</script>

<style scoped>

</style>
