import "@react-three/fiber";

export interface TriangleViewProps {
  points: { x: number; y: number; z: number }[];
}

function TriangleView({ points }: TriangleViewProps) {
  const positionArray = points.flatMap((point) => [point.x, point.y, point.z]);

  return (
    <mesh>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          count={positionArray.length / 3}
          itemSize={3}
          array={new Float32Array(positionArray)}
        />
      </bufferGeometry>
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
}

export default TriangleView;
