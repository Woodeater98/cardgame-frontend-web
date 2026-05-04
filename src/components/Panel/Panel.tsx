import { panelMap } from "./panelMap";
import type { PanelType } from "./panelMap";
import { SPRITE_SHEET } from "../SpriteButton/SpriteButton";

export default function Panel({
  width = 128,
  height = 128,
  scale = 2,
  children,
  background = "var(--color-primary)",
  panelType = "basic",
  innerPadding = 12,
}: {
  width?: number;
  height?: number;
  scale?: number;
  children?: React.ReactNode;
  background?: string;
  panelType?: PanelType;
  innerPadding?: number;
}) {
  const usedPanelMap = panelMap[panelType];
  const size = usedPanelMap.cornerSize * scale;
  const inset = 2 * scale;

  const getCornerStyle = (sprite: { x: number; y: number }) => ({
    position: "absolute" as const,
    width: size,
    height: size,

    backgroundImage: `url(${SPRITE_SHEET.url})`,
    backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
    backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,
    imageRendering: "pixelated" as const,
  });

  const getEdgeStyle = (sprite: { url: string }) => ({
    position: "absolute" as const,
    width: size,
    height: size,

    backgroundImage: `url(${sprite.url})`,

    imageRendering: "pixelated" as const,
  });
  return (
    <div
      style={{
        width,
        height,
        background,
        position: "relative",
        padding: inset,
        boxSizing: "border-box",
        backgroundClip: "content-box",
      }}
    >
      {/* corners */}
      <div
        style={{ ...getCornerStyle(usedPanelMap.topLeft), top: 0, left: 0 }}
      />
      <div
        style={{ ...getCornerStyle(usedPanelMap.topRight), top: 0, right: 0 }}
      />
      <div
        style={{
          ...getCornerStyle(usedPanelMap.bottomLeft),
          bottom: 0,
          left: 0,
        }}
      />
      <div
        style={{
          ...getCornerStyle(usedPanelMap.bottomRight),
          bottom: 0,
          right: 0,
        }}
      />
      <div
        style={{
          ...getEdgeStyle(usedPanelMap.top),
          top: 0,
          left: size,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
          width: width - 2 * size,
          height: size,
        }}
      />
      <div
        style={{
          ...getEdgeStyle(usedPanelMap.bottom),
          top: height - size,
          left: size,
          backgroundRepeat: "repeat-x",
          backgroundSize: "100% 100%",
          width: width - 2 * size,
          height: size,
        }}
      />
      <div
        style={{
          ...getEdgeStyle(usedPanelMap.left),
          top: size,
          left: 0,
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% 100%",
          width: size,
          height: height - 2 * size,
        }}
      />
      <div
        style={{
          ...getEdgeStyle(usedPanelMap.right),
          top: size,
          left: width - size,
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% 100%",
          width: size,
          height: height - 2 * size,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: innerPadding,
          left: innerPadding,
          right: innerPadding,
          bottom: innerPadding,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
