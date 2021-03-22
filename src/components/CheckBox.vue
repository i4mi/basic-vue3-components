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
  <div class="form-check">
    <input class="form-check-input" type="checkbox" :id="name" :name="name" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)" v-validate v-bind="$attrs">
    <label class="form-check-label" :for="name">
      <slot></slot>
    </label>
    <div class="invalid-feedback" v-if="path">{{ $t(path) }}</div>
  </div>
</template>

<script>
export default {    
  inheritAttrs: false,
  props: ['name', 'modelValue', 'path']
}
</script>