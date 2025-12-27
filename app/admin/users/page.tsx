"use client";
import PositionBadge from "@/components/position-badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Plus, SearchIcon, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GetUsers } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const attendanceRecords = [
//   {
//     date: "Dec 26, 2025",
//     userId: "EMP001",
//     fullName: "John Doe",
//     position: "Part-time",
//     timeIn: "08:00 AM",
//     timeOut: "05:00 PM",
//   },
//   {
//     date: "Dec 26, 2025",
//     userId: "EMP002",
//     fullName: "Jane Smith",
//     position: "Full-time",
//     timeIn: "09:00 AM",
//     timeOut: "06:00 PM",
//   },
//   {
//     date: "Dec 26, 2025",
//     userId: "EMP003",
//     fullName: "Alice Johnson",
//     position: "Part-time",
//     timeIn: "07:30 AM",
//     timeOut: "04:30 PM",
//   },
//   {
//     date: "Dec 26, 2025",
//     userId: "EMP004",
//     fullName: "Bob Brown",
//     position: "Full-time",
//     timeIn: "08:15 AM",
//     timeOut: "05:15 PM",
//   },
// ];

const UserSettings = () => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [userRecords, setUserRecords] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    GetUsers().then((records) => {
      setUserRecords(records);
    });
  }, []);

  const filteredRecords = userRecords.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">User Settings</h1>
        <p className="text-gray-500 mb-6">
          Manage system users and their information
        </p>
      </div>
      {addUserModal ? (
        <Button
          size="sm"
          className="bg-[#ca3a3a] hover:bg-[#b13030] text-white w-27.2 h-10 rounded-[10px] flex flex-row gap-3 px-4 text-md font-light mb-4"
          onClick={() => setAddUserModal(false)}
        >
          <X color="#ffffff" className="size-5" />
          Cancel Add User
        </Button>
      ) : (
        <Button
          size="sm"
          className="bg-[#087830] hover:bg-[#065c24] text-white w-27.2 h-10 rounded-[10px] flex flex-row gap-3 px-4 text-md font-light mb-4"
          onClick={() => setAddUserModal(true)}
        >
          <Plus className="size-5" />
          Add User
        </Button>
      )}

      {addUserModal && (
        <div className="mb-6 p-4 border rounded-[10px] flex flex-col gap-4">
          {/* Add User Form - to be implemented */}
          <p className="font-semibold">Add New User</p>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-gray-500">User ID</Label>
              <Input placeholder="e.g., EMP005" className="py-4 w-full"></Input>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-gray-500">Full Name</Label>
              <Input placeholder="e.g., Juan Dela Cruz" className="py-4 w-full"></Input>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-gray-500">Position</Label>
              <Select defaultValue="Full-time">
                <SelectTrigger className="w-full py-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-row ">
            <Button
              className="bg-[#087830] hover:bg-[#065c24] text-white px-4 py-5 rounded-[10px] mt-4"
              onClick={() => {
                /* Handle Add User submission */
              }}
            >
              Add User
            </Button>
            <Button
              className="text-black px-4 py-5 rounded-[10px] mt-4 ml-4"
              onClick={() => setAddUserModal(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-row bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)]  outline-1 outline-offset-1 outline-black/10 gap-4 items-center w-98">
        <InputGroup className="border-none">
          <InputGroupInput
            placeholder="Search by name or user ID..."
            className="focus-visible:ring-0"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="mt-6 bg-white rounded-[10px] p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)]  outline-1 outline-offset-1 outline-black/10 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="text-[16px] font-extrabold">
              <TableHead>User ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record._id}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>
                  <PositionBadge position={record.position} />
                </TableCell>
                <TableCell className="flex justify-end">
                  <Button variant="link">
                    <Pen color="#087830" />
                  </Button>
                  <Button variant="link">
                    <Trash2 color="#E7000B" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserSettings;
