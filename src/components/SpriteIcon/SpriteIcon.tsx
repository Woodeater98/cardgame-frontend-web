import { iconMap} from "./iconMap";
import type { IconName } from "./iconMap";
import { SPRITE_SHEET } from "../SpriteButton/SpriteButton";

export default function SpriteIcon({
  icon,
  scale = 2,
}: {
  icon: IconName;
  scale?: number;
  disabled?: boolean;
  onClick?: () => void;
}) {


  const sprite = iconMap[icon];


  return (
    <div
      style={{
        width: sprite.size * scale,
        height: sprite.size * scale,

        backgroundImage: `url(${SPRITE_SHEET.url})`,
        backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
        backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,

        imageRendering: "pixelated",
      }}
    />
  );
}