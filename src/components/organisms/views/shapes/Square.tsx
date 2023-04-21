import "@react-three/fiber";
import SquareViewModel from "../../../../viewmodels/Square";
import SelectionMesh from "../../SelectionMex";
import { observer } from "mobx-react-lite";

export interface SquareViewProps {
  viewModel: SquareViewModel;
}

const SquareView = observer(({ viewModel }: SquareViewProps) => {
  return (
    <mesh userData={{ viewModel }} name={viewModel.id}>
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

export default SquareView;
