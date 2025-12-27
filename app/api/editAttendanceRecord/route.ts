import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employeeId, date, timeIn, timeOut } = body;

    const client = await clientPromise;
    const db = client.db("main");
    const resultTimeIn = await db
      .collection("attendance")
      .updateOne(
        { employeeId, date, type: "time-in" },
        { $set: { time: timeIn } }
      );

    const resultTimeOut = await db
      .collection("attendance")
      .updateOne(
        { employeeId, date, type: "time-out" },
        { $set: { time: timeOut } }
      );

    const result = resultTimeIn.modifiedCount + resultTimeOut.modifiedCount;

    if (result === 0) {
      return NextResponse.json(
        { success: false, message: "No records were updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Attendance record updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
