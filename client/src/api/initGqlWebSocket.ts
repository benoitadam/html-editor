// import { Client, createClient } from 'graphql-ws/lib/client';
// import { CloseCode } from 'graphql-ws';
// import { refreshToken, authSession$ } from './auth';
// import app from '~src/app';
// import sleep from 'common/helpers/sleep';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { gqlRegister, gqlMatch, GqlVars } from 'common/models/gql';

// let _closeTimer: any;
// let _client: Client | undefined = undefined;
// let _socket: WebSocket | undefined = undefined;

// export const gqlClientConnected$ = new BehaviorSubject(0);

// const gqlClient = () => {
//     if (_client) return _client;

//     authSession$.subscribe(() => _socket && _socket.close(CloseCode.Forbidden, 'Forbidden'));

//     console.debug('new gqlClient');
//     return (_client = createClient({
//         url: app.gqlUrl,
//         // generateID: uuid,
//         connectionParams: async () => {
//             const session = authSession$.value;
//             if (session) {
//                 console.debug('gqlClient connection', session.user.id);
//                 return { headers: session.headers };
//             }
//             await sleep(5000);
//             return undefined;
//         },
//         on: {
//             error: (event) => {
//                 console.error('gqlClient error', event);
//             },
//             closed: (e: any) => {
//                 console.debug('gqlClient closed', e.code);
//                 _closeTimer = setTimeout(() => {
//                     gqlClientConnected$.next(0);
//                     console.warn('gqlClient closed', e.code);
//                 }, 1000);
//                 if (e.code === 1000) return; // Normal Closure
//                 if (e.code === 4400) {
//                     console.info('gqlClient refreshToken', e.code);
//                     refreshToken(true);
//                 }
//             },
//             connected: (socket: any) => {
//                 _socket = socket;
//                 clearTimeout(_closeTimer);
//                 if (!gqlClientConnected$.value) {
//                     console.info('gqlClient connected', socket);
//                     gqlClientConnected$.next(Date.now());
//                 }
//             },
//         },
//     }));
// }

// export const initGql = () => {
//     gqlRegister((q: string, vars: GqlVars = {}) => {
//         return new Promise<any>((resolve, reject) => {
//             let result: any;
//             gqlClient().subscribe(
//                 { query: q, variables: vars },
//                 {
//                     next: (response: any) => result = response,
//                     error: (error) => reject(error),
//                     complete: () => resolve(result),
//                 },
//             );
//         });
//     }, (q: string, vars?: Record<string, any>) => {
//         return new Observable<any>((observer) => {
//             let cleanup: (() => void)|null = gqlClient().subscribe(
//                 { query: q, variables: vars },
//                 {
//                     next: (response: any) => observer.next(response),
//                     error: (error: any) => observer.error(error),
//                     complete: () => observer.complete(),
//                 },
//             );
    
//             const connectedSubscription = gqlClientConnected$.subscribe((connected) => {
//                 if (!connected) {
//                     if (cleanup) cleanup();
//                     cleanup = null;
//                     connectedSubscription.unsubscribe();
//                 }
//             });
    
//             return () => {
//                 if (cleanup) cleanup();
//                 cleanup = null;
//             };
//         });
//     });
// };

// export default initGql;
