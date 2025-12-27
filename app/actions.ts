"use server";

export async function UserLogin(employeeId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/userlogin?id=${employeeId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    // console.log("UserLogin response data:", data);
    if (data.success) {
      return data;
    }

    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function UserTimeIn(employeeId: string, timeIn: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/userTimeIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, timeIn }),
      }
    );

    const data = await response.json();
    if (data.success) {
      return data;
    }

    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function UserTimeOut(employeeId: string, timeOut: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/userTimeOut`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, timeOut }),
      }
    );
    const data = await response.json();
    if (data.success) {
      return data;
    }
    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: error };
  }
}