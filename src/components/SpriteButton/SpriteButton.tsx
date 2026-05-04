import { useState } from "react";
import type { ReactNode } from "react";
import type { ButtonSize, ButtonState } from "./spriteMap";
import { spriteMap } from "./spriteMap";
import "./SpriteButton.css";
import type { IconName } from "../SpriteIcon/iconMap";
import SpriteIcon from "../SpriteIcon/SpriteIcon";

export const SPRITE_SHEET = {
  url: new URL("../../assets/ui/ui.png", import.meta.url).toString(),
  width: 896,
  height: 128,
};

export default function SpriteButton({
  size = "medium",
  scale = 2,
  disabled = false,
  onClick,
  icon = undefined,
  iconScale = scale,
  children,
  fontFamily = "VT323",
  fontSize = 24,
  gap = 4,
}: {
  size?: ButtonSize;
  scale?: number;
  disabled?: boolean;
  onClick?: () => void;
  icon?: IconName;
  iconScale?: number;
  children?: ReactNode;
  fontFamily?: string;
  fontSize?: number;
  gap?: number;
}) {
  const [isHovered, setHovered] = useState(false);
  const [isPressed, setPressed] = useState(false);

  const getState = (): ButtonState => {
    if (disabled) return "disabled";
    if (isPressed) return "pressed";
    if (isHovered) return "hover";
    return "normal";
  };

  const sprite = spriteMap[size][getState()];

  return (
    <button
      className="sprite-button"
      style={{
        width: sprite.width * scale,
        height: sprite.height * scale,

        backgroundImage: `url(${SPRITE_SHEET.url})`,
        backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
        backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,

        imageRendering: "pixelated",

        fontFamily,
        fontSize,
        color: "var(--color-text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap,
      }}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
    >
      {icon && <SpriteIcon icon={icon} scale={iconScale} />}
      {children}
    </button>
  );
}
