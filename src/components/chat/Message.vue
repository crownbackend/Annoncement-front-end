<template>
  <div class="scroller">
    <div :key="key" v-for="(message, key) in messages">
      <div class="row" v-if="message.senderId === authUser.id">
        <div class="col-4 offset-8">
          <div class="bg-light-primary rounded p-2">
            {{ message.content }}
          </div>
          <div class="text-end">date</div>
        </div>
      </div>
      <br>
      <div class="row" v-if="message.senderId !== authUser.id">
        <div class="col-4">
          <div class="bg-light-secondary rounded p-2">
            {{ message.content }}
          </div>
          <div>date</div>
        </div>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Message from "@/model/message";
import AuthService from "@/service/AuthService";


export default defineComponent({
  name: 'MessageComponent',
  props: {
    messages: {
      type: Object as PropType<Message>,
      required: true
    }
  },
  data() {
    return {
      authUser: AuthService.getInfosUser()
    }
  }
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
  width: 800px;
  height: 430px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
</style>
