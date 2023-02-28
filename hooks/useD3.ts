import * as React from 'react';
import * as d3 from 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.2/d3.min.js';

type RenderChartFn = (
  selection: d3.Selection<SVGElement | null, unknown, null, undefined>
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
      renderChartFn(d3.select(ref.current));
    }
    return () => {};
  }, dependencies);

  return { ref };
}
