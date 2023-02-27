import * as React from 'react';
import { select, Selection } from 'd3-selection';

type RenderChartFn = (
  selection: Selection<SVGElement | null, unknown, null, undefined>
) => void;

interface UseD3Props {
  renderChartFn: RenderChartFn;
  dependencies: React.DependencyList;
}

interface UseD3Return {
  ref: React.RefObject<SVGElement>;
}

export default function useD3({
  renderChartFn,
  dependencies,
}: UseD3Props): UseD3Return {
  const ref = React.useRef<SVGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      renderChartFn(select(ref.current));
    }
    return () => {};
  }, dependencies);

  return { ref };
}
