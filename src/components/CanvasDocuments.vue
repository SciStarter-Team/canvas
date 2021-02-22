<template>
<div id="canvas-documents" class="canvas-style p-base flex">

  <div class="width-66 p-r-base getting-started">
    <!-- <img v-if="organization.welcome_image" :src="organization.welcome_image" /> -->
    <div class="welcome">
      <h3 class="serif color-p fs-b1 w-700 m-0-0-s4">Welcome!</h3>
      <p>Welcome to {{organization.portal_name}} where students can participate in authentic research projects with thousands of involved citizens around the globe! The information students collect and share with scientists and researchers will help answer important questions and better understand our world.</p>
    </div>

    <h3 class="serif color-p fs-b1 w-700 m-0-0-base">How to Use</h3>
    <ol class="instructions">

      <li><h4 class="fs-base w-700 tt-u color-o">Select a Project</h4>
        <p>Use the Browse &amp; Select tab to find a project to assign to your students.</p></li>
      <li><h4 class="fs-base w-700 tt-u color-o">Participate in the Project</h4>
        <p>Help your students participate in an ongoing research project by collecting or analyzing data.</p></li>
      <li><h4 class="fs-base w-700 tt-u color-o">Create a Project</h4>
        <p>Optionally, after your class has completed a citizen science project together, create your own project and share it with others!</p></li>
    </ol>

    <p>
      Before you start on your citizen science adventure, do what
      every good scientist does: research your topic! We've made it
      easy for you. Spend 15 minutes on this self-guided
      "introduction to citizen science" tutorial and review the
      FAQs!
    </p>
    <iframe ref="tutframe" width="740" height="660" @load="$refs.tutframe.style.transform = 'scale(0.99, 1)'" src="https://media.scistarter.org/curated/Broward+Tutorial_January+2021/Broward+Citizen+Science+Tutorial_January_21_2021+-+Storyline+output/story.html"></iframe>
    <p>Or, <a href="https://media.scistarter.org/curated/Broward+Tutorial_January+2021/Broward+Citizen+Science+Tutorial_January_21_2021+-+Storyline+output/story.html" target="_blank">Open the tutorial in a new tab</a></p>
  </div>

  <div class="width-33 p-l-base">
    <h2 class="color-b fs-b2 serif m-0-0-base">Documents</h2>
    <ul class="standard">
      <li v-for="(item,i) in documents" :key="'doc' + i">
        <a :href="item.url">{{item.name}}</a>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
import store from '../store.js'
export default {
    name: 'Documents',
    props: ['organization'],
    data: function(){
        return {
            documents: store.documents
        }
    }
}
</script>

<style lang="scss">
@import '../assets/css/CanvasVariables.scss';
.getting-started {
    img {
        width:100%;
    }
}
.welcome {
    padding: $base;
    margin-bottom: $b4;
    border: 1px solid $blue;
    background-color: $blue_light;
    p {
    font-weight: 400;
  }
}

</style>
