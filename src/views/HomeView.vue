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
    };
  },

  created() {},

  computed: {
    ...mapState({
      account: "account",
    }),

    user() {
      return this.account.user;
    },

    ...mapGetters(["getUsername"]),
    ...mapGetters("channels", ["getChannels"]),
  },

  methods: {
    /* Llamando método desde un solo archivo. */
    ...mapActions({
      calculateAge: "account/calculateAge",
      logtOut: "account/logtOut",
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
        :status="user.isOnline"
      />
      <div class="orderButtons">
        <div>
          <button @click="calculateAge()">Calculate Age</button>
        </div>
        <div>
          <button @click="logtOut()">Log out</button>
        </div>
      </div>
      <span style="display: inline"
        >Edad: {{ user.age == 0 ? " " : user.age }}</span
      >
      <RouterLink to="/" class="channels-title">
        Channels <Icon icon="carbon:hashtag" />
      </RouterLink>
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

  button {
    @apply w-full px-3 py-2 mt-2 rounded-md bg-zinc-600;
  }
}

.orderButtons {
  @apply flex gap-2;
}
</style>