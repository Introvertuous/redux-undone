import isObject from './is_object';

export default (src, dst) =>
  Object.entries(dst).reduce(
    (acc, [dstProperty, dstValue]) => {
      const srcValue = src[dstProperty];
      acc[dstProperty] =
        isObject(srcValue) && isObject(dstValue)
          ? merge(srcValue, dstValue)
          : dstValue;
      return acc;
    },
    { ...src }
  );
