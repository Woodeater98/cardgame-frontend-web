import { useState } from "react";
import Panel from "../Panel/Panel";
import SpriteIcon from "../SpriteIcon/SpriteIcon";
import { SPRITE_SHEET } from "../SpriteButton/SpriteButton";

type Option = {
  label: string;
  value: string;
};

export default function DropDownMenu({
  options,
  onSelect,
  scale = 2,
  maxHeight = 192,
}: {
  options: Option[];
  onSelect: (value: string) => void;
  scale?: number;
  maxHeight?: number;
}) {
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (opt: Option) => {
    setSelected(opt);
    onSelect(opt.value);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", width: 192 }}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          height: 48,

          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",

          paddingLeft: 12,

          backgroundImage: `url(${SPRITE_SHEET.url})`,
          backgroundPosition: `${-768 * scale}px ${-0 * scale}px`,
          backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,

          color: "var(--color-text)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <h3>{selected?.label ?? "Select..."}</h3>

        <div style={{ marginLeft: "auto", paddingRight: 8 }}>
          <SpriteIcon icon="arrowDown" />
        </div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div style={{ position: "absolute", top: 48, left: 0, zIndex: 1 }}>
          <Panel
            width={192}
            height={Math.min(options.length * 44 + 40, maxHeight)}
            panelType="thin"
          >
            <div
              style={{
                maxHeight: maxHeight - 20, // leave padding for panel border
                overflowY: "auto",
                position: "relative",
              }}
            >
              {options.map((opt, i) => (
                <div
                  key={opt.value}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => handleSelect(opt)}
                  style={{
                    position: "relative",
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 8,
                    cursor: "pointer",
                    color:
                      hoverIndex === i
                        ? "var(--color-primary)"
                        : "var(--color-text)",
                  }}
                >
                  {hoverIndex === i && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--color-highlight)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  <h3 style={{ position: "relative", zIndex: 1 }}>
                    {opt.label}
                  </h3>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
