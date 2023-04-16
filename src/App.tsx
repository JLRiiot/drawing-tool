import React from "react";
import Layout from "./components/organisms/Layout";
import DrawingTools from "./components/organisms/DrawingTools";

function App() {
  return (
    <Layout
      toolbar={<DrawingTools />}
      drawingArea={<div>Drawing area goes here</div>}
    />
  );
}

export default App;
