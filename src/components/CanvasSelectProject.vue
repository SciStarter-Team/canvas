<template>
  <div class="canvas-select-project">

    <template v-if="projectToAssign">
        <keep-alive>
        <AssignProject :item="projectToAssign" :organization="organization" :user="user" @cancel="backToList" />
        </keep-alive>
    </template>

    <template v-else-if="projectView">
        <ViewProject @assign="assignProject" @clearProject="backToList" :organization="organization" :user="user" :project="projectView" />
    </template>

    <template v-else>
        <keep-alive>
        <ProjectList :curated="curated" :custom="custom" @clicked="setProjectView" @assign="assignProject" :organization="organization" :user="user" />
      </keep-alive>

    </template>


  </div>
</template>

<script>
// ******** REMOVE FOR PROD
import store from '../store.js'
//******************************
import ProjectList from '../components/CanvasProjectList'
import ViewProject from '../components/CanvasViewProject'
import AssignProject from '../components/CanvasAssignProject'
export default {
    name: 'SelectProject',
    components: {
      ProjectList,
      ViewProject,
      AssignProject
    },
    props: ['user','organization'],
    data: function(){
      return {
        curated: store.broward.items, // replace with real data
        custom: store.broward.custom,
        projectView: null,
        projectToAssign: null
      }
    },
    methods: {
      extension: function(url) {
            var parts = url.split('.');
            return parts[parts.length - 1];
        },
      setProjectView: function(e){
        this.projectView = e
      },
      viewProjectAction: function(e){
          this.setProject(e);
      },
      backToList: function(){
        this.projectView = null
        this.projectToAssign = null
      },
      setProject: function(){
        // do all the logic to assign the project
        this.projectAssigned = true
      },
      assignProject:function(e){
        this.projectToAssign = e
        this.projectAssigned = true
      },
      scrollToTop(){
        window.scrollTo(0,0)
      }
    },
    created() {
      let ctx = this
      ctx.curated.map(function(d){

        d.intro_video_urls_filtered = [];
        d.intro_video_urls.forEach(function(v){
          if(v){d.intro_video_urls_filtered.push(v)}
        })
        return d;
      })
    },
    mounted() {
      // this.scrollToTop()
    }
}
</script>

<style lang="scss">
@import '../assets/css/CanvasVariables.scss';
@import '../assets/css/CanvasSelectProject.scss';
</style>
