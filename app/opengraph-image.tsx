import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(180deg, #161616 0%, #0d0d0d 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.85, marginBottom: 18 }}>Henry Dev</div>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700, maxWidth: 900 }}>
          Desenvolvimento Web com Performance e Experiencia Premium
        </div>
      </div>
    ),
    size,
  );
}

