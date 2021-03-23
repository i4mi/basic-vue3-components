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
    <nav class="nav" aria-label="Page navigation" v-if="item.all && item.all.length > item.pagesize" style="margin-top:10px">
        <ul class="pagination mr-auto">
            <li class="page-item" :class="{ disabled : item.current <= 1 }">
                <a class="page-link"  href="javascript:" @click="prev()" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="page in item.pages" :key="page.nr" class="page-item" :class="{ active : item.current == page.nr }"><a class="page-link" @click="setPage(page.nr)" href="javascript:">{{ page.label }}</a></li>

            <li class="page-item" :class="{ disabled : item.current >= item.pageCount }">
                <a class="page-link"  href="javascript:" @click="next()" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        <div v-if="search" class="col-sm-4 col-xs-2 col-lg-3">
            <div class="input-group">
                <input :placeholder="$t(label || 'common.search_btn')" type="text" :value="item.filter[search]" @input="item.filter[search]=$event.target.value" class="form-control py-2 border-right-0 border">

                <span class="input-group-append">
                    <div class="input-group-text bg-transparent"><i class="fa fa-search"></i></div>
                </span>
            </div>
        </div>

    </nav>
</template>

<script>

export default {
  props: ['modelValue', 'search', 'label' ],
  emits: ['update:modelValue'],
  data: () => ({
     item : null 
  }),

  methods : {
      setPage(key) {
        this.$data.item.current = key;
      },

      next() {
          this.$data.item.current++;
      },
      prev() {
          this.$data.item.current--;
      }
  },

  created() {
      this.$data.item = this.modelValue;
  }
}
</script>

