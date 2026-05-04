import { useState } from "react";
import { toggleMap } from "./toggleMap";
import { SPRITE_SHEET } from "../SpriteButton/SpriteButton";

export default function CheckBox({
  defaultChecked = false,
  onChange,
  scale = 2,
  label,
}: {
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  scale?: number;
  label?: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  const sprite = checked ? toggleMap.checkboxOn : toggleMap.checkboxOff;

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div
      onClick={toggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 16 * scale,
          height: 16 * scale,

          backgroundImage: `url(${SPRITE_SHEET.url})`,
          backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
          backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,

          imageRendering: "pixelated",
        }}
      />

      {label && <span className="text">{label}</span>}
    </div>
  );
}
