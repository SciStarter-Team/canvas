<template>
<div id="canvas-create">

  <template v-if="showForm">
    <CreateProjectForm :user="user" :organization="organization" @projectCreated="giveSuccess" :edit="projectToEdit" @cancel="cancelForm" @project-added="projectAdded" />
  </template>

  <template v-else>

    <div v-if="finished">
      <div class="p-base">
        <p class="color-o tt-u w-700 fs-s1 m-0-0-s3">Project Created</p>
        <h1 class="color-p fs-b4 serif w-700 m-0-0-s2">{{finished}} Successfully Created!</h1>
      </div>
    </div>

    <div class="p-base">
      <h2 class="color-b fs-b2 serif m-0-0-base">Create a <span v-if="finished">Another</span> Project</h2>
      <p class="width-66">After your class has completed a citizen science project together, create your own project and share it with others!</p>
      <a @click="setShowForm" class="cbtn-primary">Create a Project <span>&raquo;</span></a>
    </div>

    <div v-if="user_projects" class="p-base">
      <div class="separator"></div>


      <h2 class="color-b fs-b2 serif m-0-0-base">Manage Your Projects</h2>
      <div class="canvas-select-project flex flex-jc-sbcanvas-style">
        <div class="canvas-flex-project__card frame-round p-base m-0-0-2" v-for="(item,i) in user_projects" :key="item.id">
          <div class="flex-col flex-jc-sb h-100">
            <div class="videoWrapper m-0-0-1h">
              <div class="project-card-image">
                <img :src="item.project.image" v-if="item.project.image_or_video=='image'">
                <video :src="item.project.video" v-else-if="item.project.image_or_video='video'" controls></video>
              </div>

            </div>
            <h3 class="serif color-p fs-b1 w-700">{{ !!item.name_override ? item.name_override : item.project.name }}</h3>
            <p>Created on {{item.project.start_date | formatDate}}</p>


            <div class="flex flex-ai-c m-0-0-s1">
              <label class="switch">
                <input type="checkbox" v-model="item.project.shared">
                <span class="slider round"></span>
              </label>
              <label v-if="item.project.shared" class="fs-s1 color-g w-700">This project is being shared</label>
              <label v-else class="fs-s1 color-g w-700">Share this project</label>
            </div>
            <div class="flex flex-jc-sb flex-ai-b">
              <a @click="editProject(item)" class="cbtn-primary">edit project <span>&raquo;</span></a>
              <a @click="deleteProject(item,i)">delete</a>
            </div>
          </div>
        </div>


      </div>
    </div>

  </template>


</div>
</template>

<script>
import CreateProjectForm from '../components/CanvasCreateProjectForm'
export default {
    name: 'CreateProject',
    components: {
        CreateProjectForm
    },
    props: ['user','organization','edit'],
    data: function(){
        return {
            showForm: false,
            finished: null,
            new_projects: [],
            projectToEdit: null
        }
    },
    computed: {
        user_projects() {
            return JSON.parse(document.getElementById('data-custom-projects').textContent).filter(p => p.project.teacher.id === this.user.id).concat(this.new_projects);
        }
    },
    methods: {
        projectAdded(proj) {
            this.new_projects.push(proj);
            this.$emit('project-added', proj)
        },
        setShowForm(){
            this.showForm = true;
        },
        giveSuccess(e){
            this.showForm = false
            this.finished = e
            this.scrollToTop()
        },
        scrollToTop(){
            window.scrollTo(0,0)
        },
        cancelForm(){
            this.showForm = false;
            this.scrollToTop()
        },
        editProject(item){
            this.projectToEdit = item.project
            this.showForm = true
        },
        deleteProject(item,i){
            let c = confirm('Press OK to delete the project')
            if (c) {
                console.log(item);
                this.user_projects.splice(i,1)
            }
        }
    }
}
</script>


<style lang="scss">
@import '../assets/css/CanvasVariables.scss';
@import '../assets/css/CanvasCreateProject.scss';
</style>
