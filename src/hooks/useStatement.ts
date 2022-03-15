import { ColorResult } from "react-color";
import { proxy, useSnapshot } from "valtio";

import { Nullable, ShoeType } from "../types";

const WHITE = "#fff";

const state = proxy({
 editable: null as Nullable<ShoeType>,
 items: {
  laces: WHITE,
  mesh: WHITE,
  caps: WHITE,
  inners: WHITE,
  sole: WHITE,
  stripes: WHITE,
  band: WHITE,
  patch: WHITE,
 },
});

export const useStatement = () => {
 const snap = useSnapshot(state);

 const onStartPickingColor = (id: ShoeType) => {
  state.editable = id;
 };

 const onChangeColor = (color: ColorResult) => {
  if (!snap.editable) return;

  state.items[snap.editable] = color.hex;
  state.editable = null;
 };

 const currentColor = (() => {
  if (!snap.editable) return WHITE;

  return state.items[snap.editable];
 })();

 return {
  ...snap,
  currentColor,
  onStartPickingColor,
  onChangeColor,
 };
};
