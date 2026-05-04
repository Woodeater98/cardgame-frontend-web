export type ButtonSize = "large" | "medium" | "small" | "icon";
export type ButtonState = "normal" | "hover" | "pressed" | "disabled";

type SpriteData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const spriteMap: Record<ButtonSize, Record<ButtonState, SpriteData>> = {
  large: {
    normal: { x: 16, y: 0, width: 96, height: 32 },
    hover: { x: 16, y: 32, width: 96, height: 32 },
    pressed: { x: 16, y: 64, width: 96, height: 32 },
    disabled: { x: 16, y: 96, width: 96, height: 32 },
  },
  medium: {
    normal: { x: 160, y: 0, width: 64, height: 32 },
    hover: { x: 160, y: 32, width: 64, height: 32 },
    pressed: { x: 160, y: 64, width: 64, height: 32 },
    disabled: { x: 160, y: 96, width: 64, height: 32 },
  },
  small: {
    normal: { x: 304, y: 0, width: 32, height: 32 },
    hover: { x: 304, y: 32, width: 32, height: 32 },
    pressed: { x: 304, y: 64, width: 32, height: 32 },
    disabled: { x: 304, y: 96, width: 32, height: 32 },
  },
  icon: {
    normal: { x: 437, y: 5, width: 22, height: 22 },
    hover: { x: 437, y: 37, width: 22, height: 22 },
    pressed: { x: 437, y: 69, width: 22, height: 22 },
    disabled: { x: 437, y: 101, width: 22, height: 22 },
  },
};
