import update from 'immutability-helper';

export const immutable = (target) =>
  typeof target === 'object' ? update({}, { $merge: target }) : target;
