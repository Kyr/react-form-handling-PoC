export default {
  get(target, propName) {
    debugger
    console.group("Proxy.get");
    console.log("target", target);
    console.log("property", propName);
    console.log("hasOwnProp", target.hasOwnProperty(propName));
    console.log("prop in target", propName in target);
    console.groupEnd();

    if (propName === "toJSON") {
      return target.toJSON.bind(target);
    }

    if (propName === "length") {
      return target.length;
    }

    // const val = target[propName];

    // if (typeof val === "function") {
    //   console.log()
    //   return val.bind(target);
    // }

    const path = propName.split(".");
    const firstOnly = path[path.lenght - 1] === "firstError";
    const predicate = getPredicate(propName);

    console.log(path);

    if (firstOnly) {
      return target.find(predicate);
    } else {
      return target.filter(predicate);
    }
  }
};

function getPredicate(propName) {
  return function byDatePath(error) {
    return error => error.dataPath === "." + propertyName;
  };
}
