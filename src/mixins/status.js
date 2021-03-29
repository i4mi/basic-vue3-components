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
export default {
    data : ()=>({
        error : null,
        errors : { _custom : [] },
        loading : 0,
        isBusy : true,
        action : null,  
        finished : null      
    }),

    methods : {
        loadStart() { 
            this.$data.loading++; this.$data.isBusy = true; if (this.$data.loading==1) this.$data.error = null; 
        },
        loadEnd() { 
            this.$data.loading--; 
            if (this.$data.loading<=0) { 
                this.$data.isBusy = false; 
                this.$data.finished = this.$data.action;
                this.$data.action=null; 
            } 
        },
        ready() {
            this.loadEnd();
        },
        loadStartAction(action) { 
            this.$data.loading++; this.$data.action = action; if (this.$data.loading==1) {
                this.$data.error = null; 
                this.$data.finished = null;
            }
        },
        loadFailure(msg, noerror) { 
               
               if (msg.response) msg = msg.response;
               this.$data.loading--; 
               if (!noerror) {
                   if (msg && msg.data) {
                       if (msg.data.issue && msg.data.issue.length) this.$data.error = msg.data.issue[0].diagnostics;
                       else this.$data.error = msg.data.code || msg.data; 
                   } else this.$data.error = msg;
               }
               if (this.$data.loading<=0) { this.$data.isBusy = false;this.$data.action=null; }			   
        },
        doBusy(call) {
            var me = this;
               me.loadStart();		 
               return call.then(function(result) { me.loadEnd();return result; }, function(err) { me.loadFailure(err);return Promise.reject(err); });		     
        },
        doAction(action, call) {
            var me = this;
            if (this.$refs.myform) this.$refs.myform.classList.remove("was-validated");
               me.loadStartAction(action);
               return call.then(function(result) { me.loadEnd();return result; }, function(err) { 		 
                let response = err.response || err;
                
                   if (response.data && response.data.field && me.$refs.myform) {		   			
                    me.setError(response.data.field, response.data.code)                       
                    me.loadFailure(response, true);		   			
                   } else {                       
                    me.loadFailure(response);
                }
                   
                   return Promise.reject(err); 
            });		     
        },
        doSilent(call) {			
            const { $data } = this, me = this;	
            $data.finished = null;
            return call.then(function(result) { return result; }, function(err) { me.loadFailure(err);return Promise.reject(err); });
        },
        load(action, call) {
            if (call) return this.doAction(action, call); else return this.doBusy(action);
        },
        setError(field, msg) {
            const { $data } = this;	
            $data.finished = null;
            let myform = this.$refs.myform;
            if (myform) {
                myform.classList.remove("was-validated");
            
                let elem = myform[field];		
                if (elem) {
                    elem.classList.add("is-invalid");
                    $data.errors[field] = msg;
                    $data.errors._custom.push(field);
                } else $data.error = msg;
            } else $data.error = msg;
            
        }
    }

};