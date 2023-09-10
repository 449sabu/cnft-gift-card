import { Buffer } from "buffer";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import satori from "satori";

// https://www.npmjs.com/package/satori
// https://www.npmjs.com/package/@vercel/og

interface Body {
  lovelace: string;
}

export async function POST(request: Request) {
  const body: Body = await request.json();

  const filePath = path.join(
    process.cwd(),
    "public",
    "font",
    "Roboto",
    "Roboto-Black.ttf",
  );
  const Roboto = fs.readFileSync(filePath);

  const svg = await satori(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
        fontSize: 60,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
          backgroundClip: "text",
          color: "transparent",
          display: "flex",
        }}
      >
        CNFT Gift
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
          backgroundClip: "text",
          color: "transparent",
          display: "flex",
        }}
      >
        {body.lovelace} ADA
      </div>
    </div>,
    {
      width: 300,
      height: 300,
      fonts: [
        {
          name: "Roboto",
          data: Roboto,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  const base64 = Buffer.from(svg).toString("base64");
  const image = "data:image/svg+xml;base64," + base64;

  const base64Array = [];
  for (let i = 0; i < image.length; i += 64) {
    base64Array.push(image.slice(i, i + 64));
  }

  return NextResponse.json({
    base64Array,
  });
}
