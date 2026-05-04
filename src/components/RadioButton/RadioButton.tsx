import { toggleMap } from "./toggleMap";
import { SPRITE_SHEET } from "../SpriteButton/SpriteButton";

export function RadioButton({
  selected,
  value,
  onSelect,
  scale = 2,
  label,
}: {
  selected: string;
  value: string;
  onSelect: (v: string) => void;
  scale?: number;
  label?: string;
}) {
  const isActive = selected === value;

  const sprite = isActive ? toggleMap.radioOn : toggleMap.radioOff;

  return (
    <div
      onClick={() => onSelect(value)}
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
