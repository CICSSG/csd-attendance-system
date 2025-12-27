import React from "react";
import { Button } from "@/components/ui/button";

function EmployeeLogin({
    handleSubmit,
    error,
}: {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string;
}) {
    return (
        <form
            onSubmit={handleSubmit}
            className=" bg-[#087830]/50 rounded-2xl px-20 pt-8 flex flex-col shadow-[0_10px_4px_-3px_rgba(0,0,0,0.25)] pb-5"
        >
            <h2 className="text-xl pb-1">Employee ID</h2>
            <input
                className="bg-[#F4f4f4] text-[#504e4e] w-130 h-10 rounded-md px-4 focus:border-[#094b21] focus:border-2 outline-none transition-all duration-100"
                placeholder="Enter your employee ID"
                type="text"
                name="employeeID"
                id=""
            />

            {error && <p className="text-[#e76d67] mt-2">Error: {error}</p>}
            <Button
                type="submit"
                className="w-fit mx-auto mt-6 px-7 py-5 text-lg bg-[#F4f4f4] text-[#087830] hover:cursor-pointer transition-colors hover:bg-[#087830] hover:text-[#F4f4f4]"
            >
                Login
            </Button>
        </form>
    );
}

export default EmployeeLogin;
