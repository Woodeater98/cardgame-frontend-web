import { useState } from "react";
import type { ReactNode } from "react";
import { toggleMap } from "./toggleMap";
import { SPRITE_SHEET } from "../SpriteButton/SpriteButton";
import type { IconName } from "../SpriteIcon/iconMap";
import SpriteIcon from "../SpriteIcon/SpriteIcon";

export default function ToggleButton({
  defaultOn = false,
  scale = 2,
  children,
  onChange,
  layout = "row",
  gap = 8,
  icon = undefined,
  iconScale = scale,
}: {
  defaultOn?: boolean;
  scale?: number;
  children?: ReactNode;
  onChange?: (value: boolean) => void;
  layout?: "row" | "column";
  gap?: number;
  icon?: IconName;
  iconScale?: number;
}) {
  const [on, setOn] = useState(defaultOn);

  const sprite = on ? toggleMap.on : toggleMap.off;

  const handleClick = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: layout,
        alignItems: "center",
        justifyContent: "center",
        gap,
      }}
    >
      <button
        onClick={handleClick}
        style={{
          width: sprite.width * scale,
          height: sprite.height * scale,

          backgroundImage: `url(${SPRITE_SHEET.url})`,
          backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
          backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,

          imageRendering: "pixelated",
          border: "none",
          padding: 0,
          backgroundColor: "transparent",
          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && <SpriteIcon icon={icon} scale={iconScale} />}
      </button>
      <div className="text"> {children}</div>
    </div>
  );
}
