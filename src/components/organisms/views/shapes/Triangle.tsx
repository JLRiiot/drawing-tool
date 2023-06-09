import "@react-three/fiber";
import TriangleViewModel from "../../../../viewmodels/Triangle";
import { observer } from "mobx-react-lite";
import SelectionMesh from "../../SelectionMex";

export interface TriangleViewProps {
  viewModel: TriangleViewModel;
}

const TriangleView = observer(({ viewModel }: TriangleViewProps) => {
  return (
    <mesh userData={{ viewModel }} name={viewModel.id}>
      <meshBasicMaterial
        color={viewModel.color}
        opacity={viewModel.selected ? 0.5 : 1}
        transparent={true}
      />
      <shapeGeometry args={[viewModel.toShape()]} />
      {viewModel.selected && <SelectionMesh viewModel={viewModel} />}
    </mesh>
  );
});

export default TriangleView;
