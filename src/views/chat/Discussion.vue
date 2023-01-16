<template>
  <div v-if="discussions !== 0">
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-3" style="border-left: 3px solid #F7941E;" :key="key" v-for="(discussion, key ) in discussions">
          <div class="row g-0">
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
        </div>
      </div>
      <div class="col-md-4">

      </div>
      <div class="col-md-4">

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

export default defineComponent({
  name: 'DiscussionView',
  mixins: [Mixins],
  data() {
    return {
      discussions: []
    }
  },
  created() {
    DiscussionApi.meDiscussion()
        .then(response => {
          this.discussions = response.data
          this.discussions.map(v => {
            console.log()
            v.messages.at(-1)["createdAt"] = Mixins.methods.formatDate(v.messages.at(-1)["createdAt"])
          })
        })
        .catch(err => console.error(err))
  }
})
</script>
