# basic-vue3-components

Some simple components and mixins to be used to VUE 3 applications.

Usage example:

```
<template>

  <modal id="m1" title="Hello" open="true">
     <error-box :error="error">
     Hello world
  </modal>
</template>
<script>
import { Modal, ErrorBox, status } from "basic-vue3-components";

export default {
    ...
    components : { Modal, ErrorBox },
    mixins : [ status ]
    ...
}

</script>
```