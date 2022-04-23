import sync from './sync';

/**
 * v-model
 * @param {{ propName: string; valueName: string; }} config
 */
const vModel = (
  { propName = 'value', valueName = 'data' } = {
    propName: 'value',
    valueName: 'data',
  },
) => ({
  mixins: [sync({ propName, valueName })],
  model: {
    prop: `${propName}`,
    event: `update:${propName}`,
  },
});

export default vModel;
