<template>
<div class="canvas-assign-project p-base width-100">
  <template v-if="confirmed">
    <p class="color-o tt-u w-700 fs-s1 m-0-0-s3">External Assignment Created</p>
    <h1 class="color-p fs-b4 serif w-700 m-0-0-s2">{{ !!item.name_override ? item.name_override : item.project.name }} Successfully Assigned!</h1>
    <p>Click on the X on the top right to return to your Canvas assignment page.</p>
    <div class="separator"></div>
    <div class="flex flex-jc-sb flex-ai-c m-lg-0-0">
      <a @click="cancelAssignment">Cancel Assignment <span>&raquo;</span></a>
    </div>
  </template>
  <template v-else>
    <p class="color-o tt-u w-700 fs-s1 m-0-0-s3">Project Selected</p>
    <h1 class="color-p fs-b4 serif w-700">{{ !!item.name_override ? item.name_override : item.project.name }}</h1>
    <div class="separator"></div>

    <div class="flex flex-jc-sb flex-ai-b m-0-0-base">
      <h2 class="color-b fs-b2 serif">Assignment Settings</h2>
      <span class="color-o w-400">* required</span>
    </div>

    <div v-if="showError" class="c-error">You must select who will enter data into the project</div>
    <template v-if="!item.direct_input_only">
      <h3 class="color-g w-700 fs-base m-0-0-s4">Data Entry Options (select one) <span class="required">*</span></h3>
      <div ref="radios">
        <div class="radio flex m-0-0-s4">
          <input type="radio" v-model="whoSubmits" value="teacher" id="teacher" />
          <label class="fs-base" for="teacher">Students will <strong>submit worksheets</strong> to their teacher; The teacher will log data to the project.</label>
        </div>
        <div class="radio flex m-0-0-s4">
          <input type="radio" v-model="whoSubmits" value="delegated" id="delegated" />
          <label class="fs-base" for="student">Students will <strong>log data</strong> directly to the project, using a project account created by the teacher.</label>
        </div>
        <div v-if="organization.students_own_accounts" class="radio flex m-0-0-s4">
          <input type="radio" v-model="whoSubmits" value="student" id="student" />
          <label class="fs-base" for="student">Students will <strong>log data</strong> directly to the project using their own accounts (suggested for high school or older students)</label>
        </div>
      </div>
    </template>

    <div v-if="whoSubmits=='student'" class="m-b4-0">
      <h3 class="color-g w-700 fs-base m-0-0-s4">Number of Contributions Per Student <span class="required">*</span></h3>
      <label>How many times must the student do the project to complete the assignment?</label>
      <input type="number" min="1" v-model="contributions" />
    </div>
    <template v-else-if="whoSubmits=='delegated'">
      <div class="m-b4-0">
        <h3 class="color-g w-700 fs-base m-0-0-s4">Project account <span class="required">*</span></h3>
        <p>
          Use your school email address
          (<strong>{{user.email}}</strong>) when you create the
          account with the project.
        </p>
        <p>
          The login name and password will be shared with your
          students, allowing them to log data, so <strong>do not use
          your school password</strong>. Instead, choose a new one.
        </p>
        <p>
          We recommend <a :href="item.project.url" target="_blank">
          creating the project account</a> first, and then filling in
          the login name and password you chose for the project here.
          If you do it in the other order, don't forget to copy the
          password you enter here, so you can be sure to enter it
          exactly the same way when you create the project account.
        </p>
        <label>Login name you and your students will use for the project</label><br>
        <input type="text" v-model="project_username"><br>
        <label>Password you and your students will use for the project</label><br>
        <input type="text" v-model="project_password" placeholder="NOT your school password"><br>
        <a style="size: 10pt" @click="project_password=Math.random().toString(36).slice(-10)">recommend a password</a>
      </div>
      <div class="m-b4-0">
        <h3 class="color-g w-700 fs-base m-0-0-s4">Number of Contributions <span class="required">*</span></h3>
        <label>How many times must the students collectively do the project to complete the assignment?</label>
        <input type="number" min="1" v-model="contributions" />
      </div>
    </template>

    <div class="flex flex-jc-sb flex-ai-c m-lg-0-0">
      <a @click="cancel" class="cbtn-txt-secondary">cancel selection</a>
      <a @click="assign(item)" class="cbtn-primary"><i ref="assign_spinner"></i>To assign this project, click here and then click <em>Select</em> on the next screen <span>&raquo;</span></a>
    </div>

    <form ref="return_form" method="post" :action="return_url">
      <input ref="return_jwt" type="hidden" name="JWT" value="">
    </form>
  </template>
</div>
</template>

<script>
export default {
    name: 'AssignProject',
    props: ['item', 'organization', 'user'],
    data: function(){
        return {
            whoSubmits: null,
            contributions: 1,
            confirmed: false,
            showError: false,
            project_username: this.user.email,
            project_password: ''
        }
    },
    computed: {
        assign_url() {
            return JSON.parse(document.getElementById('data-assign-url').textContent) + this.item.slug;
        },

        assign_custom_url() {
            return JSON.parse(document.getElementById('data-assign-custom-url').textContent) + this.item.id;
        },

        return_url() {
            return JSON.parse(document.getElementById('data-return-url').textContent);
        },

        xcsrftoken() {
            return JSON.parse(document.getElementById('data-xcsrf-token').textContent);
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        },

        assign(e) {
            if (!this.whoSubmits){
                this.showError = true
            } else {
                this.assignProject(e)
            }

        },

        assignProject() {
            this.$refs.assign_spinner.classList.add("spinner-border", "spinner-border-sm");

            let mode_map = {"student": "direct", "teacher": "worksheet", "delegated": "delegated"};
            let body = new FormData();
            body.append('input_mode', mode_map[this.whoSubmits]);
            body.append('required', '' + this.contributions);
            body.append('project_username', this.project_username);
            body.append('project_password', this.project_password);

            fetch(this.item.project.type === 'CustomProject' ? this.assign_custom_url : this.assign_url, {
                method: "POST",
                credentials: "include",
                headers: {"X-XCSRFToken": this.xcsrftoken},
                body:  body
            }).then(response => response.text()).then(jwt => {
                this.$refs.return_jwt.value = jwt;
                this.$refs.return_form.submit();
            });
            // this.$refs.assign_spinner.classList.remove("spinner-border", "spinner-border-sm");
            // this.confirmed = true;
        },
        cancelAssignment(){
            let c = confirm("The project will be cancelled. Press OK to remove this project.")
            if (c) {
                // do all the logic to cancel assignment
                this.$emit('cancel')
                this.confirmed = false;
            }
        }
    }
}
</script>

<style lang="scss">
.cbtn-primary > i {
    vertical-align: middle;
}
strong {
    font-size: large;
}
</style>
