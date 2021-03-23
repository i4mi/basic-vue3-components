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
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="id+'Label'" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" v-if="open">
                <div class="modal-header">
                    <h5 class="modal-title" :id="id+'Label'">{{ title }}</h5>
                    <button type="button" class="close" @click="close()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div :class="{ 'modal-body' : !fullWidth }">
                    <slot></slot>
                </div>
                <div class="modal-footer" v-if="$slots.footer"><slot name="footer"></slot></div>                
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";

export default {
    name : "modal",
    props : {
        id : String,
        title : String,
        open : {
            type: Boolean,
            default: true
        },
        fullWidth : {
            type: Boolean,
            default: false
        }
    },
    emits : ["close"],

    watch : {
        open() {            
            if (this.open) {
                console.log("SHOW");
              $('#'+this.id).modal('show');
            } else {
                console.log("HIDE");
              $('#'+this.id).modal('hide');
            }
        }
    },
    
    methods : {
        close() {
            this.$emit("close");
        }
    },

    mounted() {
        if (this.open) $('#'+this.id).modal('show');
    }

}
</script>