import React, { useState } from "react";

export default function MaterialCalculator() {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [unit, setUnit] = useState("ft");
  const [cabinetType, setCabinetType] = useState("wardrobe");

  const [dims, setDims] = useState({
    length: "",
    breadth: "",
  });

  const [result, setResult] = useState(null);

  // Rooms
  const rooms = [
    { id: "living", name: "Living Room", icon: "🛋️" },
    { id: "bedroom", name: "Bedroom", icon: "🛏️" },
    { id: "kitchen", name: "Kitchen", icon: "🍳" },
    { id: "bathroom", name: "Bathroom", icon: "🚿" },
  ];

  // Cabinet Types
  const cabinets = [
    { id: "wardrobe", label: "Wardrobe", factor: 1 },
    { id: "kitchen_base", label: "Kitchen Base Cabinet", factor: 1.3 },
    { id: "kitchen_wall", label: "Kitchen Wall Cabinet", factor: 1.1 },
  ];

  // Convert length/breadth to feet
  const toFt = (val) => {
    const v = parseFloat(val);
    if (!v) return 0;
    if (unit === "in") return v / 12;
    if (unit === "cm") return v / 30.48;
    return v;
  };

  // Convert ft² to selected unit
  const convertArea = (areaFt) => {
    if (unit === "in") return areaFt * 144;
    if (unit === "cm") return areaFt * 929.03;
    return areaFt;
  };

  // Area unit text
  const getAreaUnit = () => {
    if (unit === "in") return "sq in";
    if (unit === "cm") return "sq cm";
    return "sq ft";
  };

  // Calculation
  const calculateInterior = () => {
    const L = toFt(dims.length);
    const B = toFt(dims.breadth);

    if (L <= 0 || B <= 0) return;

    const cabinet = cabinets.find((c) => c.id === cabinetType);
    const factor = cabinet?.factor || 1;

    const baseArea = L * B;
    const finalAreaFt = baseArea * factor;
    const displayArea = convertArea(finalAreaFt);

    setResult({
      area: displayArea.toFixed(2),
      areaUnit: getAreaUnit(),
      wood: (finalAreaFt / 32).toFixed(1),
      mica: (finalAreaFt * 1.2).toFixed(2),
      adhesive: (finalAreaFt / 10).toFixed(1),
    });
  };

  // STEP 1 – ROOM SELECTION
  if (step === 1) {
    return (
      <div className="main-card">
        <h2>Select Area to Design</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => {
                setSelectedRoom(room.name);
                setStep(2);
                setResult(null);
              }}
              style={{
                padding: "30px",
                border: "2px solid #ddd",
                borderRadius: "12px",
                cursor: "pointer",
                background: "#fff",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{room.icon}</div>
              <h3>{room.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 2 – CALCULATOR
  return (
    <div className="main-card">
      <button onClick={() => setStep(1)}>← Back</button>

      <h2>{selectedRoom} Cabinet Calculator</h2>

      {/* Unit */}
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="ft">Feet</option>
        <option value="in">Inches</option>
        <option value="cm">CM</option>
      </select>

      {/* Cabinet */}
      <select value={cabinetType} onChange={(e) => setCabinetType(e.target.value)}>
        {cabinets.map((cab) => (
          <option key={cab.id} value={cab.id}>
            {cab.label}
          </option>
        ))}
      </select>

      {/* Dimensions */}
      <input
        type="number"
        placeholder={`Length (${unit})`}
        onChange={(e) => setDims({ ...dims, length: e.target.value })}
      />

      <input
        type="number"
        placeholder={`Breadth / Depth (${unit})`}
        onChange={(e) => setDims({ ...dims, breadth: e.target.value })}
      />

      <button className="submit-btn" onClick={calculateInterior}>
        Calculate
      </button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5" }}>
          <h4>Material Estimate</h4>
          <p>📐 Area: {result.area} {result.areaUnit}</p>
          <p>🪵 Plywood: {result.wood} sheets</p>
          <p>✨ Mica: {result.mica} {result.areaUnit}</p>
          <p>🧴 Adhesive: {result.adhesive} kg</p>
        </div>
      )}
    </div>
  );
}
