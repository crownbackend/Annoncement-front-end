<template>
  <div class="scroller">
    <h3>{{ ad.name }}</h3>
    <div :key="key" v-for="(message, key) in messages">
      <div class="row" v-if="message.senderId === authUser.id">
        <div class="col-4 offset-8">
          <div class="bg-light-primary rounded p-2">
            {{ message.content }}
          </div>
          <div class="text-end">
            <small class="text-muted p-2">{{ message.createdAt}}</small>
            <small class="text-muted" v-if="!message.readAt"><i class="bi bi-check fs-5"></i></small>
            <small class="text-muted" v-if="message.readAt" :title="'Message lu à' + message.readAt"><i :title="'Message lu à' + message.readAt" class="bi bi-check-all fs-5" style="color: tomato"></i></small>
          </div>
        </div>
      </div>
      <br>
      <div class="row" v-if="message.senderId !== authUser.id">
        <div class="col-4">
          <div v-html="message.content" class="bg-light-secondary rounded p-2">
          </div>
          <div>
            <small class="text-muted p-2">{{ message.createdAt}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-3">
    <textarea class="form-control" @focus="userShowMessage" placeholder="Écrivez votre message" style="width: 100%" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Message from "@/model/message";
import AuthService from "@/service/AuthService";
import Ad from "@/model/ad";
import MessageApi from "@/service/MessageApi";
import Discussion from "@/model/discussion";


export default defineComponent({
  name: 'MessageComponent',
  props: {
    messages: {
      type: Object as PropType<Message[]>,
      required: true
    },
    discussions: {
      type: Object as PropType<Discussion[]>,
      required: true
    },
    ad: {
      type: Object as PropType<Ad>,
      required: true
    },
  },
  data() {
    return {
      authUser: AuthService.getInfosUser(),
      socket: new WebSocket("ws://localhost:3001"),
    }
  },
  mounted() {

    this.socket.onopen = () => {

      console.log("Successfully connected to the echo websocket server on message component")
    }
  },
  methods: {
    userShowMessage() {
      if(this.messages[this.messages.length -1].senderId == this.authUser.id) {
        this.socket.send('messageViewByUser' + this.messages[this.messages.length -1].senderId)
      } else if(this.messages[this.messages.length -2].senderId == this.authUser.id) {
        this.socket.send('messageViewByUser' + this.messages[this.messages.length -2].senderId)
      }
      this.socket.onmessage = (event) => {
        if('messageViewByUser' + this.messages[this.messages.length -1].senderId == 'messageViewByUser' + this.authUser.id) {
          const id = {
            id: this.messages[this.messages.length -1].id
          }
          MessageApi.readMessage(id)
              .then(response => {
                if(response.data !== 'read') {
                  console.log(response)
                  this.$emit('update:discussion', response.data)
                }
              })
              .catch(err => console.error(err))
        } else if('messageViewByUser' + this.messages[this.messages.length -2].senderId == 'messageViewByUser' + this.authUser.id) {
          const id = {
            id: this.messages[this.messages.length -2].id
          }
          MessageApi.readMessage(id)
              .then(response => {
                if(response.data !== 'read') {
                  console.log(response)
                  this.$emit('update:discussion', response.data)
                }
              })
              .catch(err => console.error(err))
        }
      }
    }
  },

})
</script>

<style lang="scss" scoped>
.bg-light-primary {
  background-color: #76CDCD;
  color: white;
}
.bg-light-secondary {
  background-color: #F27438;
  color: white;
}
.scroller {
  height: 700px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
</style>
