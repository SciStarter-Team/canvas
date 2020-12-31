<template>
<div class="canvas-select-project flex flex-jc-sb  canvas-style">


  <!--LIVE CURATED PROJECTS-->
  <div class="canvas-flex-project__card frame-round p-base m-0-0-2" v-for="(item, idx) in curated" :key="item.id">
    <div class="flex-col flex-jc-sb h-100">
      <div>
        <div class="videoWrapper m-0-0-1h">
          <video controls class="videoWrapper__video" :poster="(!!curated_posters[idx]) ? curated_posters[idx] : ''" preload="auto">
            <template v-for="vid in curated_intros[idx]">
              <source :key="vid.url" :type="vid.type" :src="vid.url">
            </template>
          </video>
        </div>
        <h3 class="serif color-p fs-b1 w-700">{{ !!item.name_override ? item.name_override : item.project.name }}</h3>
        <div class="flex flex-jc-sb flex-ai-b m-0-0-1">
          <a @click="viewProject(item)" class="w-400">View project</a>
          <div class="fs-s1">
            <a v-for="vid in curated_intros[idx]" :key="vid.url + 'd'" :href="vid.url" target="_blank" download class="p-l-1h">{{ extension(vid.url) }} <svg class="download-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="Solid"><path d="m239.029 384.97a24 24 0 0 0 33.942 0l90.509-90.509a24 24 0 0 0 0-33.941 24 24 0 0 0 -33.941 0l-49.539 49.539v-262.059a24 24 0 0 0 -48 0v262.059l-49.539-49.539a24 24 0 0 0 -33.941 0 24 24 0 0 0 0 33.941z"/><path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"/></g></svg></a>
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
          <span v-if="user.id == item.project.teacher.id" class="custom-category cc-user">created by you</span>
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
    computed: {
        curated_intros() {
            return this.curated.map(item => item.videos.filter(vid => vid.role === 0));
        },

        curated_posters() {
            // This should work, but instead raises inexplicable
            // errors about variables that aren't even used in the
            // expression.
            // return this.curated_intros.map(vids => vids.find(v => !!v.poster).poster);

            return this.curated_intros.map(function(vids) {
                var matches = vids.filter(function(v) { return !!v.poster; });
                if(matches.length >= 1) {
                    return matches[0].poster;
                }
                else {
                    return '';
                }
            });
        }
    },
    methods: {
        intro_videos(videos) {
            return videos.filter(vid => vid.role === 0);
        },

        extension(url) {
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
