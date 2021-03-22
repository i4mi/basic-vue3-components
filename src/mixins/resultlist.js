/*
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
*/
import _ from "lodash";
import { computed, reactive } from "vue";
import Sorter from "/src/components/Sorter.vue"
import Restrict from "/src/components/Filter.vue"
import Pagination from "/src/components/Pagination.vue"

export default {

    components : { Sorter, Restrict, Pagination },
    
    methods : {
        process(result, options) {
            options = options || {};
            let h = Math.floor(document.documentElement.clientHeight / 44)-6;
            if (h<5) h=5;
            if (h>20) h=20;          
            let input = reactive({ 
                load:options.load,
                all:result,                 
                sort:options.sort, 
                filter:options.filter,
                total:0,
                pagesize:options.pagesize || h,
                pages:[],
                pageCount : 1,
                current:1,
                promise:computed(() => this.fetch(input)),
                filtered:computed(() => this.calc(input))
            });                     
            return input;
        },

        fetch(input) {            
            if (input.load) {
                return input.load(input).then((result) => { input.all = result; } );
            } 
            return null;
        },

        calc(input) {
            let process = input.all;

            if (input.filter) {
                for (let key in input.filter) {                    
                    let v = input.filter[key];
                    if (typeof v === 'function') {
                        process = _.filter(process, v);
                    } else if (v && v!="") {
                        let filterMethod = (t) => (t[key] && t[key].indexOf(v)>=0);
                        process = _.filter(process, filterMethod);
                    }
                }                
            }

            if (input.sort) {
                let field = input.sort;
                let direction = "asc";        
                if (field.startsWith("-")) { field = field.substr(1); direction = "desc"; }
                process = _.orderBy(process, [ field ], [ direction ]);  
            }

            input.total = process.length;

            if (input.pagesize && input.total > input.pagesize) {
                let pages = [];
                let pageCount = Math.floor((input.total-1) / input.pagesize)+1;
                if (pageCount < 10) {
                    for (let i=1;i<=pageCount;i++) pages.push({ nr:i, label:i });
                } else if (input.current < 6) {                
                    for (let i=1;i<=6;i++) pages.push({ nr:i, label:i });
                    pages.push({ nr : 7, label : '...' });
                    pages.push({ nr : pageCount-1, label : pageCount-1 });
                    pages.push({ nr : pageCount, label : pageCount });
                } else {
                    for (let i=1;i<=3;i++) pages.push({ nr:i, label:i });
                    pages.push({ nr : 4, label : "..."});
                    pages.push({ nr:input.current-1, label:input.current-1 });
                    pages.push({ nr:input.current, label:input.current });
                    if (input.current < pageCount) pages.push({ nr:input.current+1, label:input.current+1 });
                    if (input.current < pageCount-2) pages.push({ nr : pageCount-1, label : "..."});
                    if (input.current < pageCount-1) pages.push({ nr : pageCount, label : pageCount});                  
                }
                input.pages = pages;
                if (input.current > pageCount) input.current = 1;
                let end = input.current * input.pagesize;
                if (end > input.total) end = input.total+1;
                process = _.slice(process, (input.current-1) * input.pagesize, end);
                input.pageCount = pageCount;
            } else {
                input.pages = 0;
                input.current = 1;                
            }
            
            console.log(process);
            return process;
        }
    }
}