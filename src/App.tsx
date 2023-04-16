import React, { useEffect } from "react";
import Layout from "./components/organisms/Layout";
import DrawingTools from "./components/organisms/views/DrawingTools";
import { DrawingViewModel } from "./viewmodels/Drawing";
import DrawingCanvas from "./components/organisms/DrawingCanvas";

function App() {
  const drawing = new DrawingViewModel();

  useEffect(() => {
    drawing.load();
  });

  return (
    <Layout
      toolbar={<DrawingTools drawingViewModel={drawing} />}
      drawingArea={<DrawingCanvas drawingViewModel={drawing} />}
    />
  );
}

export default App;
