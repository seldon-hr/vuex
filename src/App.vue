<script>
import { mapActions } from "vuex/dist/vuex.cjs.js";
export default {
  created() {
    /* this.getUsers(); */
    this.isThereUserOnStorage();
  },
  methods: {
    ...mapActions({
      getUsers: "account/getUsers",
      isThereUserOnStorage: "account/isThereUserOnStorage",
    }),
  },
};
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
body {
  /* Clases de utilidad de Tailwind CSS */
  @apply bg-neutral-900 text-gray-200;
}
</style>
