export function hasOne(obj: object, properties: string[]) {
  for (const property of properties) {
    if (has(obj, property)) {
      return true;
    }
  }
  return false;
}

export function has(obj: { [x: string]: any }, property: string) {
  const path = property.split('.');
  let current = obj;

  for (let i = 0; i < path.length; i++) {
    current = current[path[i]];
    if (i !== path.length - 1 && !current) {
      return false;
    }
  }

  return true;
}
