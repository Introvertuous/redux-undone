import isObject from './is_object';

export default function has(obj, property) {
  const path = property.split('.');
  let current = obj;

  for (let i = 0; i < path.length; i++) {
    const step = path[i];
    const next = current[step];

    if ((!isObject(next) && i !== path.length - 1) || next == null) {
      return false;
    }

    current = next;
  }

  return true;
}
