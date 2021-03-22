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
   <th @click="setSort(sortby)" class="clickable sort" :class="{ 'asc': modelValue.sort==sortby , 'desc':modelValue.sort=='-'+sortby }"><slot/></th>
</template>
<style>
tr .sort::after {
  content: " ";
  position:relative;
  display:inline-block;
  padding-left:5px;
  width:20px;
}

tr .desc::after {
  content: "▾";
  font-family: Arial, sans-serif;
}

tr .asc::after {
  content: "▴";
  font-family: Arial, sans-serif;
} 
</style>
<script>
import _ from "lodash";

export default {
  props: ['sortby', 'modelValue' ],
  emits: ['update:modelValue'],
  data: () => ({
     item : null 
  }),

  methods : {
      setSort(key) {
        if (this.$data.item.sort==key) { this.$data.item.sort = "-"+key; }
        else { this.$data.item.sort = key; }
      },

      sort(what,key) {
          let field = key;
          let direction = "asc";
          if (key.startsWith("-")) { field = key.substr(1); direction = "desc"; }
          let result = _.orderBy(what, [ field ], [ direction ]);
          return result;
      }
  },

  created() {
      this.$data.item = this.modelValue;
  }
}
</script>