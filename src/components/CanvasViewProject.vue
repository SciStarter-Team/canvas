<template>
<div class="canvas-project-details">
  <div class="m-0-0-base"><a @click="backToList">&laquo; back to projects</a></div>

  <template>

    <div id="project-details">

      <div class="flex">
        <div class="flex flex-center-both project-name">
          <div>
            <h1 class="serif fs-b1 color-w ta-center">{{project.project.name}}</h1>
            <template v-if="project.project.type == 'CustomProject'">
              <p class="color-w m-0 ta-center">Shared by {{project.project.teacher.name}}</p>
              <p class="color-w m-0 ta-center">{{project.project.teacher.school}}</p>
            </template>
          </div>
        </div>

        <template v-if="project.project.type == 'Project'">
          <div class="project-video">
            <div class="videoWrapper">
              <video controls class="videoWrapper__video" :poster="poster" preload="auto">
                <template v-for="vid in intro_videos">
                  <source :key="vid.url" :type="vid.type" :src="vid.url">
                </template>
              </video>
            </div>
          </div>
        </template>

        <template v-if="project.project.type == 'CustomProject'">
          <div class="project-video">
            <div class="videoWrapper">
              <img :src="project.project.image" v-if="project.project.image_or_video=='image' && project.project.image">
              <video :src="project.project.video" v-else-if="project.project.image_or_video='video' && project.project.video" controls></video>
              <img src="../assets/img/canvas/robot-background-4_3.jpg" v-else>
            </div>
          </div>
        </template>

      </div>

      <div class="sticky assign-project frame flex flex-jc-c"><a class="cbtn-primary" @click="assignProject(project)"><span>assign project</span><span>&raquo;</span></a></div>

      <div class="flex flex-jc-sb flex-reverse project-details">

        <div class="flex-col">



          <!-- DETAILS TABLE -->
          <div class="frame p-base">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Project Details</h3>
            <table class="canvas-table">
              <tr v-if="project.project.outdoors || project.project.indoors || project.project.location_type == 'ON'">
                <th scope="row">Spend the time</th>
                <td v-if="project.project.location_type == 'ON'">Online</td>
                <td v-else-if="project.project.outdoors && project.project.indoors">Indoors and Outdoors</td>
                <td v-else-if="project.project.outdoors">Outdoors</td>
                <td v-else>Indoors</td>
              </tr>
              <tr v-if="project.project.topics.length > 0">
                <th scope="row">Topics</th>
                <td>{{topics}}</td>
              </tr>
              <tr v-if="project.project.activities.length > 0">
                <th scope="row">Type of Activity</th>
                <td>{{activities}}</td>
              </tr>
              <tr v-if="project.project.classroom_materials">
                <th scope="row">Classroom materials</th>
                <td><a :href="project.project.classroom_materials">{{ project.project.classroom_materials }}</a></td>
              </tr>
            </table>
          </div>

          <!-- DESCRIPTION -->
          <div class="frame p-base">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Description</h3>
            <vue-markdown :source="project.description || project.project.description"></vue-markdown>
          </div>

          <!-- RESOURCES FOR TEACHERS -->
          <div v-if="project.teacher_resources && project.teacher_resources.length > 0" class="frame p-base">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Additional Resources for Teachers</h3>
            <ul class="standard">
              <li v-for="res in project.teacher_resources" :key="res.url"><a :href="res.url" target="_blank">{{res.label || res.url}}</a></li>
            </ul>
          </div>

          <!-- RESOURCES FOR STUDENTS -->
          <div v-if="project.student_resources && project.student_resources.length > 0" class="frame p-base">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Additional Resources for Students</h3>
            <ul class="standard">
              <li v-for="res in project.student_resources" :key="res.url"><a :href="res.url" target="_blank">{{res.label || res.url}}</a></li>
            </ul>
          </div>

        </div><!-- end .flex-col -->

        <div class="flex-col">

          <!-- TIME REQUIRED -->
          <div class="frame p-base div1">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Time Required</h3>
            <p class="serif fs-b1 color-b">{{project.time_required || project.project.time }}</p>
          </div>

          <!-- MATERIALS NEEDED -->
          <div class="frame p-base div2">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Materials Needed</h3>

            <div class="content-slot" v-html="project.materials"></div>
          </div>

          <!-- IF AFFILIATE WHERE STUDENT HAS TO ENTER DATA -->
          <div v-if="!project.project.form && project.project.type == 'Project'" class="frame p-base message">
            <h3 class="color-p fs-base serif w-700 m-0-0-s4">Note for Educators</h3>
            <p>
              This project’s data entry form is not hosted on
              SciStarter. If you assign this project and select the
              option for students to <strong>log data</strong> on
              their own, they will be asked to create a SciStarter
              account and a project account (both are free and both
              can use the student’s school email address). For
              students ages 12 and under, we recommend the assignment
              option labeled "Students will <strong>submit
              worksheet</strong> to teacher, Teacher will submit data
              to the project (suggested for younger students)." This
              way, students can <em>practice</em> logging data using
              the worksheets we provide and you have the option to log
              their worksheet data onto the project’s website.
            </p>
          </div>

        </div><!-- end .flex-col -->


      </div><!-- end .flex -->

      <div class="frame p-base m-0-basehalf">
        <h3 class="color-p fs-base serif w-700 m-0-0-s4">Student Instructions</h3>
        <el-tabs type="card">
          <el-tab-pane label="Students Submit Worksheet">
            <ol class="instructions">
              <template v-for="(step, idx) in project.steps">
                <li v-if="check_condition(step.condition, satisfies_student_worksheet)" v-html="step.text" :key="idx"></li>
              </template>
            </ol>
          </el-tab-pane>
          <el-tab-pane label="Students Log Data">
            <ol class="instructions">
              <template v-for="(step, idx) in project.steps">
                <li v-if="check_condition(step.condition, satisfies_student_direct)" v-html="step.text" :key="idx"></li>
              </template>
            </ol>
          </el-tab-pane>
        </el-tabs>
      </div>

      <template v-if="project.project.type == 'CustomProject' && project.project.notes">
        <div class="frame p-base m-base-basehalf">
          <h3 class="color-p fs-base serif w-700 m-0-0-base">Notes from the Project Creator</h3>
          <vue-markdown :source="project.project.notes"></vue-markdown>
        </div>
      </template>

      <template v-if="project.project.type == 'CustomProject'">
        <div class="frame p-base m-base-basehalf">
          <h3 class="color-p fs-base serif w-700 m-0-0-base">Project Questions</h3>
          <CustomForm :fields="questions"  />
        </div>
      </template>

      <template v-if="project.project.type == 'Project' && !project.direct_input_only">
        <div class="frame p-base m-base-basehalf">
          <h3 class="color-p fs-base serif w-700 m-0-0-s4">Project Worksheet</h3>
          <p class=" m-0-0-lg">This is the form students will fill out and submit to you, if you choose to have them participate via worksheet.</p>

          <div v-for="(item,i) in worksheet" class="customFormQuestion" :key="'q'+i">
            <h4 class="label" :class="{'heading':item.type=='heading'}">{{item.prompt}}</h4>
            <small v-if="item.extra">{{item.extra}}</small>

            <input v-if="item.type=='short-text'" type="text" disabled />
            <textarea v-else-if="item.type=='long-text'" disabled></textarea>

            <el-radio-group v-else-if="item.type==='true-false'">
              <el-radio :value="true" disabled>Yes</el-radio>
              <el-radio :value="false" disabled>No</el-radio>
            </el-radio-group>

            <el-select v-else-if="item.type==='select-one' && item.options" placeholder="Select One">
              <el-option v-for="o in item.options" :key="o" :value="o" :label="o"></el-option>
            </el-select>
          </div>
        </div>
      </template>

    </div><!-- end #project-details -->

  </template>

