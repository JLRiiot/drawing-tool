import "@react-three/fiber";
import TriangleViewModel from "../../../../viewmodels/Triangle";
import { observer } from "mobx-react-lite";
import SelectionMesh from "../../SelectionMex";

export interface TriangleViewProps {
  viewModel: TriangleViewModel;
}

const TriangleView = observer(({ viewModel }: TriangleViewProps) => {
  console.debug("Re-rendering TriangleView", viewModel);

  return (
    <mesh userData={{ viewModel }}>
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
