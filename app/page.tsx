"use client"; // This is a client component because it uses useState
import EmployeeLogin from "@/components/employee-login";
import LoginSuccess from "@/components/login-success";
import { useState, useEffect } from "react";
import { UserLogin } from "./actions";
import Link from "next/link";
export interface UserData {
  _id: string;
  name: string;
  position: "Full-Time" | "Part-Time";
  timeIn?: string; // ?: Optional property
  timeOut?: string;
}

export default function Page() {
  // All fuctions must be before the return statement\
  // *Basic Sample:
  // const [data, setData] = useState(initialValue)

  // *Advanced Sample:
  // const [data, setData] = useState<Type>(initialValue)

  // Array: [1, 2, 3, 4, 5] Index
  // Dictionary: {key1: value1, key2: value2} Key Value Pairs

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //called on the event when submitting the form to prevent a browser reload/refresh.
    setError(null);

    const formData = new FormData(e.currentTarget);
    const employeeID = formData.get("employeeID");

    const data = await UserLogin(employeeID as string);

    if (data.success) {
      setData(data.data[0]);
      setError(null);
    }

    setError(data.message);

    // console.log("Data received:", data);
  };

  const handleLogout = () => {
    setError(null);
    setData(null);
  };

  return (
    <div className="min-h-screen max-w-480 mx-auto w-full flex flex-col">
      {/*3 main components of a page*/}
      <header className="bg-[#F4F4F4] w-full flex justify-between flex-row px-19.25 py-3 items-center">
        <div className="flex items-center flex-row gap-2">
          <picture>
            <img
              className="w-16.5 h-16.5"
              src="/CICSLogo.png"
              alt="cics-logo"
            />
          </picture>
          <h1 className="text-[1.3rem]">
            College of Information and Computer Studies
          </h1>
        </div>
        <Link href="/login" className="flex flex-row items-center text-[1.3rem] border-l-2 border-[#757575] h-10 px-6 hover:bg-[#087830] hover:text-[#F4f4f4] hover:cursor-pointer transition-colors duration-200">
          Admin
        </Link>
      </header>
      <main className="bg-[url('/BGCover.png')] grow text-[#F4f4f4] flex flex-col items-center justify-center ">
        {" "}
        {/*BG set-up using tailwindCSS*/}
        <div className="flex justify-between items-center flex-col -translate-y-10">
          <div className="flex justify-between items-center flex-col gap-15 ">
            <h1 className=" w-277.25 h-16 text-center text-6xl font-bold">
              Hi there! Let&apos;s get you timed in
            </h1>
            <div>
              <h2 className="w-162.75 h-14 text-center text-4xl">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h2>
              <p className="w-162.75 h-16 text-center text-xl italic items-center">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>{" "}
          {/*<div/> - only use for designs */}
          {!data ? (
            <EmployeeLogin handleSubmit={handleSubmit} error={error || ""} />
          ) : (
            <LoginSuccess
              data={data}
              handleLogout={handleLogout}
              setData={setData}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// condition ? true : false

//* Definition of terms

/**

gap is equal spacing between elements inside a cointainer

padding is space between the content and border

margin is spacing outside the border */
