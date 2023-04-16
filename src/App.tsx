import React, { useEffect } from "react";
import Layout from "./components/organisms/Layout";
import DrawingTools from "./components/organisms/views/DrawingTools";
import { DrawingViewModel } from "./viewmodels/Drawing";
import DrawingView from "./components/organisms/views/Drawing";

function App() {
  const drawing = new DrawingViewModel();

  useEffect(() => {
    drawing.load();
  });

  return (
    <Layout
      toolbar={<DrawingTools drawingViewModel={drawing} />}
      drawingArea={<DrawingView drawingViewModel={drawing} />}
    />
  );
}

export default App;
