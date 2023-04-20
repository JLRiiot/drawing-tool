import "@react-three/fiber";
import TriangleViewModel from "../../../../viewmodels/Triangle";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import * as THREE from "three";

export interface TriangleViewProps {
  viewModel: TriangleViewModel;
}

const TriangleView = observer(({ viewModel }: TriangleViewProps) => {
  console.debug("Re-rendering TriangleView", viewModel);

  const SelectionMesh = useMemo(() => {
    return function SelectionMesh() {
      const points = viewModel.points;
      const segments: THREE.Vector3[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const p2 = points[(i + 1) % points.length];
        const pVector = new THREE.Vector3(p.x, p.y, 1);
        const p2Vector = new THREE.Vector3(p2.x, p2.y, 1);

        segments.push(pVector);
        segments.push(p2Vector);
      }

      console.debug("SelectionMesh segments", segments);

      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(segments);
      const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const circleGeometry = new THREE.CircleGeometry(0.3, 32);

      return (
        <group>
          <lineSegments args={[geometry, material]} />;
          {points.map((p, i) => (
            <mesh
              position={[p.x, p.y, 1]}
              args={[circleGeometry, circleMaterial]}
            />
          ))}
        </group>
      );
    };
  }, [viewModel]);

  return (
    <mesh userData={{ viewModel }}>
      <meshBasicMaterial
        color={viewModel.color}
        opacity={viewModel.selected ? 0.5 : 1}
        transparent={true}
      />
      <shapeGeometry args={[viewModel.toShape()]} />
      {viewModel.selected && <SelectionMesh />}
    </mesh>
  );
});

export default TriangleView;
