import { ImageResponse } from "next/og";

export const alt = "Portfolio | Creative Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#080808",
          padding: "100px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a3a3a3",
            marginBottom: 32,
          }}
        >
          Creative Developer
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 300,
            color: "#fafafa",
            lineHeight: 1.1,
          }}
        >
          Crafting Digital
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 300,
            color: "#737373",
            lineHeight: 1.1,
          }}
        >
          Experiences
        </div>
      </div>
    ),
    { ...size }
  );
}
