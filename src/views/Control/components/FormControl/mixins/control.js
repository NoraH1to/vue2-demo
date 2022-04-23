/**
 * control
 * @param {Record} model
 */
const control = (model = {}, propName = 'data') => ({
  model: {
    prop: `${propName}`,
    event: `update:${propName}`,
  },
  props: {
    [`${propName}`]: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    immediate: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      formData: {
        ...model,
      },
    };
  },
  watch: {
    formData: {
      handler(n) {
        this.$emit(`update:${propName}`, { ...n });
      },
      deep: true,
    },
  },
  created() {
    this.$watch(
      `${propName}`,
      (newData) => {
        Object.keys(newData).forEach((k) =>
          this.$set(this.formData, k, newData[k]),
        );
      },
      { deep: true, immediate: this.immediate },
    );
  },
});

export default control;
