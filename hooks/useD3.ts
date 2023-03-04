import * as React from 'react';
import { select, Selection } from 'd3';

type renderFn = (
  selection: Selection<SVGElement | null, unknown, null, undefined>
) => void;

interface UseD3Props {
  renderFn: renderFn;
  dependencies: React.DependencyList;
}

interface UseD3Return<E extends SVGElement> {
  ref: React.RefObject<E>;
}

export default function useD3<E extends SVGElement>({
  renderFn,
  dependencies,
}: UseD3Props): UseD3Return<E> {
  const ref = React.useRef<E>(null);

  React.useEffect(() => {
    if (ref.current) {
      renderFn(select(ref.current));
    }
    return () => {};
  }, dependencies);

  return { ref };
}
