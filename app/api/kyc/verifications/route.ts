import connectDB from "@/lib/db";
import KYC from "@/schemas/kyc";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // console.log(formData);
  const cardIdFront: File = formData.get("card-id-front") as File;
  const cardIdBack: File = formData.get("card-id-back") as File;
  const selfie = formData.get("selfie");

  console.log(cardIdFront, cardIdBack);

  if (!cardIdFront || !cardIdBack) {
    return NextResponse.json(
      { message: "Card ID files are required" },
      { status: 400 }
    );
  }

  if (!selfie) {
    return NextResponse.json(
      { message: "Selfie file is required" },
      { status: 400 }
    );
  }

  const cardIdFrontBuffer = Buffer.from(await cardIdFront.arrayBuffer());
  const cardIdBackBuffer = Buffer.from(await cardIdBack.arrayBuffer());

  // get current working directory in next js
  console.log("Current Working Directory: ", process.cwd());

  const cardIdFrontPath = path.join(
    process.cwd(),
    `storage/uploads/${cardIdFront.name}`
  );
  const cardIdBackPath = path.join(
    process.cwd(),
    `storage/uploads/${cardIdBack.name}`
  );

  // write files to disk
  try {
    await writeFile(cardIdFrontPath, cardIdFrontBuffer);
    await writeFile(cardIdBackPath, cardIdBackBuffer);
    console.log("Files uploaded successfully");

    await connectDB();

    const newKyc = new KYC({
      userId: "1",
      cardIdFront: cardIdFrontPath,
      cardIdBack: cardIdBackPath,
      selfieImage: selfie,
    });

    await newKyc.save();

    console.log("KYC saved successfully");

    return NextResponse.json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error uploading files" },
      { status: 500 }
    );
  }
}
