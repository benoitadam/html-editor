import app from "../app";
import { render } from 'react-dom';
import RenderFactory from "../render/RenderFactory";
import { ROOT_ID } from "common/box";

// export * from './authDevice';
// export * from './bridge';
// export * from './deviceConfig';
// export * from './deviceConsole';
// export * from './deviceInit';
// export * from './evalAction';
// export * from './evalCommand';
// export * from './FullyBridge';
// export * from './getInfoBase';
// export * from './interfaces';

console.debug('device loaded');

const initDevice = async () => {
    console.debug('initDevice');
    document.title = `${app.name} Device v${app.version}`;
    render(<RenderFactory id={ROOT_ID} />, document.body);
}

initDevice();