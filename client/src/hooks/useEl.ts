import { el$ } from 'common/box';
import useMessager from './useMessager';

export default (id?: string) => useMessager(el$(id));