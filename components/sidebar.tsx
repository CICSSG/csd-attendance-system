import { Calendar, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar() {
    return (
        <div className="bg-[#087830] flex flex-col h-screen w-86 text-[#F4F4F4] p-4">
            <div className="flex gap-3 mb-5">
                <picture className="size-[55]">
                    <img src="/CICSLogo.png" alt="cics-logo" />
                </picture>
                <h1 className="text-xl">
                    College of Information <br />
                    and Computer Studies
                </h1>
            </div>
            <div className="flex flex-col  mb-auto">
                <Link
                    href="/admin/attendance"
                    className=" flex flex-row gap-2 text-lg items-center hover:bg-[#FFFFFF]/20 rounded-lg px-3 py-3"
                >
                    <Calendar />
                    Attendance
                </Link>
                <Link
                    href="/admin/users"
                    className="flex flex-row gap-2 text-lg items-center hover:bg-[#FFFFFF]/20 rounded-lg px-3 py-3"
                >
                    <User />
                    User Settings
                </Link>
            </div>
            <Link
                href=""
                className=" flex flex-row gap-2 text-lg items-center p-5 hover:bg-[#ca3a3a] rounded-lg px-3 py-3"
            >
                <LogOut />
                Log out
            </Link>
        </div>
    );
}
