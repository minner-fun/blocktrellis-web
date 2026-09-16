import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#f4f6f8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          padding: 5,
        }}
      >
        <div style={{ width: 22, height: 5, background: "#16181d" }} />
        <div style={{ width: 14, height: 5, background: "#0f6f6a" }} />
        <div style={{ width: 22, height: 5, background: "#16181d" }} />
      </div>
    ),
    size,
  );
}
