<template>
  <div class="canvas-select-project flex flex-jc-sb  canvas-style">


    <!--LIVE CURATED PROJECTS-->
  <div class="canvas-flex-project__card frame-round p-base m-0-0-2" v-for="item in curated" :key="item.id">
    <div class="flex-col flex-jc-sb h-100">
      <div>
      <div class="videoWrapper m-0-0-1h">
        <video controls class="videoWrapper__video" :poster="item.intro_video_poster" preload="auto">
          <template v-for="url in item.intro_video_urls_filtered">
            <source :key="url" :src="url">
          </template>
        </video>
      </div>
      <h3 class="serif color-p fs-b1 w-700">{{ !!item.name_override ? item.name_override : item.project.name }}</h3>
      <div class="flex flex-jc-sb flex-ai-b m-0-0-1">
          <a @click="viewProject(item)" class="w-400">View project</a>
        <div class="fs-s1">
          Download&nbsp;Video:<a v-for="url in item.intro_video_urls_filtered" :key="url + 'd'" :href="url" target="_blank" download class="p-l-1h">({{ extension(url) }})</a>
        </div>
      </div>
      <!-- do you still need banner here? what is it? -->
    </div>
      <a @click="assignProject(item)" class="full-btn"><span>Assign this Project</span><span>&raquo;</span></a>
    </div>
  </div>

  <!--ORG CUSTOM PROJECTS-->
  <div class="canvas-flex-project__card frame-round p-base m-0-0-2" v-for="item in custom" :key="item.id">
    <div class="flex-col flex-jc-sb h-100">
      <div>
        <div class="cc-wrap">
          <span v-if="user.id == item.project.teacher.id" class="custom-category cc-user">your project</span>
          <span v-else class="custom-category">educator created</span>
        </div>
        <div class="videoWrapper m-0-0-1h">
          <div class="project-card-image">
            <img :src="item.project.image" v-if="item.project.image_or_video=='image'">
            <video :src="item.project.video" v-else-if="item.project.image_or_video='video'" controls></video>
          </div>

        </div>
        <h3 class="serif color-p fs-b1 w-700">{{ !!item.name_override ? item.name_override : item.project.name }}</h3>
        <p v-if="user.id == item.project.teacher.id">Created on {{item.project.start_date | formatDate}}</p>
        <p v-else>Created by {{item.project.teacher.name}}</p>
        <div class="flex flex-jc-sb flex-ai-b m-0-0-1">
            <a @click="viewProject(item)" class="w-400">View project</a>
        </div>

    </div>
      <a @click="assignProject(item)" class="full-btn"><span>Assign this Project</span><span>&raquo;</span></a>

    </div>
  </div>


  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  props: ['curated','custom','user','organization'],
  data: function(){
    return {
    }
  },
  methods: {
    extension: function(url) {
          var parts = url.split('.');
          return parts[parts.length - 1];
      },
    viewProject(item) {
      this.$emit('clicked', item)
    },
    assignProject(item) {
      this.$emit('assign',item)
    }
  }
}
</script>

<style lang="scss">

</style>
