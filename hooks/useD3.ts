import * as React from 'react';
import * as d3 from 'd3';

type renderFn = (
  // @ts-ignore
  selection: d3.Selection<SVGElement | null, unknown, null, undefined>
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
      // @ts-ignore
      renderFn(d3.select(ref.current));
    }
    return () => {};
  }, dependencies);

  return { ref };
}
