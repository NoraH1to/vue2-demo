/**
 * loading sth
 * @param {string} name
 */
const loadingSth = (name) => ({
  data() {
    return {
      mixinsLoadingMap: {
        [name]: [],
      },
    };
  },
  methods: {
    setLoadingSth(name, flag) {
      if (this.mixinsLoadingMap[name] === undefined)
        throw 'undefined loading state';
      if (flag instanceof Promise) {
        this.mixinsLoadingMap[name].push(true);
        return flag.finally(() => this.mixinsLoadingMap[name].pop());
      }
      if (flag) this.mixinsLoadingMap[name].push(flag);
      else this.mixinsLoadingMap[name].pop();
    },
    getLoadingSth(name) {
      if (this.mixinsLoadingMap[name] === undefined)
        throw 'undefined loading state';
      return !!this.mixinsLoadingMap[name].length;
    },
  },
  watch: {
    [`mixinsLoadingMap.${name}.length`]: {
      handler(v) {
        this.$emit(`loading:${name}`, !!v);
      },
    },
  },
});

export default loadingSth;
