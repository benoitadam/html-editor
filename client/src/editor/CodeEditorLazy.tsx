import useMessager from '~src/hooks/useMessager';
import isAdvanced$ from './isAdvanced$';
import { lazy, Suspense } from 'react';

const CodeEditor = lazy(() => import('./CodeEditor'));

export default () => {
  const isAdvanced = useMessager(isAdvanced$);
  if (!isAdvanced) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CodeEditor />
    </Suspense>
  );
};
