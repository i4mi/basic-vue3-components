<template>
    <div class="dropdown">
        <input type="text" autocomplete="off" @change = 'mychange' v-validate :value="modelValue" @input="input($event.target.value)"
            @keydown.enter.prevent = 'enter'
            @keydown.down = 'down'
            @keydown.up = 'up'
            @blur = 'blur'
            @focus = 'focus'
            v-bind="$attrs"
            >
        <ul class="dropdown-menu" :class="{'show':isOpen}">
            <a class="dropdown-item typeahead-item" v-for="(suggestion, idx) in matches" :key="suggestion.value" :class="{'active': isActive(idx)}" @click="suggestionClick(idx)" href="javascript:">
                {{ suggestion.display }}
            </a>
        </ul>
    </div>
</template>
<script>

export default {
    inheritAttrs : false,
    props : {
        suggestions : Array,
        field : String,
        display : Object,
        modelValue : String
    },
    emits: ['update:modelValue','change','selection'],

    data: () => ({
        open : false,
        selection : "",
        current : 0
    }),

    
    computed : {
        isOpen() {
            const { $data } = this;
            return /* $data.selection != "" && */ this.matches.length != 0 && this.matches.length < 10 && $data.open == true;
        },

        matches() {
            let result = [];
            for (let entry of this.suggestions) {
                let v = this.val(entry), d = this.valShow(entry);
                if (d && d.indexOf && (this.selection==""|| d.indexOf(this.selection)) >= 0) result.push({ display : d, value : v});
            }
            return result;
        }
    },

    methods : {
      

        val(v) {
            if (!this.field) return v;
            return v[this.field];
        },

        valShow(v) {
            if (this.display) {
                if (this.display.apply) {
                    return this.display(v);
                } else return v[this.display];
            }
            if (!this.field) return v;
            return v[this.field];
        },

        enter() {
            const { $data } = this;
            $data.selection = this.matches[$data.current].value;
            this.$emit("update:modelValue", $data.selection);
            $data.open = false;
            this.$emit("change", $data.selection);
            this.$emit("selection", $data.selection);
        },

        
        up() {
            const { $data } = this;
            if ($data.current > 0) $data.current--;
        },
        
        down() {
            const { $data } = this;
            if ($data.current < this.matches.length - 1) $data.current++;
        },
        
        isActive(index) {
            const { $data } = this;
            return index === $data.current;
        },
        
        input(v) {            
            const { $data } = this;
            this.$data.selection = v;
            this.$emit("update:modelValue", v);
            if ($data.open == false) {
                $data.open = true;
                $data.current = 0;
            }
        },
        
        suggestionClick(index) {            
            const { $data } = this;
            $data.selection = this.matches[index].value;
            this.$emit("update:modelValue", $data.selection);
            $data.open = false;
            this.$emit("change", $data.selection);
            this.$emit("selection", $data.selection);
        },

        blur(evt) {            
            if (evt.relatedTarget && evt.relatedTarget.classList && evt.relatedTarget.classList.contains("typeahead-item")) return;
            const { $data } = this;
            $data.open = false;
            this.$emit("selection", $data.selection);
        },

        focus() {
           this.$data.open = true;
           this.$data.current = 0;
        }
    },

    mounted() {
        this.$data.selection = this.modelValue || "";
    }
}
</script>
