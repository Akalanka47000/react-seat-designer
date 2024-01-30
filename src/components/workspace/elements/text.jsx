import { forwardRef } from "react";

export const textFontSize = 35;

const Text = forwardRef(({ x, y, id, label, fontSize = textFontSize, fontWeight = 200, ...props }, ref) => {
  return (
    <text contentEditable ref={ref} id={id} x={x} y={y} fontSize={fontSize} fontWeight={fontWeight} {...props}>
      {label}{" "}
    </text>
  );
});

Text.displayName = "Text";

export default Text;
