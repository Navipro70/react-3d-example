import { useRef } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei/core/useGLTF";

import { ShoeType } from "../types";

interface IData {
 node: string;
 material: ShoeType;
}

// fetch from server
const data: IData[] = [
 { node: "shoe", material: "laces" },
 { node: "shoe_1", material: "mesh" },
 { node: "shoe_2", material: "caps" },
 { node: "shoe_3", material: "inners" },
 { node: "shoe_4", material: "sole" },
 { node: "shoe_5", material: "stripes" },
 { node: "shoe_6", material: "band" },
 { node: "shoe_7", material: "patch" },
];

interface Props {
 colors: { [key: string]: string };
 onStartPickingColor: (editable: ShoeType) => void;
}

export const Shoe = ({ colors, onStartPickingColor }: Props) => {
 const group = useRef<THREE.Group>();
 const { nodes, materials } = useGLTF("shoe-draco.glb") as any;

 useFrame((state) => {
  const t = state.clock.getElapsedTime();
  if (group.current) {
   group.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
   group.current.rotation.x = Math.cos(t / 4) / 8;
   group.current.rotation.y = Math.sin(t / 4) / 8;
   group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  }
 });

 return (
  <>
   <group ref={group} dispose={null}>
    {data.map(({ node, material }) => {
     const onClick = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      onStartPickingColor(material);
     };

     return (
      <mesh
       castShadow
       receiveShadow
       onClick={onClick}
       geometry={nodes[node].geometry}
       material={materials[material]}
       material-color={colors[material]}
       key={material}
      />
     );
    })}
   </group>
  </>
 );
};
