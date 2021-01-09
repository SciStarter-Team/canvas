<template>
<div id="canvas-create-project" class="p-base">

  <ol class="canvas-stepper" ref="stepper">
    <li :class="{active: formPart==1}"><span>1</span>Start Your Project</li>
    <li class="fs-b1">/</li>
    <li :class="{active: formPart==2}"><span>2</span>Project Settings</li>
    <li class="fs-b1">/</li>
    <li :class="{active: formPart==3}"><span>3</span>Student Questions</li>
  </ol>

  <div class="ccp-form-wrapper" :style="{'height':formWrapperHeight}">

    <div id="ccp-1" class="canvas-create-project" :class="{active: formPart==1, past:formPart == 2 || formPart == 3}" ref="ccp_1">
      <div class="ccp-form-pad">


        <div class="ccp-form">
          <div class="ccp-form-unit">
            <label class="label">Project Name <span class="required">*</span></label>
            <input type="text" v-model="project.name" />
          </div>
          <div class="ccp-form-unit">
            <label class="label">Short Description <span class="required">*</span></label>
            <textarea v-model="project.question" maxlength="64"></textarea>
            <small>Briefly describe your project. Limit 64 characters.</small>
          </div>
          <div class="ccp-form-unit">
            <h3 class="label">Use an image or video to represent project?</h3>
            <el-radio-group v-model="project.image_or_video" @change="calculateFormWrapperHeight">
              <el-radio :label="'image'">Image</el-radio>
              <el-radio :label="'video'">Video</el-radio>
            </el-radio-group>
          </div>

          <div v-if="project.image_or_video == 'image'" class="ccp-form-unit">
            <h3 class="color-g w-700 fs-base m-0-0-s4">Upload your image</h3>
            <el-upload
              with-credentials
              action="/core/upload"
              :on-success="resp => { project.image = resp.url; calculateFormWrapperHeight(); }"
              :file-list="fileList">
              <el-button size="small" type="primary">Click to upload</el-button>
            </el-upload>
          </div>

          <div v-if="project.image_or_video == 'video'" class="ccp-form-unit">
            <h3 class="color-g w-700 fs-base m-0-0-s4">Your video URL</h3>
            <input type="text" v-model="project.video" />
            <small>Upload to YouTube, Vimeo, or similar service. Be sure the link starts with http:// or https://.</small>
          </div>

          <div v-if="errors[0].length > 0" class="c-error">
            <ul class="standard">
              <li v-for="(item,i) in errors[0]" :key="'e1-' + i">{{item}}</li>
            </ul>
          </div>
          <div class="ccp-form-btns flex flex-jc-sb">
            <a @click="cancelProject">cancel</a>
            <div>
              <!-- <a class="m-0-base">&laquo; back a step</a> -->
              <a @click="saveAndContinue(1)" class="cbtn-primary">save &amp; continue <span>&raquo;</span></a>
            </div>
          </div>
        </div>
      </div><!-- end .ccp-form -->

    </div><!-- #ccp-1 -->

    <div id="ccp-2" class="canvas-create-project" :class="{active: formPart==2, past:formPart == 3}"  ref="ccp_2">
      <div class="flex flex-jc-sb">
        <h2 class="color-b fs-b2 serif m-0-0-base">Required Information</h2>
        <span class="required">* required</span>
      </div>

      <div class="flex flex-jc-sb width-100">
        <div class="ccp-form-unit width-50">
          <label class="label">Start Date <span class="required">*</span></label>
          <el-date-picker v-model="project.start_date" type="datetime" value-format="timestamp" placeholder="Select date and time"></el-date-picker>
        </div>
        <div class="ccp-form-unit width-50">
          <label class="label">End Date <span class="required">*</span></label>
          <el-date-picker v-model="project.end_date" type="datetime" value-format="timestamp" placeholder="Select date and time"></el-date-picker>
        </div>
        <div class="ccp-form-unit">
          <label class="label">Time Required <span class="required">*</span></label>
          <input type="text" v-model="project.time" maxlength="50" placeholder="e.g. 30 minutes, not including setup" />
          <small>Limit 50 characters</small>
        </div>
      </div>
      <div class="ccp-form-unit">
        <label class="label">Materials Needed <span class="required">*</span></label>
        <textarea v-model="project.materials" placeholder="Enter materials one on each line, separated by two returns"></textarea>
        <small>Enter materials one on each line, separated by two returns</small>
      </div>
      <div class="ccp-form-unit">
        <label class="label">Detailed Description <span class="required">*</span></label>
        <textarea v-model="project.description" placeholder="This is the project description your students will read. To start a new paragraph, hit return twice."></textarea>
        <small>This is the project description your students will read. To start a new paragraph, hit return twice.</small>
      </div>

      <div class="separator"></div>

      <h2 class="color-b fs-b2 serif m-0-0-base">Additional Information</h2>

      <div class="ccp-form-unit">
        <label class="label">Steps</label>
        <textarea v-model="project.steps" placeholder="These are the steps your student will take to do the project. Use one step per line, hitting return twice between steps."></textarea>
        <small>These are the steps your student will take to do the project. Use one step per line, hitting return twice between steps.</small>
      </div>

      <div class="ccp-form-unit">
        <label class="label">Notes for Educators</label>
        <textarea v-model="project.notes" placeholder="Add notes for fellow educators for when you share this project."></textarea>
        <small>Add notes for fellow educators for when you share this project.</small>
      </div>

      <div class="ccp-form-unit">
        <label class="label">Upload Document</label>
        <el-upload
          with-credentials
          action="/core/upload"
          :on-success="resp => {project.document = resp.url; calculateFormWrapperHeight(); }"
          :file-list="fileList">
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
      </div>

      <div class="ccp-form-unit">
        <label class="label">Location Type</label>
        <el-select v-model="project.location_type" placeholder="Select a location type">
          <el-option v-for="item in location_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="ccp-form-unit">
        <label class="label">This project can be done...</label>
        <el-radio-group v-model="project.indoor_outdoor" class="">
          <el-radio :label="1">Indoors</el-radio>
          <el-radio :label="2">Outdoors</el-radio>
          <el-radio :label="3">Both</el-radio>
        </el-radio-group>
      </div>

      <div class="ccp-form-unit">
        <label class="label">Topics</label>
        <el-select v-model="project.topics" multiple placeholder="Select a topic">
          <el-option v-for="item in topics.choices" :key="'topic' + item[0]" :label="item[1]" :value="item[0]">
          </el-option>
        </el-select>
      </div>

      <div class="ccp-form-unit">
        <label class="label">Activities</label>
        <el-select v-model="project.activities" multiple placeholder="Select a topic">
          <el-option v-for="item in activities.choices" :key="'topic' + item[0]" :label="item[1]" :value="item[0]">
          </el-option>
        </el-select>
      </div>

      <div class="ccp-form-unit">
        <label class="label">Classroom Materials URL</label>
        <input type="text" v-model="project.classroom_materials" placeholder="e.g., https://www.myproject.net/classroom-materials" />
        <small>If you're linking to a site other than scistarter.org, please use a complete URL starting with http:// or https://</small>
      </div>

      <div v-if="errors[1].length > 0" class="c-error">
        <ul class="standard">
          <li v-for="(item,i) in errors[1]" :key="'e1-' + i">{{item}}</li>
        </ul>
      </div>

      <div class="ccp-form-btns flex flex-jc-sb m-lg-0-0">
        <div>
          <a @click="cancelProject">cancel</a>
        </div>
        <div>
          <a class="m-0-base" @click="decrementFormPart">&laquo; back a step</a>
          <a @click="saveAndContinue(2)" class="cbtn-primary">save &amp; continue <span>&raquo;</span></a>
        </div>
      </div>


    </div><!-- #ccp-2 -->

    <div id="ccp-3" class="canvas-create-project" :class="{active: formPart==3}" ref="ccp_3">
      <h2 class="color-b fs-b2 serif m-0-0-base">Add Questions for your Students</h2>


      <div class="builder-module" v-for="(builderModule, index) in project.fields" :ref="'builder-module-' + index" :key="'builder-module-' + index">

        <div v-for="(field,i) in builderModule.inputFields" :key="'field'+i" class="ccp-form-unit">

          <div class="flex flex-jc-sb">
            <div>

              <label class="label">{{ field.label }}</label>

              <!-- TEXT -->
              <input type="text" :placeholder="field.placeholder" v-model="builderModule[field.model]" v-if="field.type === 'text'" :ref="'builder-module-' + index + 'input' " class="full-width">

              <!-- TEXTAREA -->
              <textarea  v-model="builderModule[field.model]" v-if="field.type === 'textarea'" :placeholder="field.placeholder" :ref="'builder-module-' + index + 'input' " class="full-width"></textarea>

              <!-- NUMBER -->
              <input type="number" :placeholder="field.placeholder" v-model="field.value" v-if="field.type === 'number'" @input="field.value = updateOptions(field.value, builderModule)" :ref="'builder-module-' + index + 'input' " class="full-width">

              <!-- OPTIONS -->
              <template v-if="field.type === 'options'">
                <input type="text" v-model="builderModule.options[option]"  v-for="option in field.options" :key="option" class="option" :ref="'builder-module-' + index + 'input' ">
              </template>

              <!-- FILE UPLOAD -->
              <template v-if="field.type === 'file'">
                <!--IMAGE-->
                <img style="max-width: 300px; max-height: 200px" v-if="!!project.fields[index].url && project.fields[index].name == 'addPhoto'" :src="project.fields[index].url">
                <!--VIDEO-->
                <video style="max-width: 300px; max-height: 200px" v-if="!!project.fields[index].url && project.fields[index].name == 'addVideo'" :src="project.fields[index].url"></video>
                <!--FILE-->

                <p v-if="!!project.fields[index].url && project.fields[index].name == 'addFile'">File = <a :href="project.fields[index].url">{{project.fields[index].url}}</a></p>
                <ss-fileupload @url="saved_media(index, $event)" :ref="'builder-module-' + index + 'input'"></ss-fileupload>
              </template>

              <!-- SECTION BREAK -->
              <div class="section-break" v-if="field.type === 'break'" >
                <hr>
              </div>
              <!--red error message-->
              <!--
                  <div class="error" v-if="field.required && builderIsValid === false">
                    This field is required.
                  </div>
                  -->
            </div>
            <div><a @click="deleteModule(index)" class="b-small">remove</a></div>
          </div>
        </div><!-- .ccp-form-unit -->

      </div><!--d-->


      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Add a question<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><a @click="addModule('trueFalse')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Answer True or False</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('yesNo')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Answer Yes or No</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('textField')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Answer with short text</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('dateField')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Answer with a date</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('paragraphField')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Answer with longer text</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('number')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Answer with a number</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('selectOne')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Multiple choice (choose only one)</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('selectMany')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Multiple choice (choose more than one)</a></el-dropdown-item>
          <el-dropdown-item><a @click="addModule('uploadPhoto')" class="primary-bg-light-hover primary-color-hover"><i class="el-icon-plus"></i> Upload a photo</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="ccp-form-btns flex flex-jc-sb m-lg-0-0">
        <div>
          <a @click="cancelProject">cancel</a>
        </div>
        <div>
          <a class="m-0-base" @click="decrementFormPart">&laquo; back a step</a>
          <a @click="finish" class="cbtn-primary">finish<span>&raquo;</span></a>
        </div>
      </div>


    </div><!-- #ccp-3 -->

  </div><!-- end .ccp-form-wrapper -->

