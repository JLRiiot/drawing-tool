import { Canvas as ThreeCanvas } from "@react-three/fiber";

export interface CanvasProps {
  children: React.ReactNode;
}

function Canvas({ children }: CanvasProps) {
  return (
    <ThreeCanvas
      orthographic
      camera={{
        position: [0, 0, 50],
        zoom: 10,
        up: [0, 0, 1],
        far: 10000,
      }}
    >
      <ambientLight intensity={0.1} />
      <color attach="background" args={[1, 1, 1]} />
      {children}
    </ThreeCanvas>
  );
}

export default Canvas;
