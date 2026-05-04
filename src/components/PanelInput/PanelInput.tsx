import Panel from "../Panel/Panel";

export default function PanelInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  width = 200,
  height = 48,
  scale = 2,
  panelType = "thin",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "number";
  width?: number;
  height?: number;
  scale?: number;
  panelType?: "basic" | "special" | "thin";
}) {
  return (
    <Panel
      width={width}
      height={height}
      scale={scale}
      panelType={panelType}
      innerPadding={8}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        style={{
          width: "100%",
          height: "100%",

          background: "transparent",
          border: "none",
          outline: "none",

          color: "var(--color-text)",
          fontFamily: "VT323, monospace",
          fontSize: 20,

          imageRendering: "pixelated",
        }}
      />
    </Panel>
  );
}
