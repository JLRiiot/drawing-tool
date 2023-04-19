import "@react-three/fiber";
import SquareViewModel from "../../../../viewmodels/Square";

export interface SquareViewProps {
  viewModel: SquareViewModel;
}

function SquareView({ viewModel }: SquareViewProps) {
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

export default SquareView;
