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
   <div class="form-group form-row" :class="{ 'has-feedback': path }">
          <label :for="name" class="col-lg-4 col-form-label midata-label">{{ $t(label) }}</label>
          <div class="col-lg-8"><slot></slot>            
            <div class="invalid-feedback" v-if="path">{{ $t(path) }}</div>
            <small class="form-text text-muted" v-if="help">{{ help }}</small>
          </div>
    </div>
</template>
<script>
export default {
  name: 'FormGroup',
  props: {
    name: String,
    label: String,
    help: String,
    path: String
  }
}
</script>
