"use client";
import { UserData } from "@/app/page";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import TimeoutConfirmation from "./timeout-confirmation";
import { toast } from "sonner";
import { UserTimeIn, UserTimeOut } from "@/app/actions";

function LoginSuccess({
  data,
  handleLogout,
  setData,
}: {
  data: UserData;
  handleLogout: () => void;
  setData: React.Dispatch<React.SetStateAction<UserData | null>>;
}) {
  const [timeoutModal, setTimeoutModal] = useState(false);

  // *Advanced Sample:
  useEffect(() => {
    console.log("LoginSuccess data:", data);
  }, [data]);

  const handleTimeIn = async () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const result = await UserTimeIn(data._id, currentTime);
    if (!result.success) {
      toast.error(`Failed to time in: ${result.message}`);
      return;
    }

    toast.success(`Successfully timed in at ${currentTime}!`);
    handleLogout();
  };

  const handleTimeOut = async () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const result = await UserTimeOut(data._id, currentTime);
    if (!result.success) {
      toast.error(`Failed to time out: ${result.message}`);
      return;
    }

    toast.success(`Successfully timed out at ${currentTime}!`);
    handleLogout();
  };

  function onTimeout() {
    setTimeoutModal(true);
  }

  function onTimeoutConfirm() {
    handleTimeOut();
    setTimeoutModal(false);
  }

  function onTimeoutCancel() {
    setTimeoutModal(false);
  }

  return (
    <>
      <div className="bg-[#087830]/50 rounded-2xl px-15 py-7 flex flex-col shadow-[0_10px_4px_-3px_rgba(0,0,0,0.25)]">
        <div className="bg-[#f4f4f4] px-20 py-4 rounded-lg text-center">
          <p className="text-[#087830] font-semibold text-xl mb-1">
            Welcome, {data.name}!
          </p>
          <p className="text-[#333333] font-light text-lg ">
            ID: {data._id} | {data.position}
          </p>
        </div>
        <p className="text-[#f4f4f4] text-center font-light mt-8">
          Status:{" "}
          {!data.timeIn && !data.timeOut
            ? "Not timed in"
            : data.timeIn && !data.timeOut
            ? `Timed in at ${data.timeIn}`
            : `Timed out at ${data.timeOut}`}
        </p>

        <div
          className={`gap-4 mt-2 ${
            !data.timeIn || !data.timeOut ? "grid grid-cols-2" : "flex flex-col"
          }`}
        >
          {(!data.timeIn || !data.timeOut) && (
            <Button
              className="w-full px-16 py-5 text-lg bg-[#F4f4f4] text-[#087830] hover:cursor-pointer transition-colors hover:bg-[#087830] hover:text-[#F4f4f4]"
              onClick={!data.timeIn ? handleTimeIn : onTimeout}
            >
              {!data.timeIn ? "Time In" : "Time Out"}
            </Button>
          )}

          <Button
            className="w-full px-16 py-5 text-lg bg-[#F4f4f4] text-[#087830] hover:cursor-pointer transition-colors hover:bg-[#c03823] hover:text-[#F4f4f4]"
            onClick={handleLogout}
          >
            Exit
          </Button>
        </div>
      </div>

      <TimeoutConfirmation
        isOpen={timeoutModal}
        onConfirm={onTimeoutConfirm}
        onCancel={onTimeoutCancel}
      />
    </>
  );
}

export default LoginSuccess;

// const name = () => {} 
// function name(){} - component

// {condition && return if true}
// {condition ? true : false}
