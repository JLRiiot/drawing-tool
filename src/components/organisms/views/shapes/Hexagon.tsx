import "@react-three/fiber";
import HexagonViewModel from "../../../../viewmodels/Hexagon";

export interface HexagonViewProps {
  viewModel: HexagonViewModel;
}

function HexagonView({ viewModel }: HexagonViewProps) {
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

export default HexagonView;
