import './string';

export {};

declare global {
  interface Object {
    hasKey(obj:{[key:string] : any}, key:string): boolean;  
    remove(obj:{[key:string] : any}, key:string): Object;  
    snakeCaseKeys(obj:{[key:string] : any}, key:string): Object;
    camelCaseKeys(obj:{[key:string] : any}, key:string): Object;
  }
}

Object.hasKey = (obj:{[key:string] : any}, key:string) => {
  return Object.keys(obj).indexOf(key) > -1;
}

Object.remove = (obj:{[key:string] : any}, key:string) => {
  let _obj = obj;

  if (Object.hasKey(_obj, key)) {
    delete _obj[key];
  }

  return _obj;
}

Object.snakeCaseKeys = (obj:{[key:string] : any}, key:string) => {
  let result = {};
  
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    let newKey = key.snakeCase();

    result[newKey] = value;
  });

  return result;

}

Object.camelCaseKeys = (obj:{[key:string] : any}, key:string) => {
  let result = {};
  
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    let newKey = key.camelCase();

    result[newKey] = value;
  });

  return result;

}