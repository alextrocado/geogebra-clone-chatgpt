import { useEffect, useRef } from "react";
import JSXGraph from "jsxgraph";

export function GeoGebraPanel() {
  const boxRef = useRef(null);

  useEffect(() => {
    const board = JSXGraph.initBoard(boxRef.current!, {
      boundingbox: [-10, 10, 10, -10],
      axis: true
    });
    (window as any).board = board;
  }, []);

  return (
    <div
      id="jxgbox"
      ref={boxRef}
      style={{ width: "60%", height: "100%", borderRight: "1px solid #ccc" }}
    ></div>
  );
}
