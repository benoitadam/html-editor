import { createContext } from 'preact';
import { B, defaultB } from 'common/box';

export interface RenderContextValue {
    b: B,
    a: Record<string, any>
};

export default createContext<RenderContextValue>({ b: defaultB, a: {} });