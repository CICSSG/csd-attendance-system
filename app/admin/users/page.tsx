import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pen, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const UserSettings = () => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl'>User Settings</h1>
        <p className='text-gray-500 mb-6'>Manage system users and their information</p>
      </div>
      <Button size="sm" className="bg-[#087830] hover:bg-[#065c24] text-white w-27.2 h-10 rounded-[10px] flex flex-row gap-3 px-4 text-md font-light">
        <Plus className='size-5' />Add User
      </Button>
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
              <TableCell><Button variant="link"><Pen color='#087830' /></Button><Button variant="link"><Trash2 color='#E7000B' /></Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default UserSettings