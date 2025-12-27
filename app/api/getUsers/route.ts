import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    
    // @ts-ignore
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log("Error in GET users", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
