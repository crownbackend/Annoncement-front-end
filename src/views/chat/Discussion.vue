<template>
  <div class="container" v-if="discussions">
    <div class="row">
      <div class="col-md-4">
        <div class="scroller">
          <div class="card mb-3" :class="selectedDiscussion === discussion.id ? 'selected__discussion' : ''"  :key="key" v-for="(discussion, key ) in discussions">
            <div class="row g-0 pointer" @click="selectDiscussion(discussion)">
              <div class="col-md-4">
                <img src="https://picsum.photos/1000/700" style="height: 100%" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ discussion.ad.name.slice(0, 20) }}...</h5>
                  <p class="card-text">{{ discussion.messages.at(-1).content.slice(0, 30) }}...</p>
                  <p class="card-text"><small class="text-muted">{{ discussion.messages.at(-1).createdAt }}</small></p>
                </div>
              </div>
            </div>
            <div class="text-end pointer position-absolute bottom-0 end-0 fs-4 mb-0">
              <i class="bi bi-archive-fill" @click="deleteDiscussion(discussion.id)" style="color: tomato"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <MessageComponent @update:discussion="updateDiscussion" :discussions="discussions" :ad="ad" :messages="messages"/>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DiscussionApi from "@/service/DiscussionApi";
import Mixins from "@/mixins/Mixins";
import Discussion from "@/model/discussion";
import Message from "@/model/message";
import MessageComponent from "@/components/chat/Message.vue";
import Ad from "@/model/ad";

export default defineComponent({
  name: 'DiscussionView',
  components: {MessageComponent},
  mixins: [Mixins],
  data() {
    return {
      discussions: [] as Discussion[],
      messages: [] as Message[],
      ad: {} as Ad,
      selectedDiscussion: 0,
    }
  },
  created() {
    DiscussionApi.meDiscussion()
        .then(response => {
          this.discussions = response.data
          this.discussions.map((v: Discussion, k) => {
            v.messages.map((v: Message, k) => {
              v.createdAt = Mixins.methods.formatDate(v.createdAt)
            })
          })
          this.selectedDiscussion = this.discussions[0].id
          this.ad = this.discussions[0].ad
          this.messages = this.discussions.filter(value => value == this.discussions[0])[0].messages
        })
        .catch(err => console.error(err))

  },
  methods: {
    selectDiscussion(discussion: Discussion) {
      this.selectedDiscussion = discussion.id
      this.messages = this.discussions.filter(value => value == discussion)[0].messages
      this.ad = discussion.ad
    },
    deleteDiscussion(id: number) {
      if(confirm('Etes vous sur de supprimer cette conversation ?')) {
        DiscussionApi.delete(id)
            .then(response => {
              this.discussions = response.data
              this.discussions.map((v: Discussion, k) => {
                v.messages.map((v: Message, k) => {
                  v.createdAt = Mixins.methods.formatDate(v.createdAt)
                })
              })
            }).catch(err => console.error(err))
      }
    },
    updateDiscussion(discussions: Discussion[]) {
      console.log(discussions)
      this.discussions = discussions
      this.discussions.map((v: Discussion, k) => {
        v.messages.map((v: Message, k) => {
          v.createdAt = Mixins.methods.formatDate(v.createdAt)
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.selected__discussion {
  border-left: 5px solid #F7941E;
  background-color: #f4f6f7
}
.scroller {
  height: 800px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
</style>
