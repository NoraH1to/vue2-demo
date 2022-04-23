<template>
  <form-control v-model="formData" immediate />
</template>

<script>
import FormControl from './components/FormControl/index.vue';

export default {
  components: {
    FormControl,
  },
  data() {
    return {
      formData: {
        name: 'NoraH1to',
        sex: '1',
        age: 23,
      },
    };
  },
};
</script>

<style></style>
