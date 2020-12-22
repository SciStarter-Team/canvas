<template>
  <div id="app">
      <div class="ss-canvas-wrapper">
        <header>
            <img src="./assets/img/canvas/scistarter-logo-web-r.svg" alt="SciStarter logo" />
        </header>
        <main>
            <TeacherAssignTabs :user="user" :organization="organization" />
        </main>
        <footer>
        </footer>
      </div><!-- end .ss-canvas-wrapper-->

  </div>
</template>

<script>
import TeacherAssignTabs from './components/CanvasTeacherAssignTabs.vue'
export default {
  name: 'App',
  components: {
    TeacherAssignTabs
  },
  data: function(){
    return {
      organization: {
        name: "Broward",
        portal_name: "Broward's PBL Portal @ SciStarter",
        welcome_image: "img/PBL_image_aC85UGb.jpg"
      }, // replace with real data
      user: {
        "id":69,
        "name":"kevinripka",
        "school":""
      }, // replace with real data
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/CanvasVariables.scss';
@import './assets/css/CanvasApp.scss';

</style>
