import "@react-three/fiber";
import * as THREE from "three";
import { observer } from "mobx-react-lite";

import LineViewModel, { isLineViewModel } from "../../../../viewmodels/Line";

export interface LineViewProps {
  viewModel: LineViewModel;
}

const LineView = observer(({ viewModel }: LineViewProps) => {
  if (!isLineViewModel(viewModel)) {
    throw new Error("viewModel is not a LineViewModel");
  }

  const points = [viewModel.getStart(), viewModel.getEnd()];
  const material = new THREE.LineBasicMaterial({
    color: viewModel.getColor(),
    linewidth: 5,
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return <lineSegments args={[geometry, material]} />;
});

export default LineView;
