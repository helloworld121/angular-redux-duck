import {ɵɵdefineInjectable, ɵɵinject} from '@angular/core';
import {Store} from '@ngrx/store';

export function Duck<STATE_TYPE>(initialState: STATE_TYPE): ClassDecorator {
  return (constructor) => {
    console.log('[Duck] starting');

    // 1) make it a service
    // https://indepth.dev/posts/1151/a-deep-dive-into-injectable-and-providedin-in-ivy
    // https://github.com/angular/angular/blob/9bd959076730c4e22ceadda73694198b4f01b9e0/packages/core/src/di/injection_token.ts#L70
    // @ts-ignore TODO fix this ignore
    constructor.ɵprov = ɵɵdefineInjectable({
      token: this,
      providedIn: 'root',
      // factory: options.factory,
      // tslint:disable-next-line:typedef TODO fix this ignore
      factory() {
        console.log('[Duck] Calling factory');
        return duckFactory(constructor);
        // @ts-ignore TODO fix this ignore
        // return new constructor();
      }
    });

    // 1) set initialState
    constructor.prototype.initialState = initialState;

    // TODO => inject() must be called from an injection context
    // TODO maybe in ɵɵdefineInjectable
    // 2) read store
    // // ɵɵinject can be used to get dependency being already registered
    // const store = ɵɵinject(Store);

    return constructor;
  };
}

const duckFactory = (constructor) => {
  const store = ɵɵinject(Store);
  console.log('[Duck] duckFactory', store);
  return new constructor();
};
