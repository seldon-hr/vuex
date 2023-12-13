<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  created() {
    this.getUsers();
  },

  computed: {
    //Llamar al state de Vuex
    ...mapState({
      account: "account",
    }),

    user: {
      get() {
        return this.account.user;
      },
      set(value) {
        this.$store.commit('setUser', value);
      },
    },

    username: {
      get() {
        return this.account.username;
      },
      set(value) {
        this.setUsernameEntry(value);
      },
    },

    password: {
      get() {
        return this.password;
      },
      set(value) {
        this.setPassword(value);
      },
    },

    ...mapGetters(['getUsername']),
  },
  methods: {
    ...mapMutations({
      setUser: "account/setUser",
      setUsernameEntry: "account/setUsernameEntry",
      setPassword: "account/setPasswordEntry",
    }),

    ...mapActions({
      identifyUser: "account/identifyUser",
      verifyPassword: "account/verifyPassword",
      getUsers: "account/getUsers", 
    }),
  },
}
</script>
<template>
  <div class="profile">
    <div class="box">
      <img src="/avatars/avatar.jpg" alt="avatar" />
      <label for="username">Username:</label>
      <!-- $event.target.value
        Es una propiedad que nos da Vue para acceder al valor del input y se dispara con su valor.
        Es cuando se le agrega un valor al inputl
       -->
      <input 
      v-model="username"
      type="text" 
      placeholder="Jane Smith" 
      @input="setUsernameEntry($event.target.value)"
      @blur="identifyUser()"/>
      <label for="password">Password:</label>
      <input 
      v-model="password"
      type="password" 
      placeholder="............." 
      />

      <button @click="verifyPassword(password)">Acceder</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  @apply flex justify-center items-center h-screen;
  .box {
    @apply flex flex-col items-center gap-2 p-6 rounded-xl bg-zinc-800;
    img {
      @apply w-32 rounded-full border-8 border-zinc-600;
    }
    label {
      @apply w-full;
    }
    input {
      @apply px-3 py-2 rounded-md bg-zinc-900;
    }
    button {
      @apply w-full px-3 py-2 mt-2 rounded-md bg-zinc-600;
    }
  }
}
</style>
