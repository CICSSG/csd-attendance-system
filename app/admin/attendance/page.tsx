import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Pen, SearchIcon } from 'lucide-react'
import React from 'react'

const AttendancePage = () => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl'>Attendance Management</h1>
        <p className='text-gray-500 mb-6'>View and manage employee attendance records</p>
      </div>
      <div className='flex flex-row bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)]  outline-1 outline-offset-1 outline-black/10 gap-4 items-center'>
        <InputGroup className='border-none'>
          <InputGroupInput placeholder="Search by name or user ID..." className='focus-visible:ring-0' />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Select defaultValue="All Positions">
          <SelectTrigger className="w-45 h-10 px-6 border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Positions">All Positions</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" className="bg-[#087830] hover:bg-[#065c24] text-white w-27.2 h-10 rounded-[10px] flex flex-row gap-3 px-3">
          <Download /> Export
        </Button>
      </div>

      <div className='mt-6 bg-white rounded-[10px] p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)]  outline-1 outline-offset-1 outline-black/10 pb-0'>
        <Table>
          <TableHeader>
            <TableRow className='text-[16px] font-extrabold'>
              <TableHead>Date</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Dec 26, 2025</TableCell>
              <TableCell>EMP001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell><div className='bg-[#DCFCE7] text-[#016630] rounded-full px-2.75 py-1 w-fit'>Full-time</div></TableCell>
              <TableCell>08:00 AM</TableCell>
              <TableCell>05:00 PM</TableCell>
              <TableCell><Button variant="link"><Pen color='#087830' /></Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}
export default AttendancePage