<template>
  <div class="canvas-custom-form frame width-80 p-base m-center">

    <div class="customFormQuestion" v-for="(item,i) in fields" :key="'q' + i">
        <p class="label">{{item.prompt}}</p>

        <!-- ******* RADIOS ************ -->
        <div v-if="item.fieldType==='radio'">
          <el-radio-group>
            <el-radio v-for="o in item.options" :label="o" :key="o + i">{{o}}</el-radio>
          </el-radio-group>
        </div>

        <!-- ******* CHECKBOXES ************ -->
        <!-- I don't understand why element checkboxes aren't working here -->
        <div v-else-if="item.fieldType === 'checkbox'">
            <label class="d-block" v-for="c in item.options" :key="c"><input type="checkbox" /> {{c}}</label>
        </div>

        <!-- ******* TEXTFIELDS ************ -->
        <div v-else-if="item.fieldType === 'textField'">
          <input type="text" :placeholder="item.placeholder" />
        </div>

        <!-- ******* TEXTAREA ************ -->
        <div v-else-if="item.fieldType === 'p' || item.fieldType === 'paragraphField'">
          <textarea></textarea>
        </div>

        <!-- ******* Date ************ -->
        <div v-else-if="item.fieldType === 'date'">
          <p>Student will enter a date.</p>
        </div>

        <!-- ******* Number ************ -->
        <div v-else-if="item.fieldType === 'date'">
          <p>Student will enter a number.</p>
        </div>

        <!-- ******* ADD PHOTO ************ -->
        <div v-else-if="item.fieldType === 'file'">
          <p>Student will upload photo.</p>
        </div>



    </div>

  </div>
</template>

<script>
export default {
  name: 'CustomForm',
  props: ['fields'],
  data: function(){
    return {
    }
  },
  mounted(){

  }

}
</script>

<style lang="scss">
@import '../assets/css/CanvasVariables.scss';
@import '../assets/css/CanvasCustomForm.scss';
</style>
