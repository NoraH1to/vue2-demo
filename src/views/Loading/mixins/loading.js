export default {
  data() {
    return {
      mixinsLoadingList: [],
    };
  },
  computed: {
    loading() {
      return !!this.mixinsLoadingList.length;
    },
  },
  watch: {
    loading(v) {
      this.$emit('loading', v);
    },
  },
  methods: {
    setLoading(flag) {
      if (flag instanceof Promise) {
        this.mixinsLoadingList.push(true);
        return flag.finally(() => this.mixinsLoadingList.pop());
      }
      if (flag) this.mixinsLoadingList.push(flag);
      else this.mixinsLoadingList.pop();
    },
  },
};
