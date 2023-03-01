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

interface UseD3Return {
  ref: React.RefObject<SVGElement>;
}

export default function useD3({
  renderFn,
  dependencies,
}: UseD3Props): UseD3Return {
  const ref = React.useRef<SVGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      renderFn(d3.select(ref.current));
    }
    return () => {};
  }, dependencies);

  return { ref };
}
