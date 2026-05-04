export type IconName =
  | "settings"
  | "user"
  | "decline"
  | "accept"
  | "arrowDown"
  | "arrowUp";

export type IconSprite = {
  x: number;
  y: number;
  size: number; // usually 16
};

export const iconMap: Record<IconName, IconSprite> = {
  settings: { x: 512, y: 0, size: 16 },
  user: { x: 528, y: 0, size: 16 },
  decline: { x: 544, y: 0, size: 16 },
  accept: { x: 560, y: 0, size: 16 },
  arrowDown: { x: 576, y: 0, size: 16 },
  arrowUp: { x: 592, y: 0, size: 16 },
};