</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import CustomForm from '../components/CanvasCustomForm'
export default {
    name: 'ViewProject',
    components: {
        VueMarkdown,
        CustomForm
    },
    props: ['project'],
    data: function(){
        return {
            questions: null,
        }
    },
    methods: {
        check_condition(condition, satisfaction) {
            return ((condition & satisfaction) == condition);
        },

        backToList() {
            this.$emit('clearProject')
        },

        assignProject(e) {
            this.$emit('assign',e)
        },

        scrollToTop() {
            window.scrollTo(0,0);
        },

        createWorksheetOptions() {
            this.worksheet.map(function(d){
                if (d.type==='select-one' && d.extra !== ''){
                    d.options = d.extra.split(',')
                }
                return d;
            })
        }
    },
    computed: {
        worksheet() {
            if (this.project.project.type == 'CustomProject') {
                return this.project.project.json;
            } else {
                return this.project.worksheet ? this.project.worksheet.fields : null;
            }
        },

        satisfies_student_direct() {
            return 0x11;
        },

        satisfies_student_worksheet() {
            return 0x09;
        },

        intro_videos() {
            return this.project.videos.filter(vid => vid.role === 0);
        },

        poster() {
            // return this.intro_videos.find(vid => !!vid.poster).poster || '';
            var matches = this.intro_videos.filter(function(v) { return !!v.poster});
            if(matches.length >= 1) {
                return matches[0].poster;
            }
            else {
                return '';
            }
        },

        topics(){
            let topics = []
            this.project.project.topics.forEach(d => {
                topics.push(d.label)
            });
            return topics.join(', ')
        },

        activities(){
            let act = []
            this.project.project.activities.forEach(d => {
                act.push(d.label)
            })
            return act.join(', ')
        }

    },
    mounted(){
        this.scrollToTop()
        if (this.project.project.type == 'CustomProject') {
            this.questions = this.project.project.json;
        }
        if (this.project.project.type == 'Project') {
            this.createWorksheetOptions()
        }
    }
}
</script>

<style lang="scss">
.content-slot {
    margin: 0px;
    border: 0px;
    padding: 0px;

    ul {
        list-style: disc;
        margin-left: 0;
        padding-left: 1.2rem;
    }
}

.canvas-table td {
    overflow-wrap: anywhere;
}
</style>
