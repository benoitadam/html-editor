import { B, updateN, NAction } from "common/box";
import app from "~src/app";

export default (b: B, name: string, actions?: Readonly<NAction[]>) => {
    console.debug('renderActions', b, name, actions);
    if (!actions) return;
    setTimeout(async () => {
        for (const action of actions) {
            if (action.fun) {
                try {
                    const fun = app.app[action.fun];
                    if (!fun) throw new Error('no fun ' + action.fun);
                    await fun(...(action.args || []));
                } catch (error) {
                    console.error(actions);
                }
            }
            if (action.to) updateN(action.to, action.changes);
        }
    }, 0);
};