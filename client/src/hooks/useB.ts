import { b$ } from 'common/box';
import useMessager from './useMessager';

export const useB = (id?: string) => useMessager(b$(id));
export default useB;