"use client";
import * as XLSX from 'xlsx';
import PositionBadge from "@/components/position-badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  ChevronDownIcon,
  Download,
  Pen,
  SearchIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EditAttendanceRecord, GetAttendanceRecords } from "../actions";
import { Input } from "@/components/ui/input";

export interface AttendanceRecord {
  date: string;
  userId: string;
  name: string;
  position: string;
  timeIn: string;
  timeOut: string;
}


const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string | null>(
    "All Positions"
  );
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [editingRecordId, setEditingRecordId] = useState<number>(-1);
  const [editedRecord, setEditedRecord] = useState<AttendanceRecord>();

  useEffect(() => {
    GetAttendanceRecords().then((records) => {
      setAttendanceRecords(records);
    });
  }, []);

  const filteredRecords = attendanceRecords.filter((record) => {
    if (attendanceRecords.length === 0) return false;
    const matchesSearchQuery =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPositionFilter =
      positionFilter === "All Positions" || record.position === positionFilter;

    const matchesDateFilter = date
      ? new Date(record.date).toDateString() === date.toDateString()
      : true;

    return matchesSearchQuery && matchesPositionFilter && matchesDateFilter;
  });

  function handleEditRecord() {
    if (!editedRecord) return;

    const formattedRecord = {
      ...editedRecord,
      timeIn: hour24ToAmPm(editedRecord.timeIn),
      timeOut: hour24ToAmPm(editedRecord.timeOut),
    };

    EditAttendanceRecord(
      formattedRecord.userId,
      formattedRecord.date,
      formattedRecord.timeIn,
      formattedRecord.timeOut
    ).then(() => {
      const updatedRecords = attendanceRecords.map((record) =>
        record.userId === formattedRecord.userId &&
        record.date === formattedRecord.date
          ? formattedRecord
          : record
      );
      setAttendanceRecords(updatedRecords);
    });

    setEditingRecordId(-1);
  }

  function ampmTo24Hour(time: string | undefined): string {
    if (!time) return "";
    const match = time.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
    if (!match) return time;
    let hour = parseInt(match[1], 10);
    const minute = match[2];
    const period = match[3];
    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  }

  function hour24ToAmPm(time: string | undefined): string {
    if (!time) return "";
    if (/^(\d{1,2}):(\d{2})\s*([AP]M)$/i.test(time)) return time;
    const match = time.match(/^(\d{2}):(\d{2})$/);
    if (!match) return time;
    let hour = parseInt(match[1], 10);
    const minute = match[2];
    let period = "AM";
    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      period = "PM";
    } else if (hour > 12) {
      hour -= 12;
      period = "PM";
    }
    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  }

  const handleExport = () => {
    // Group records by date and position
    const recordsByDate = filteredRecords.reduce((acc, record) => {
      if (!acc[record.date]) {
        acc[record.date] = { fullTime: [], partTime: [] };
      }
      if (record.position === 'Full-time') {
        acc[record.date].fullTime.push(record);
      } else {
        acc[record.date].partTime.push(record);
      }
      return acc;
    }, {} as Record<string, { fullTime: AttendanceRecord[], partTime: AttendanceRecord[] }>);

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Process each date
    // @ts-ignore
    Object.entries(recordsByDate).forEach(([date, { fullTime, partTime }]) => {
      const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Create worksheet data
      const wsData: any[][] = [];

      // Header rows
      wsData.push(['', 'Faculty Attendance']);
      wsData.push(['', 'Document Reference: EQMS-CSD-RCD-001', '', 'Revision Number: R000', '']);
      wsData.push(['', 'Confidentiality Level: Internal use', '', 'Approval Date: August 1, 2025', '']);
      wsData.push(['', 'Review Cycle: Semestral', '', 'Effectivity Date: SY 2025-2026', '']);
      wsData.push([]);
      wsData.push([`Date: ${formattedDate}`, '', '', '']);
      wsData.push([]);
      
      // Full-time Faculty section
      if (fullTime.length > 0) {
        wsData.push(['Full-time Faculty', 'In', 'Out', 'Signature']);
        // @ts-ignore
        fullTime.forEach((record, index) => {
          wsData.push([
            `${index + 1}. ${record.name}`,
            record.timeIn,
            record.timeOut,
            ''
          ]);
        });
        wsData.push([]);
      }

      // Part-time Faculty section
      if (partTime.length > 0) {
        wsData.push(['Part-Time', 'In', 'Out', 'Signature']);
        // @ts-ignore
        partTime.forEach((record, index) => {
          wsData.push([
            `${index + 1}. ${record.name}`,
            record.timeIn,
            record.timeOut,
            ''
          ]);
        });
        wsData.push([]);
      }

      // Footer
      wsData.push([]);
      wsData.push(['Prepared by:', 'Noted by:', '']);
      wsData.push([]);
      wsData.push([]);
      wsData.push([]);
      wsData.push(['Cherry P. Manzano', 'Ms. Josephine T. Eduardo', '']);
      wsData.push(['CSD, Secretary', 'CSD, Chair', '']);

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Set column widths
      ws['!cols'] = [
        { wch: 30 }, // Name column
        { wch: 40 }, // In column
        { wch: 15 }, // Out column
        { wch: 20 }, // Signature column
        { wch: 30 }, // Extra columns for header info
        { wch: 30 }
      ];

      // Merge cells for header
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 3, c: 0 } }, // Merging first column for header info
        { s: { r: 0, c: 1 }, e: { r: 0, c: 3 } }, // Faculty Attendance title
        { s: { r: 1, c: 2 }, e: { r: 1, c: 3 } }, // Document Reference
        { s: { r: 2, c: 2 }, e: { r: 2, c: 3 } }, // Confidentiality Level
        { s: { r: 3, c: 2 }, e: { r: 3, c: 3 } }, // Review Cycle
      ];

      // Add worksheet to workbook
      const sheetName = `Attendance_${date}`;
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    // Generate Excel file
    XLSX.writeFile(wb, `Faculty_Attendance_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Attendance Management</h1>
        <p className="text-gray-500 mb-6">
          View and manage employee attendance records
        </p>
      </div>
      <div className="flex flex-row bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)]  outline-1 outline-offset-1 outline-black/10 gap-4 items-center">
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="">
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal border-none"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
            <Button onClick={() => setDate(undefined)} className=" mx-3 mb-2">
              Clear
            </Button>
          </PopoverContent>
        </Popover>
        <Select
          onValueChange={(value) => setPositionFilter(value)}
          value={positionFilter}
        >
          <SelectTrigger className="w-45 h-10 px-6 border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Positions">All Positions</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
          </SelectContent>
        </Select>
        <Button
          size="sm"
          className="bg-[#087830] hover:bg-[#065c24] text-white w-27.2 h-10 rounded-[10px] flex flex-row gap-3 px-3"
          onClick={handleExport}
        >
          <Download /> Export
        </Button>
      </div>

      <div className="mt-6 bg-white rounded-[10px] p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)]  outline-1 outline-offset-1 outline-black/10 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="text-[16px] font-extrabold">
              <TableHead>Date</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="w-50">Time In</TableHead>
              <TableHead className="w-50">Time Out</TableHead>
              <TableHead className="w-50 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.userId}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>
                    <PositionBadge position={record.position} />
                  </TableCell>
                  <TableCell>
                    {editingRecordId === index ? (
                      <Input
                        value={ampmTo24Hour(editedRecord?.timeIn)}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord!,
                            timeIn: e.target.value,
                          })
                        }
                        className="w-30"
                        type="time"
                      ></Input>
                    ) : record.timeIn ? (
                      record.timeIn
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRecordId === index ? (
                      <Input
                        value={ampmTo24Hour(editedRecord?.timeOut)}
                        onChange={(e) =>
                          setEditedRecord({
                            ...editedRecord!,
                            timeOut: e.target.value,
                          })
                        }
                        className="w-30"
                        type="time"
                      ></Input>
                    ) : record.timeOut ? (
                      record.timeOut
                    ) : (
                      "None"
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {editingRecordId === index ? (
                      <>
                        <Button
                          onClick={() => {
                            setEditingRecordId(-1);
                          }}
                          variant="link"
                        >
                          <X
                            color="#ca3a3a"
                            strokeWidth={2}
                            className="size-5"
                          />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditRecord();
                          }}
                          variant="link"
                        >
                          <Check strokeWidth={2} className="size-5" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditingRecordId(index);
                          setEditedRecord(record);
                        }}
                        variant="link"
                      >
                        <Pen color="#087830" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default AttendancePage;
