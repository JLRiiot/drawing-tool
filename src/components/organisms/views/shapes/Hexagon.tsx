import "@react-three/fiber";
import HexagonViewModel from "../../../../viewmodels/Hexagon";
import { observer } from "mobx-react-lite";
import SelectionMesh from "../../SelectionMex";

export interface HexagonViewProps {
  viewModel: HexagonViewModel;
}

const HexagonView = observer(({ viewModel }: HexagonViewProps) => {
  return (
    <mesh userData={{ viewModel }}>
      <meshBasicMaterial
        color={viewModel.color}
        opacity={0.8}
        transparent={true}
      />
      <shapeGeometry args={[viewModel.toShape()]} />
      {viewModel.selected && <SelectionMesh viewModel={viewModel} />}
    </mesh>
  );
});

export default HexagonView;