</div>
</template>

<script>
// ******** REMOVE FOR PROD
import store from '../store.js'
//******************************
import builderModuleJSON from '../builderModule.js'
export default {
    name: 'CreateProjectForm',
    props: ['user','organization','edit'],
    data: function(){
        return {
            editMode: false,
            fileList: [],
            formPart: 1,
            formWrapperHeight: '8000px',
            builderModule: builderModuleJSON.builderModule,
            modules: builderModuleJSON.modules,
            project: {
                name: null,
                question: null,
                description: null,
                thanks: null,
                image_or_video: null,
                image: null,
                video: null,
                document: null,
                document_label: null,
                start_date: null,
                end_date: null,
                time: null,
                materials: null,
                steps: null,
                location_type: null,
                indoor_outdoor: null,
                topics:[],
                activities:[],
                classroom_materials:null,
                fields:[],
                notes: null,
                publish: false
            },
            topics: store.broward.custom[0].project._metadata.topics,
            activities: store.broward.custom[0].project._metadata.activities,
            location_options: [
                {label: 'Anywhere you have internet access','value':'ON'},
                {label: 'You need a specific environment or location','value':'OFF'}
            ],
            errors:[ [],[],[] ]
        }
    },
    computed: {
        xcsrftoken() {
            return JSON.parse(document.getElementById('data-xcsrf-token').textContent);
        }
    },
    methods: {
        scrollToTop(){
            window.scrollTo(0,0)
        },
        saveAndContinue(i){
            let ctx = this
            let noErrors = this.checkForm(i)
            if (noErrors) {
                this.$refs.stepper.scrollIntoView()
                this.incrementFormPart()
            }
            let calc = function(){
                ctx.calculateFormWrapperHeight();
            }
            setTimeout(()=> calc(), 50)
        },
        incrementFormPart(){
            this.formPart = this.formPart + 1;
        },
        decrementFormPart(){
            this.formPart = this.formPart - 1;
            this.calculateFormWrapperHeight()
        },
        calculateFormWrapperHeight(){
            this.formWrapperHeight = this.$refs['ccp_'+this.formPart].clientHeight + 'px';
        },
        cancelProject(){
            let c = confirm('Press OK to cancel project creation.')
            if (c) {
                this.$emit('cancel')
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
        },
        beforeRemove(file) {
            return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
        },
        checkFormPart1(){
            this.errors[0].splice(0,this.errors[0].length)
            if (!this.project.name) {this.errors[0].push('Project name is required')}
            if (!this.project.question) {this.errors[0].push('A short description is required')}
        },
        checkFormPart2(){
            this.errors[1].splice(0,this.errors[1].length)
            if (!this.project.start_date) {this.errors[1].push('A start date is required')}
            if (!this.project.end_date) {this.errors[1].push('An end date is required')}
            if (!this.project.time) {this.errors[1].push('Time Required is required')}
            if (!this.project.materials) {this.errors[1].push('Materials is required')}
            if (!this.project.description) {this.errors[1].push('A description is required')}
        },
        checkForm(i){
            let ctx = this;
            if (i === 1) {
                ctx.checkFormPart1()
                if (ctx.errors[0].length > 0) {
                    return false;
                }
            }
            if (i === 2) {
                ctx.checkFormPart2()
                if (ctx.errors[1].length > 0) {
                    return false;
                }
            }
            if (i === 3) {
                ctx.checkFormPart1()
                if (ctx.errors[2] > 0) {
                    return false;
                }
            }
            return true;
        },
        addModule: function(type) {
            var field = this.cloneObject(this.modules[type]);
            this.project.fields.push(field);
            var index = this.project.fields.length - 1;
            var ctx = this;
            setTimeout(function() {
                var targetWrap = ctx.$refs['builder-module-' + index][0]
                var targetInput = ctx.$refs['builder-module-' + index + 'input' ] ? ctx.$refs['builder-module-' + index + 'input' ][0] : null
                targetWrap.scrollIntoView({behavior: 'smooth', block: 'end'});
                if (targetInput) { targetInput.focus(); }
            }, 50)
            let calc = function(){
                ctx.calculateFormWrapperHeight();
            }
            setTimeout(()=> calc(), 100)
        },

        duplicateModule: function(index) {
            var duplicate = this.cloneObject(this.project.fields[index]);
            this.project.fields.splice(index, 0, duplicate)
        },

        deleteModule: function(index) {
            this.project.fields.splice(index, 1);
        },

        editModule: function(index) {
            this.step = 'builder';
            this.scrollToAndFocus(index);
        },
        cloneObject: function(obj) {
            // IE11 compatible deep copying (can't use Object.assign)
            return JSON.parse(JSON.stringify(obj))
        },
        finish() {
            var ctx = this;

            fetch(this.user.save_custom, {
                method: "POST",
                credentials: "include",
                headers: {"X-XCSRFToken": this.xcsrftoken},
                body: JSON.stringify(this.project)
            }).then(resp => resp.json()).then(function(data) {
                if(data.error) {
                    alert(data.error);
                }
                else {
                    ctx.$emit('projectCreated',this.project.name);
                    ctx.$emit('project-added', data);
                }
            });
        }
  },
  mounted(){
    let ctx = this
    if (this.edit) {
      this.editMode = true
      this.project = this.edit
    }
    let calc = function(){
      ctx.calculateFormWrapperHeight();
    }
    setTimeout(()=> calc(), 100)
  }
}
</script>

<style lang="scss">

</style>
