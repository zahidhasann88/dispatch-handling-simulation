import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  OmitIfEmpty(object: Object): Object{
    for (var propName in object) {
      if (object[propName] === null || object[propName] === undefined) {
        delete object[propName];
      }
    }
    return object;
  }
}
