import "@react-three/fiber";
import TriangleViewModel from "../../../../viewmodels/Triangle";

export interface TriangleViewProps {
  viewModel: TriangleViewModel;
}

function TriangleView({ viewModel }: TriangleViewProps) {
  return (
    <mesh>
      <meshBasicMaterial
        color={[0.86, 0.98, 0.62]}
        opacity={1}
      />
      <shapeGeometry args={[viewModel.toShape()]} />
    </mesh>
  );
}

export default TriangleView;
