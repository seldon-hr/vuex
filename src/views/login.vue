<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    //Llamar al state de Vuex
    ...mapState(['user', 'username', 'password']),

    user: {
      get() {
        return this.user;
      },
      set(value) {
        this.$store.commit('setUser', value);
      },
    },

    username: {
      get() {
        return this.username;
      },
      set(value) {
        this.setUsername(value);
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
    ...mapMutations(['setUsername', 'setPassword']),

    ...mapActions( ['updateUsername', 'calculateAge', 'verifyPassword']),
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
       -->
      <input 
      v-model="username"
      type="text" 
      placeholder="Jane Smith" 
      @input="setUsername($event.target.value)"/>
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
