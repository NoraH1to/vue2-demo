import { immutable } from '@/utils';

/**
 * sync
 * @param {{ propName: string; valueName: string; }} config
 */
const sync = (
  { propName = 'value', valueName = 'data' } = {
    propName: 'value',
    valueName: 'data',
  },
) => ({
  props: {
    [`${propName}`]: {
      required: false,
      default: undefined,
    },
  },
  watch: {
    [`${valueName}`]: {
      handler(n) {
        this.$emit(`update:${propName}`, immutable(n));
      },
      deep: true,
    },
    [`${propName}`]: {
      handler(n) {
        if (typeof n === 'object') {
          Object.keys(n).forEach((k) => this.$set(this[valueName], k, n[k]));
        } else this[valueName] = n;
      },
      deep: true,
      immediate: true,
    },
  },
});

export default sync;
