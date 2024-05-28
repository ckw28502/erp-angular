import { Observable, defer } from "rxjs";

export function asyncData<T>(data:T): Observable<T> {
    return defer(() => Promise.resolve(data));
}

export function asyncError(errorObject: unknown): Observable<never> {
    return defer(() => Promise.reject(errorObject));
}

