<script>
import MessageItem from "@/components/MessageItem.vue";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    MessageItem,
  },
  data() {
    return {
      /* title: "Status", */
      channelId: null,
      people: [
        { id: 1, name: "You", avatar: "/avatars/avatar-0.jpg" },
        { id: 2, name: "Hassabis", avatar: "/avatars/avatar-2.jpg" },
        { id: 3, name: "Du Rove", avatar: "/avatars/avatar-1.jpg" },
        { id: 4, name: "Sopolsky", avatar: "/avatars/avatar-5.jpg" },
        { id: 5, name: "Sagan", avatar: "/avatars/avatar-4.jpg" },
        { id: 6, name: "Yuval", avatar: "/avatars/avatar-10.jpg" },
        { id: 7, name: "Hubberman", avatar: "/avatars/avatar-6.jpg" },
      ],
      textMessage: "",
    };
  },
  computed: {
    ...mapState({
      account: "account",
      channelsState: "channels",
    }),

    channels() {
      return this.channelsState.channels;
    },

    title() {
      const channel = this.channels.find(
        (channel) => channel.id === parseInt(this.channelId)
      );
      return channel ? channel.name : "Status";
    },

    user() {
      return this.account.user;
    },

    listUsers() {
      return this.account.usersList;
    },
    /* Las computadas son reactivas, se basan en que si hay un cambio estas deberían cambiar al detectar un cambio de valor */
    ...mapGetters("messages", ["getMessages"]),

    messages: {
      get() {
        return this.getMessages(this.channelId);
      },
      set(value) {
        /* TODO: Actualizar el mensaje bajo método del store, no en la vista. */
        this.$store.commit("messages/setMessages", {
          channelId: this.channelId,
          messages: value,
        });
      },
    },

    messagesView() {
      return this.getMessages(this.channelId)?.map((message) => {
        const author = this.listUsers.find((p) => p.id === message.author);
        if (!author) return message;
        return {
          ...message,
          author,
          // Si el autor del mensaje es igual al usuario actual, darle la clase self
          self: author.id === this.user.id,
        };
      });
    },
  },
  watch: {
    /* Dentro del router vienen como string, cuando son parámetros */
    "$route.params.id": {
      immediate: true,
      handler(id) {
        this.channelId = id;
        this.scrollToBottom();
      },
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      this.$refs?.end?.scrollIntoView({
        behavior: "smooth",
      });
    },

    newMessage() {
      let message = {
        id: this.messages.length + 1,
        author: 1,
        message: this.textMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      this.messages.push(message);
    },
  },
};
</script>

<template>
  <div class="messages">
    <header>
      <h2>{{ title }}</h2>
      <div class="people-list">
        <div class="people-item" v-for="p in listUsers" :key="p.id">
          <img :src="p.avatar" :alt="p.name" />
        </div>
      </div>
    </header>
    <div class="content">
      <MessageItem
        v-for="message in messagesView"
        :key="message.id"
        :avatar="message.author.avatar"
        :author="message.author.name"
        :message="message.message"
        :time="message.timestamp"
        :is-self="message.self"
      />
      <span ref="end"></span>
    </div>
    <footer>
      <textarea v-model="textMessage" rows="3"></textarea>
      <button @click="newMessage()">
        <Icon icon="carbon:send-alt" />
      </button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.messages {
  @apply flex flex-col h-full;
  header {
    @apply flex justify-between items-center px-6 py-2;
    h2 {
      @apply font-bold text-2xl;
    }
    .people-list {
      @apply flex gap-1;
      .people-item {
        @apply flex justify-center items-center border-4 border-neutral-700 rounded-full;
        img {
          @apply w-8 rounded-full;
        }
      }
    }
  }
  .content {
    @apply flex flex-col gap-4 p-4 h-full overflow-y-auto;
  }
  footer {
    @apply flex p-2;
    textarea {
      @apply w-full px-2 py-2 resize-none bg-zinc-800 rounded-tl-md rounded-bl-md focus:outline-none;
    }
    button {
      @apply flex justify-center items-center px-4 bg-zinc-800 hover:bg-zinc-700 rounded-tr-md rounded-br-md text-2xl;
    }
  }
}
</style>