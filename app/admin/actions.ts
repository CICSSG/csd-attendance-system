"use server";

export async function GetUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUsers`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error("Failed to fetch users");
  }

  return responseData.data;
}

export async function GetAttendanceRecords() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAttendanceRecords`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const responseData = await response.json();

  if (!responseData.success) {
    throw new Error("Failed to fetch attendance records");
  }

  return responseData.data;
}

export async function EditAttendanceRecord(
  employeeId: string,
  date: string,
  timeIn: string,
  timeOut: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/editAttendanceRecord`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId, date, timeIn, timeOut }),
    }
  );
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error("Failed to edit attendance record");
  }
  return responseData;
}
