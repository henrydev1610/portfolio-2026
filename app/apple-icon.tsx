import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          color: "#ff6b35",
          fontSize: 110,
          fontWeight: 700,
          borderRadius: 36,
        }}
      >
        H
      </div>
    ),
    size,
  );
}

