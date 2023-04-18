import "@react-three/fiber";
import TriangleViewModel from "../../../../viewmodels/Triangle";

export interface TriangleViewProps {
  viewModel: TriangleViewModel;
}

function TriangleView({ viewModel }: TriangleViewProps) {
  return (
    <mesh>
      <meshBasicMaterial color={viewModel.getColor()} opacity={1} />
      <shapeGeometry args={[viewModel.toShape()]} />
    </mesh>
  );
}

export default TriangleView;
