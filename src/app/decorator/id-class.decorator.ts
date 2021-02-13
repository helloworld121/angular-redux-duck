
export function IdGenerator(): ClassDecorator {
  // the method gets the constructor as a parameter
  return (target) => {
    console.log('[IdGenerator]', target);
    target.prototype.id = Math.random();
    target.prototype.created = new Date().toLocaleString();
  };
}
