import {
 Search,
 MoreHorizontal,
 ChevronLeft,
 ChevronsLeft,
 ChevronRight,
 ChevronsRight,
} from "lucide-react"
import dayjs from "dayjs";
import 'dayjs/locale/pt';
import relativeTime from "dayjs/plugin/relativeTime";
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from './table/table-cell';
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime)
dayjs.locale('pt') 

export const AttendeesList = () => {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  
  const totalPage = Math.ceil(attendees.length / 10);

  function onSeachInputChanged(event: ChangeEvent<HTMLInputElement>) {
   setSearch(event.target.value)
  }


  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToFristPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPage)
  }

 return (
  <div className="flex flex-col gap-4">
   <div className="flex  gap-3 items-center">
     <h1 className="text-2xl font-bold">Participante</h1>
     <div className="px-3 py-1.5 border w-22 text-sm
     border-white/10 rounded-lg flex items-center gap-3"
     >
      <Search className="size-4 text-emerald-300"/>
      <input
        onChange={onSeachInputChanged}
        className="bg-transparent flex-1 h-auto border-0 outline-none p-0 text-sm"
        placeholder="Pesquisar participantes..."
     />
     </div>
   </div>
    <Table>
    <thead>
      <tr className="border-b border-white/10">
        <TableHeader style={{ width: 48 }}>
          <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10"/>
        </TableHeader>
        <TableHeader>Código</TableHeader>
        <TableHeader>Participante</TableHeader>
        <TableHeader>Data de inscrição</TableHeader>
        <TableHeader>Data de check-in</TableHeader>
        <TableHeader style={{ width: 48 }}></TableHeader>
      </tr>
    </thead>
     <tbody>

         {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
       return (
         <TableRow key={attendee.id} >
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
             {attendee.id}
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
            <div className="flex flex-col gap-1">
               <span className="font-semibold text-white">{attendee.name}</span>
               <span>{attendee.email}</span>
            </div>
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
             {dayjs().to(attendee.createdAt)}
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
             {dayjs().to(attendee.checkedInAt)}
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
            <IconButton transparent>
              <MoreHorizontal className="size-4" />
            </IconButton>
          </TableCell>
      </TableRow>
       )}
    )}
    </tbody>

    <tfoot>
     <TableRow>
       <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
             Mostrando 10 de {attendees.length} participantes
        </TableCell>
       <TableCell className="text-right" colSpan={3}>
       <div className=" inline-flex items-center gap-8">
            <span>Página {page} de {totalPage}</span>
         <div className="flex gap-1.5">
          <IconButton onClick={goToFristPage} disabled={page === 1}>
           <ChevronsLeft className="size-4" />
          </IconButton>
          <IconButton onClick={goToPreviousPage} disabled={page === 1}>
           <ChevronLeft className="size-4" />
          </IconButton>
          <IconButton onClick={goToNextPage} disabled={page === totalPage}>
           <ChevronRight className="size-4" />
          </IconButton>
          <IconButton onClick={goToLastPage} disabled={page === totalPage}>
           <ChevronsRight className="size-4" />
          </IconButton>
         </div>
        </div>
       </TableCell>
     </TableRow>
    </tfoot>
   </Table>
  </div>
  )
}
