import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

//
// id: string
// employeeId: string
// type: "time-in" | "time-out"
// time: string
// date: string

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employeeId, timeOut } = body;

    const client = await clientPromise;
    const db = client.db("main");
    const result = await db.collection("attendance").insertOne({
      employeeId,
      type: "time-out",
      time: timeOut,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      return NextResponse.json(
        { success: false, message: "Failed to record time-out" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, message: "Time-out recorded successfully" });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
