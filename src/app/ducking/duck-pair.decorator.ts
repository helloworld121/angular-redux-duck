
export function DuckPair(actionName: string): MethodDecorator {

  return ( target, key: string, descriptor: PropertyDescriptor) => {

    return descriptor;
  };

}
