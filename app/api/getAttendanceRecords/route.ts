import { AttendanceRecord } from "@/app/admin/attendance/page";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("main");

    // @ts-ignore
    const users = await db.collection("users").find({}).toArray();
    const attendanceRecords = await db
      .collection("attendance")
      .find({})
      .toArray();

    const combinedRecords: AttendanceRecord[] = [];

    users.forEach((user) => {
      const userRecords = attendanceRecords.filter(
        (record) => record.employeeId === user._id
      );
      userRecords.forEach((record) => {
        const existingRecord = combinedRecords.find(
          (r) => r.date === record.date && r.userId === user._id.toString()
        );
        if (existingRecord) {
          if (record.type === "time-in") {
            existingRecord.timeIn = record.time;
          } else if (record.type === "time-out") {
            existingRecord.timeOut = record.time;
          }
        } else {
          const newRecord: AttendanceRecord = {
            date: record.date,
            userId: user._id.toString(),
            name: user.name,
            position: user.position,
            timeIn: record.type === "time-in" ? record.time : "",
            timeOut: record.type === "time-out" ? record.time : "",
          };
          combinedRecords.push(newRecord);
        }
      });
    });

    return NextResponse.json({ success: true, data: combinedRecords });
  } catch (error) {
    console.log("Error in GET userlogin", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
