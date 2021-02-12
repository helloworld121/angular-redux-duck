
// 1) decorator WRAPPER
//  a decorator is just a function with a particular signature
//  method-decorator => 3 arguments
//    - target class
//    - name of the method
//    - descriptor meta-data => a possible way to gain access
export function logMethod(): MethodDecorator {
  return ( target: Object, key: string, descriptor: PropertyDescriptor) => {

    // 2) decorator BODY
    // we store the orginal method
    const orginal = descriptor.value;

    // we replace the function with a wrapper function
    descriptor.value = function() {
      const targetName = target.constructor.name;
      const args = JSON.stringify(arguments);
      console.log(`Calling ${targetName}.${key} with ${args}`);

      // make sure to call the orginal method
      const result = orginal.apply(this, arguments);
      return result;
    };

    return descriptor;
  };
}

