<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
        this.$store.commit("setUser", value);
      },
    },

    userNotFound() {
      return this.account.userNotFound;
    },

    passwordIncorrect() {
      return this.account.passwordIncorrect;
    },

    noUsernameNeitherPassword() {
      return this.account.noUsernameNeitherPassword;
    },

    avatar() {
      return this.account.user.avatar;
    },

    username: {
      get() {
        return this.account.userRequest.username;
      },
      set(value) {
        this.setUsernameEntry(value);
      },
    },

    password: {
      get() {
        return this.account.userRequest.password;
      },
      set(value) {
        this.setPassword(value);
      },
    },

    ...mapGetters(["getUsername"]),
  },
  methods: {
    ...mapMutations({
      setUser: "account/setUser",
      setUsernameEntry: "account/setUsernameEntry",
      setPassword: "account/setPasswordEntry",
      setNoUsernameNeitherPassword: "account/setNoUsernameNeitherPassword",
    }),

    ...mapActions({
      identifyUser: "account/identifyUser",
      verifyPassword: "account/verifyPassword",
      getUsers: "account/getUsers",
    }),

    onIdentifyUser(value) {
      if (value !== "") {
        this.identifyUser();
      }
    },

    onVerifyPassword(password) {
      if (password !== "") {
        this.verifyPassword();
      }
    },
  },
};
</script>
<template>
  <div class="profile">
    <div class="box">
      <img :src="avatarBase || avatarProfile" alt="avatar" />
      <label for="username">Username:</label>
      <input
        v-model="username"
        type="text"
        placeholder="Jane Smith"
        @blur="onIdentifyUser($event.target.value)"
      />
      <span v-if="userNotFound || noUsernameNeitherPassword">{{
        "The username was not found."
      }}</span>
      <label for="password">Password:</label>
      <input v-model="password" type="password" placeholder="............." />
      <span v-if="passwordIncorrect || noUsernameNeitherPassword">{{
        "The password was incorrect."
      }}</span>

      <button @click="onVerifyPassword()">Acceder</button>
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

span {
  @apply text-red-500;
  font-size: 0.8rem;
}
</style>
