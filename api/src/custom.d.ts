import * as _Firebase from 'firebase-admin';

declare module '*.json' {
  const value: any;
  export default value;
}

declare type Firebase = _Firebase;