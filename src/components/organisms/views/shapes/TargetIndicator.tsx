import "@react-three/fiber";
import * as THREE from "three";
import { observer } from "mobx-react-lite";
import { TargetIndicatorViewModel } from "../../../../viewmodels/TargetIndicator";

export interface TargetIndicatorViewProps {
  viewModel: TargetIndicatorViewModel;
}

const TargetIndicatorView = observer(
  ({ viewModel }: TargetIndicatorViewProps) => {
    const rings = [1, 2, 3, 4];
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });

    return (
      <group>
        {rings.map((ring) => {
          const ringRadius = (1 * (ring + 1)) / rings.length;

          const ringGeometry = new THREE.RingGeometry(
            ringRadius - 0.15,
            ringRadius,
            32
          );

          return (
            <mesh
              key={ring}
              args={[ringGeometry, ringMaterial]}
              position={viewModel.actionPoints[0]}
            ></mesh>
          );
        })}
      </group>
    );
  }
);

export default TargetIndicatorView;
