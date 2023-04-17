import "@react-three/fiber";
import * as THREE from "three";
import { isLineViewModel } from "../../../../viewmodels/Line";
import { ShapeViewModel } from "../../../../viewmodels/ShapeViewModel";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

export interface LineViewProps {
  viewModel: ShapeViewModel;
  color?: number;
}

const LineView = observer(({ viewModel, color = 0x000000 }: LineViewProps) => {
  const ref = useRef<THREE.LineSegments>(null);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const lineSegments = ref.current;

    return () => {
      if (lineSegments) {
        lineSegments.geometry.dispose();
        if (Array.isArray(lineSegments.material)) {
          lineSegments.material.forEach((m) => m.dispose());
        } else {
          lineSegments.material.dispose();
        }

        scene.remove(lineSegments);
      }
    };
  }, []);

  if (!isLineViewModel(viewModel)) {
    throw new Error("viewModel is not a LineViewModel");
  }

  const points = viewModel.points;
  const material = new THREE.LineBasicMaterial({ color, linewidth: 5 });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return <lineSegments args={[geometry, material]} ref={ref} />;
});

export default LineView;
