import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import { useStatement } from "./hooks";
import { ColorPicker, Shoe } from "./components";

import "./App.css";

export function App() {
 const { editable, items, currentColor, onChangeColor, onStartPickingColor } =
  useStatement();

 return (
  <div className="App">
   <ColorPicker
    color={currentColor}
    title={editable}
    pickColor={onChangeColor}
   />
   <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 38 }}>
    <ambientLight intensity={0.7} />
    <spotLight
     intensity={0.5}
     angle={0.1}
     penumbra={1}
     position={[10, 15, 10]}
     castShadow
    />
    <OrbitControls
     minPolarAngle={Math.PI / 2}
     maxPolarAngle={Math.PI / 2}
     enableZoom={false}
     enablePan={false}
    />
    {/* Put anything you want for loading */}
    <Suspense fallback={null}>
     <Shoe colors={items} onStartPickingColor={onStartPickingColor} />
     <Environment preset="city" />
     <ContactShadows
      rotation-x={Math.PI / 2}
      position={[0, -0.8, 0]}
      opacity={0.5}
      width={10}
      height={10}
      blur={1.5}
      far={0.8}
     />
    </Suspense>
   </Canvas>
  </div>
 );
}
