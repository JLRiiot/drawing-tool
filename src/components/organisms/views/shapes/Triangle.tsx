import "@react-three/fiber";
import TriangleViewModel from "../../../../viewmodels/Triangle";

export interface TriangleViewProps {
  viewModel: TriangleViewModel;
}

function TriangleView({ viewModel }: TriangleViewProps) {
  return (
    <mesh>
      <meshBasicMaterial
        color={viewModel.color}
        opacity={0.8}
        transparent={true}
      />
      <shapeGeometry args={[viewModel.toShape()]} />
    </mesh>
  );
}

export default TriangleView;
