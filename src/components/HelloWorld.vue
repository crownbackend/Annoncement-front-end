<template>
  <div class="hello">

    <p class="text-gray-500 text-lg" style="color: #5DBCD2">
      Vue and Tailwind CSS in action
    </p>
    <p class="text-gray-500 text-lg" style="color: #0B3C5D">
      Vue and Tailwind CSS in action
    </p>
    <p class="text-gray-500 text-lg" style="color: #F7941E">
      Vue and Tailwind CSS in action
    </p><p class="text-gray-500 text-lg" style="color: #828282">
      Vue and Tailwind CSS in action
    </p>
    <button class="btn btn-primary">hello</button>
    <button class="btn btn-secondary">hello</button>
    <button class="btn btn-success">hello</button>
    <button class="btn btn-info">hello</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
