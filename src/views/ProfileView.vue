<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.account.user,
    }),

    ...mapGetters(["getUsername"]),
  },
  methods: {
    ...mapMutations({
      setUsername: "account/setUsername",
    }),

    ...mapActions({
      calculateAge: "profile/calculateAge",
    }),
  },
};
</script>
<template>
  <div class="profile">
    <div class="box">
      <img :src="user.avatar" alt="avatar" />
      <label for="username">Nombre de usuario</label>
      <!-- $event.target.value
        Es una propiedad que nos da Vue para acceder al valor del input y se dispara con su valor.
       -->
      <input
        type="text"
        placeholder="Jane Smith"
        :value="user.username"
        @input="setUsername($event.target.value)"
      />
      <!-- 
      De esta forma se llama sin la necesidad de usar mapMutations, pero no es recomendable.
      @input="$store.commit('setUsername',$event.target.value)"
       -->
      <button @click="$router.push('/')">Acceder</button>
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
