<script>
import { RouterView, RouterLink } from "vue-router";
import InputSearch from "@/components/InputSearch.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import ChatItem from "@/components/ChatItem.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    RouterView,
    RouterLink,
    InputSearch,
    ProfileCard,
    ChatItem,
  },
  /* Options API */
  data() {
    return {
      search: "",
      channels: [
        { id: 1, name: "General", messages: 27 },
        { id: 2, name: "Emergencias", messages: null },
        { id: 3, name: "Anuncios", messages: 2 },
        { id: 4, name: "Proyecto 1", messages: 24 },
        { id: 5, name: "Non-work", messages: null },
        { id: 6, name: "Atención a clientes", messages: 120 },
        { id: 7, name: "Q Asistencia", messages: 12 },
        { id: 8, name: "Insignia", messages: 0 },
        { id: 9, name: "OPL", messages: 0 },
      ],
    };
  },

  computed: {
    ...mapState({
      profile: "profile",
    }),

    user() {
      return this.profile.user;
    },

    ...mapGetters(["getUsername"]),
    ...mapGetters("channels", ["getChannels"]),
  },

  methods: {
    /* Llamando método desde un solo archivo. */
    ...mapActions({
      calculateAge: "profile/calculateAge",
    }),
  },
};
</script>

<template>
  <div class="home">
    <aside>
      <InputSearch v-model="search" />
      <ProfileCard
        :avatar="user.avatar"
        :username="user.username"
        :status="user.status"
      />
      <button @click="calculateAge()">Calculate Age</button>
      <span style="display: inline"
        >Edad: {{ user.age == 0 ? " " : user.age }}</span
      >
      <RouterLink to="/" class="channels-title"
        >Canales <Icon icon="carbon:hashtag"
      /></RouterLink>
      <div class="channels">
        <ChatItem
          v-for="channel in getChannels(search)"
          :key="channel.id"
          :id="channel.id"
          :name="channel.name"
          :messages="channel.messages.length"
        />
      </div>
    </aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  @apply flex h-screen;
  aside {
    @apply flex flex-col w-80 min-w-max px-6 py-5 gap-4 bg-zinc-800;
    .channels-title {
      @apply flex items-center gap-2 mt-2 ml-3 text-xl font-bold text-neutral-200;
    }
    .channels {
      @apply flex flex-col gap-2 overflow-y-auto;
    }
  }
  main {
    @apply w-full;
  }
}
</style>