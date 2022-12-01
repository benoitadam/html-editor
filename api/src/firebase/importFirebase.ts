import { Firebase } from './firebase';

let promise: Promise<Firebase>;
export default function importFirebase() {
    return promise || (promise = import('./firebase').then(m => m.initFirebase()));
}