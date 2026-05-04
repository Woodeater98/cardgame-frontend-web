// panelMap.ts
export type PanelType = "basic" | "special" | "thin";
import topEdgeBasic from "../../assets/ui/ui_border/basicTop.png";
import bottomEdgeBasic from "../../assets/ui/ui_border/basicBottom.png";
import leftEdgeBasic from "../../assets/ui/ui_border/basicLeft.png";
import rightEdgeBasic from "../../assets/ui/ui_border/basicRight.png";

import topEdgeSpecial from "../../assets/ui/ui_border/specialTop.png";
import bottomEdgeSpecial from "../../assets/ui/ui_border/specialBottom.png";
import leftEdgeSpecial from "../../assets/ui/ui_border/specialLeft.png";
import rightEdgeSpecial from "../../assets/ui/ui_border/specialRight.png";

import topEdgeThin from "../../assets/ui/ui_border/thinTop.png";
import bottomEdgeThin from "../../assets/ui/ui_border/thinBottom.png";
import leftEdgeThin from "../../assets/ui/ui_border/thinLeft.png";
import rightEdgeThin from "../../assets/ui/ui_border/thinRight.png";

type SpriteTile = {
  x: number;
  y: number;
};

type ImageTile = {
  url: string;
};

export type PanelData = {
  cornerSize: number;

  topLeft: SpriteTile;
  topRight: SpriteTile;
  bottomLeft: SpriteTile;
  bottomRight: SpriteTile;

  top: ImageTile;
  bottom: ImageTile;
  left: ImageTile;
  right: ImageTile;
};

export const panelMap: Record<PanelType, PanelData> = {
  basic: {
    cornerSize: 16,

    topLeft: { x: 640, y: 0 },
    topRight: { x: 672, y: 0 },
    bottomLeft: { x: 640, y: 32 },
    bottomRight: { x: 672, y: 32 },

    top: { url: topEdgeBasic },
    bottom: { url: bottomEdgeBasic },
    left: { url: leftEdgeBasic },
    right: { url: rightEdgeBasic },
  },
  special: {
    cornerSize: 16,

    topLeft: { x: 688, y: 0 },
    topRight: { x: 720, y: 0 },
    bottomLeft: { x: 688, y: 32 },
    bottomRight: { x: 720, y: 32 },

    top: { url: topEdgeSpecial },
    bottom: { url: bottomEdgeSpecial },
    left: { url: leftEdgeSpecial },
    right: { url: rightEdgeSpecial },
  },
  thin: {
    cornerSize: 16,

    topLeft: { x: 640, y: 48 },
    topRight: { x: 672, y: 48 },
    bottomLeft: { x: 640, y: 80 },
    bottomRight: { x: 672, y: 80 },

    top: { url: topEdgeThin },
    bottom: { url: bottomEdgeThin },
    left: { url: leftEdgeThin },
    right: { url: rightEdgeThin },
  },
};
