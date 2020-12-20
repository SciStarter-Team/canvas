<template>
  <div id="canvas-documents" class="canvas-style p-base">
      <h2 class="color-b fs-b2 serif m-0-0-base">Documents</h2>
      <ul class="standard">
        <li v-for="(item,i) in documents" :key="'doc' + i">
          <a :href="item.url">{{item.name}}</a>
        </li>
      </ul>

  </div>
</template>

<script>
import store from '../store.js'
export default {
  name: 'Documents',
  data: function(){
    return {
      documents: store.documents
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/CanvasVariables.scss';
</style>
