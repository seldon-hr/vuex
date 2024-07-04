<script>
import MessageItem from "@/components/MessageItem.vue";
import { mapGetters, mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    MessageItem,
  },
  data() {
    return {
      /* title: "Status", */
      channelId: null,
      textMessage: "",
    };
  },
  computed: {
    ...mapState({
      account: "account",
      channelsState: "channels",
    }),

    ...mapGetters("contacts", ["getContacts", "getContactsByID"]),

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

    message: {
      get() {
        return this.messages.message;
      },
      set(value) {
        updateMessage(value);
      },
    },

    messagesView() {
      return this.getMessages(this.channelId)?.map((message) => {
        const author = this.getContacts.find((p) => p.id === message.author);
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
    ...mapActions({
      updateMessage: "messages/updateMessage",
      newMessage: "messages/newMessage",
    }),

    scrollToBottom() {
      this.$refs?.end?.scrollIntoView({
        behavior: "smooth",
      });
    },

    sendMessage() {
      if (this.textMessage == "") return;

      let message = {
        id: this.messages.length + 1,
        author: this.user.id,
        message: this.textMessage,
        timestamp: new Date().toLocaleTimeString(),
        channelId: this.channelId,
      };
      this.newMessage(message);
      this.textMessage = "";
      this.scrollToBottom();
    },

    handleEnterKey(event) {
      if (this.textMessage.trim() !== "") {
        this.sendMessage();
      }
      event.preventDefault(); // Prevenir la acción por defecto de la tecla Enter
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
      <textarea
        v-model="textMessage"
        rows="3"
        @keyup.enter.exact="handleEnterKey"
        @keyup.enter.shift="insertNewLine"
      ></textarea>
      <button @click="sendMessage()">
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