import * as THREE from "three";
import { ShapeViewModel } from "../../viewmodels/ShapeViewModel";
import { observer } from "mobx-react-lite";

export interface SelectionMeshProps {
  viewModel: ShapeViewModel;
}
const SelectionMesh = observer(({ viewModel }: SelectionMeshProps) => {
  const points = viewModel.actionPoints;
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
          key={i}
          position={[p.x, p.y, 1]}
          args={[circleGeometry, circleMaterial]}
        />
      ))}
    </group>
  );
});

export default SelectionMesh;
