import { useCallback, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { ids } from "@/constants";
import { store } from "@/store";
import { initializeElements } from "@/store/reducers/editor";
import { default as Crosshairs } from "./crosshairs";
import { default as Element, ElementType } from "./elements";
import { default as Grid } from "./grid";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  const booths = useSelector((state) => state.editor.booths);
  const seats = useSelector((state) => state.editor.seats);
  const text = useSelector((state) => state.editor.text);
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  useLayoutEffect(() => {
    store.dispatch(initializeElements());
  }, []);

  const elementProps = useCallback(
    (elem) => ({
      id: elem.id,
      x: elem.x,
      y: elem.y,
      isSelected: selectedElementIds.includes(elem.id),
      label: elem.label
    }),
    [selectedElementIds]
  );

  return (
    <div id={ids.workspaceContainer} className="w-full h-[88.5vh] relative border border-b-0 border-black">
      <svg id={ids.workspace} className="w-full h-full">
        <g>
          {seats.map((e) => (
            <Element key={e.id} type={ElementType.Seat} {...elementProps(e)} />
          ))}
          {booths.map((e) => (
            <Element key={e.id} type={ElementType.Booth} {...elementProps(e)} />
          ))}
          {text.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Text}
              fontSize={e.fontSize}
              fontWeight={e.fontWeight}
              {...elementProps(e)}
            />
          ))}
        </g>
      </svg>
      <Crosshairs />
      <Grid />
      <Zoom />
    </div>
  );
};

export default Workspace;
