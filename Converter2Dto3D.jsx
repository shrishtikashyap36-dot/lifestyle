import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

export default function Converter2Dto3D() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  /* ---------- OLD HuggingFace call (same as before) ---------- */
  const generateImage = async () => {
    if (!file) {
      alert("Please upload image first");
      return;
    }

    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch("http://localhost:5000/depth", {
      method: "POST",
      body: fd
    });

    const blob = await res.blob();
    setResult(URL.createObjectURL(blob));
  };

  /* ---------- Drag & Drop ---------- */
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
    }
  };

  /* ---------- File select ---------- */
  const handleFile = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  /* ---------- Camera ---------- */
  const capture = async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setPreview(imgSrc);

    const blob = await fetch(imgSrc).then((r) => r.blob());
    setFile(blob);
    setShowCamera(false);
    setResult(null);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>2D → 2D Image Converter</h2>

      {/* GOOGLE STYLE UPLOADER */}
      {!preview && (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          style={{
            border: "2px dashed #ccc",
            borderRadius: 12,
            padding: 40,
            textAlign: "center"
          }}
        >
          <p>⬆ Drag image here</p>

          <p>
            or{" "}
            <label
              style={{
                color: "#1a73e8",
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              Upload a file
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </label>
          </p>

          <p
            style={{ marginTop: 10, cursor: "pointer" }}
            onClick={() => setShowCamera(true)}
          >
            📷 Use camera
          </p>
        </div>
      )}

      {/* CAMERA */}
      {showCamera && (
        <div style={{ marginTop: 20 }}>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={capture} style={{ marginTop: 10 }}>
            Capture
          </button>
        </div>
      )}

      {/* PREVIEW + GENERATE BUTTON */}
      {preview && !result && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <img
            src={preview}
            style={{ maxWidth: "100%", borderRadius: 10 }}
          />

          <button
            onClick={generateImage}
            style={{
              marginTop: 15,
              padding: "10px 25px",
              background: "#1a73e8",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Generate
          </button>
        </div>
      )}

      {/* RESULT IMAGE (2D → 2D) */}
      {result && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <h3>Generated Image</h3>
          <img
            src={result}
            style={{ maxWidth: "100%", borderRadius: 10 }}
          />
        </div>
      )}
    </div>
  );
}
