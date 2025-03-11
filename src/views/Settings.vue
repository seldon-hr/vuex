<template>
  <div class="home">
    <aside>
      <InputSearch v-model="search" />
      <ProfileCard
        :avatar="user.avatar"
        :username="user.username"
        :status="user.isOnline"
      />
      <RouterLink :to="{ name: 'login' }">
        <div>
          <button @click="logtOut()">Log out</button>
        </div>
      </RouterLink>
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
      <div class="center-title">Settings in mantiance...</div>
    </main>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import InputSearch from "@/components/InputSearch.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import ChatItem from "@/components/ChatItem.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
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
    ...mapActions({
      calculateAge: "account/calculateAge",
      logtOut: "account/logtOut",
    }),
  },
};
</script>

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

.center-title {
  @apply flex items-center justify-center h-full;
}

.orderButtons {
  @apply flex gap-2;
}
</style>