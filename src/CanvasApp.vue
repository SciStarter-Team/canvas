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
    computed: {
        user() {
            return JSON.parse(document.getElementById('data-user').textContent);
        },

        organization() {
            return JSON.parse(document.getElementById('data-organization').textContent);
        },
    },
    data: function(){
        return {
        }
    }
}
</script>

<style lang="scss">
@import './assets/css/CanvasVariables.scss';
@import './assets/css/CanvasApp.scss';

</style>
