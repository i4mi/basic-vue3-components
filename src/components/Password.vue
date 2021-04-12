<!--
Copyright 2021 Berner Fachhochschule

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<template>
    <div class="passwordContainer">     
      <i class="fas" :class="{ 'fa-eye' : !shown, 'fa-eye-slash' : shown }" @click="toggle()"></i>
      <input :type="type" v-bind="$attrs" v-validate  :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">            
    </div>
</template>

<script>
export default {    
  inheritAttrs: false,
  props : [ 'modelValue' ],
  data: () => ({
     shown : false 
  }),

  computed : {
      type() {
          return this.$data.shown ? "text" : "password";
      }
  },

  methods: {
      toggle() {
          this.$data.shown = !this.$data.shown;
      }
  }
}
</script>

<style scoped>
    .passwordContainer {
        position:relative;
    }
    .passwordContainer i {        
        cursor: pointer;
        position: absolute;
        right: 10px;
        float: right;
        top: 10px;
        color: grey;
    }
</style>