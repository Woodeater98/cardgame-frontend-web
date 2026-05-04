import SpriteButton from "../SpriteButton/SpriteButton";
import Panel from "../Panel/Panel";
import ToggleButton from "../ToggleButton/ToggleButton";
import PanelInput from "../PanelInput/PanelInput";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import CheckBox from "../CheckBox/CheckBox";
import "./ShowcasePage.css";
import { useState } from "react";
import { RadioButton } from "../RadioButton/RadioButton";

export default function ShowcasePage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [mode, setMode] = useState("easy");
  return (
    <div className="showcase">
      <h1>Component Showcase</h1>

      {/* LARGE */}
      <section>
        <h2>Large Buttons</h2>
        <div className="row">
          <SpriteButton size="large" onClick={() => alert("Large Click")}>
            Start Game
          </SpriteButton>

          <SpriteButton size="large" icon="settings">
            Options
          </SpriteButton>

          <SpriteButton size="large" disabled>
            Disabled
          </SpriteButton>
        </div>
      </section>

      {/* MEDIUM */}
      <section>
        <h2>Medium Buttons</h2>
        <div className="row">
          <SpriteButton size="medium">Play</SpriteButton>

          <SpriteButton size="medium" icon="user">
            User
          </SpriteButton>

          <SpriteButton size="medium" disabled>
            Locked
          </SpriteButton>
        </div>
      </section>

      {/* SMALL */}
      <section>
        <h2>Small Buttons</h2>
        <div className="row">
          <SpriteButton size="small">OK</SpriteButton>

          <SpriteButton size="small" icon="decline">
            X
          </SpriteButton>

          <SpriteButton size="small" disabled>
            Back
          </SpriteButton>
        </div>
      </section>

      {/* ICON */}
      <section>
        <h2>Icon Buttons</h2>
        <div className="row">
          <SpriteButton
            size="icon"
            icon="settings"
            onClick={() => alert("Settings")}
          ></SpriteButton>

          <SpriteButton size="icon">U</SpriteButton>

          <SpriteButton size="icon" icon="accept" disabled></SpriteButton>
        </div>
      </section>
      <section>
        <h2>Panels</h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <Panel width={256} height={128} panelType="special">
            <h2>TestPanel</h2>
            <p className="text"> Test Text here</p>
          </Panel>

          <Panel width={256} height={128} panelType="basic">
            <h2>TestPanel</h2>
            <p className="text"> Test Text here</p>
          </Panel>
          <Panel width={256} height={128} panelType="thin">
            <h2>TestPanel</h2>
            <p className="text"> Test Text here</p>
          </Panel>
        </div>
      </section>
      <section>
        <h2>Other Ui Elements</h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <ToggleButton icon="user">Toggle Me</ToggleButton>
          <DropDownMenu
            options={[
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "C", value: "C" },
              { label: "D", value: "D" },
              { label: "E", value: "E" },
            ]}
            onSelect={(value) => {
              console.log("Selected:", value);
            }}
          ></DropDownMenu>
          <div>
            <CheckBox label="Check 1"></CheckBox>
            <CheckBox label="Check 2"></CheckBox>
            <CheckBox label="Check 3"></CheckBox>
          </div>

          <div>
            <RadioButton
              selected={mode}
              value="easy"
              onSelect={setMode}
              label="Easy"
            />
            <RadioButton
              selected={mode}
              value="normal"
              onSelect={setMode}
              label="Normal"
            />
            <RadioButton
              selected={mode}
              value="hard"
              onSelect={setMode}
              label="Hard"
            />
          </div>
        </div>
      </section>
      <section>
        <h2>Input Fields</h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <PanelInput
            value={name}
            onChange={setName}
            placeholder="Enter name"
          />
          <PanelInput
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter Password"
          />
          <PanelInput
            type="number"
            value={number}
            onChange={setNumber}
            placeholder="Enter Number"
          />
        </div>
      </section>
    </div>
  );
}
