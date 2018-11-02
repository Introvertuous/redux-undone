import deepmerge from 'deepmerge';

export default (src: object, dst: object) => deepmerge({ ...src }, { ...dst });
