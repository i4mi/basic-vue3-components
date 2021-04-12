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
import CheckBox from "./components/CheckBox.vue";
import ErrorBox from "./components/ErrorBox.vue";
import Filter from "./components/Filter.vue";
import FormGroup from "./components/FormGroup.vue";
import Modal from "./components/Modal.vue";
import Pagination from "./components/Pagination.vue";
import RadioBox from "./components/RadioBox.vue";
import Sorter from "./components/Sorter.vue";
import Success from "./components/Success.vue";
import Password from "./components/Password.vue";

import rl from "./mixins/resultlist.js";
import status from "./mixins/status.js";

import Filters from "./filters.js";

export { CheckBox, ErrorBox, Filter, FormGroup, Modal, Pagination, RadioBox, Sorter, Success, rl, status, Filters, Password }
export default {
    install: (app, options) => {
        app.directive('validate', {
            mounted(el, binding) {       
              el.addEventListener('input', (e) => {
                let vm = binding.instance; 
                let elm = e.target;        
                while (!vm.errors && vm.$parent) { 
                  vm = vm.$parent;         
                }      
                if (binding.value) {
                  elm.setCustomValidity(binding.value.call(binding.instance, elm.value));
                }
                vm.finished = null;
                if (vm.errors[elm.name]) {
                  vm.errors = Object.assign({}, vm.errors, {
                    [elm.name]: e.target.validationMessage
                  });
                }      
              });
              el.addEventListener('invalid', (e) => {
                let vm = binding.instance;              
                let elm = e.target;   
                while (!vm.errors && vm.$parent) {
                   vm = vm.$parent;       
                }      
                vm.errors = Object.assign({}, vm.errors, {
                  [elm.name]: e.target.validationMessage
                });
               
              });
            },
          });
          
          app.directive('submit', {
            mounted(el2, binding) {   
              let el = el2.form;
              el2.addEventListener('click', (e) => {
                         
                  if (!el.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();        
                  }
          
                  const vm = binding.instance;
                  vm.error = null;
                  for (let field of vm.errors._custom) {
                    el[field].classList.remove("is-invalid");
                  }
                  vm.errors = Object.assign({}, vm.errors, {
                    "_custom": []
                  });
          
                  el.classList.add('was-validated')
                }, true);
              
            }
          });
    }
}