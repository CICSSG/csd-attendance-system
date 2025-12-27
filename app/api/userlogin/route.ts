// Types of Requests
// POST - Create
// GET - Read
// UPDATE - Update
// PATCH - Update
// DELETE - Delete
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// localhost:3000/api/userlogin?id=12345

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("main");
    if (!id) {
        return NextResponse.json(
        { success: false, message: "Missing id parameter" },
        { status: 400 }
      );
    }
    
    // @ts-ignore
    const users = await db.collection("users").find({ _id: id }).toArray();
    const userAttendance = await db.collection("attendance").find({ employeeId: id, date: new Date().toISOString().split("T")[0] }).toArray();

    // console.log("User Attendance:", userAttendance);
    users.forEach(user => {
      userAttendance.forEach(record => {
        if (record.type === "time-in") {
          user.timeIn = record.time;
        } else if (record.type === "time-out") {
          user.timeOut = record.time;
        }
      });
    });

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log("Error in GET userlogin", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
