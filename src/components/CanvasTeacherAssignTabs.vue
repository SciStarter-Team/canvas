<template>
  <div id="canvas-tabs">

    <!-- TAB NAVIGATION -->
    <ul class="canvas-tab-nav" role="tablist"  aria-label="Tabs" ref="tabs">

        <li><a @click.prevent="selectTab(0)" role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3" tabindex="-1" href="#panel-3"  class="selected">
          <div class="ss-tab-icon"><img src="../assets/img/canvas/paper.svg" alt="paper icon" /></div>
          <div class="ss-tab-text">
              <span>Getting Started</span>
              <span>and helpful docs</span>
          </div>
        </a></li>
        <li><a @click.prevent="selectTab(1)" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" tabindex="0" href="#panel-1">
            <div class="ss-tab-icon"><img src="../assets/img/canvas/pointing-hand.svg" alt="pointing hand icon" /></div>
            <div class="ss-tab-text">
                <span>Browse &amp; Select</span>
                <span>projects</span>
            </div>
        </a></li>
        <li><a @click.prevent="selectTab(2)" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1" href="#panel-2">
          <div class="ss-tab-icon"><img src="../assets/img/canvas/screwdriver.svg" alt="screwdriver icon" /></div>
          <div class="ss-tab-text">
              <span>Create &amp; Edit</span>
              <span>your own projects</span>
          </div>
        </a></li>

      </ul>

      <!-- TAB PANELS -->

      <div id="panel-3" class="canvas-panel"  v-if="tabIndex === 0" role="tabpanel" tabindex="0" aria-labelledby="tab-3">
        <keep-alive>
        <Documents :organization="organization" />
      </keep-alive>
      </div>

      <div id="panel-1" class="canvas-panel" v-if="tabIndex === 1" role="tabpanel" tabindex="0" aria-labelledby="tab-1" >
        <keep-alive>
        <SelectProject  :user="user" :organization="organization" />
      </keep-alive>
      </div>



      <div id="panel-2" class="canvas-panel" v-if="tabIndex === 2" role="tabpanel" tabindex="0" aria-labelledby="tab-2">
        <keep-alive>
        <CreateProject :user="user" :organization="organization" />
      </keep-alive>
      </div>




  </div>
</template>

<script>
import SelectProject from '../components/CanvasSelectProject.vue'
import CreateProject from '../components/CanvasCreateProject.vue'
import Documents from '../components/CanvasDocuments.vue'

export default {
  components: {
    SelectProject,
    CreateProject,
    Documents
  },
  props: ['user','organization'],
  data: function(){
    return {
      tabIndex: 0
    }
  },
  methods: {
    selectTab(i){
      if (i !== this.tabIndex){
        let tabs = this.$refs.tabs.querySelectorAll('a')
        tabs.forEach(function(d){
          d.classList.remove('selected')
        })
        tabs.item(i).classList.add('selected')
        this.tabIndex = i
        window.scrollTo(0,0)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/CanvasVariables.scss';
@import '../assets/css/CanvasTeacherAssignTabs.scss';
</style>
