const isObject = (value: any) =>
  typeof value === 'object' && !Array.isArray(value);

const merge = (src: object, dst: object) =>
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

export default merge;
