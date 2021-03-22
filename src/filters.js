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
    date(dat) {
        if (!dat) return "";
        if (typeof dat == "number" || typeof dat == "string") dat = new Date(dat);
        if (dat.getDay) return dat.toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' });//getDate()+"."+(1+dat.getMonth())+"."+dat.getFullYear();
        return dat;
    },

    dateTime(dat) {
        if (!dat) return "";
        if (typeof dat == "number" || typeof dat == "string") dat = new Date(dat);
        if (dat.getDay) return dat.toLocaleString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit', hour:"2-digit", minute:"2-digit", seconds:"2-digit" }); //dat.getDate()+"."+(1+dat.getMonth())+"."+dat.getFullYear();
        return dat;
    },

    usDate(dat) {
        if (!dat) return "";
        if (typeof dat == "number" || typeof dat == "string") dat = new Date(dat);
        if (dat.getDay) return dat.toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit'}); //dat.getDate()+"."+(1+dat.getMonth())+"."+dat.getFullYear();
        return dat;
    }


}