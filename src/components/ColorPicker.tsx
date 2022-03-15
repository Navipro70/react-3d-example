import { upperFirst } from "lodash";
import { BlockPicker, ColorChangeHandler } from "react-color";

import { Nullable } from "../types";

interface Props {
 color: string;
 title: Nullable<string>;
 pickColor: ColorChangeHandler;
}

export const ColorPicker = ({ color, title, pickColor }: Props) => {
 return (
  <div className="BlockPicker">
   <BlockPicker
    styles={{
     default: {
      card: {
       opacity: title ? 1 : 0.5,
       background: "aqua",
       border: "2px solid aqua",
       transition: "all 0.2s linear",
      },
      triangle: { display: "none" },
     },
    }}
    onChange={pickColor}
    color={color}
   />
   {title ? (
    <h1>{upperFirst(title)}</h1>
   ) : (
    <h1>
     Pick element
     <br />
     to style
    </h1>
   )}
  </div>
 );
};
