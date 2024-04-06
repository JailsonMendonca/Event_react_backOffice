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
import { ChangeEvent, useState, useEffect} from "react";
//import { attendees } from '../data/attendees';

dayjs.extend(relativeTime)
dayjs.locale('pt') 

interface Attendee {
  code: string
  name: string
  email: string
  createAt: string
  checkInAt: string | null
}

export const AttendeesList = () => {

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? ""
    }
    return ""
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"))
    }
    return 1
  })

  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    const url = new URL(`http://localhost:3333/events/fac18671-cf20-4f37-809c-14961dcd70f8/attendees`) 

    url.searchParams.set("pageIndex", String(page - 1))
    if (search.length > 0) {
      url.searchParams.set("query", search) 
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAttendees(data.attendees)
        setTotal(data.total)
      })
  }, [page, search])
  
  const totalPage = Math.ceil(total / 10);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set("search", search)

    window.history.pushState({}, "", url)
    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set("page", String(page))

    window.history.pushState({}, "", url) 
    setPage(page)
  }

  function onSeachInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }


  function goToNextPage() {
    setCurrentPage(page +1)
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  function goToFristPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(totalPage)
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
        className="bg-transparent flex-1 h-auto border-0 
          outline-none p-0 text-sm focus:ring-0"
        value={search}
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

      {attendees.map((attendee) => {
       return (
         <TableRow key={attendee.code} >
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
             {attendee.code}
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
            <div className="flex flex-col gap-1">
               <span className="font-semibold text-white">{attendee.name}</span>
               <span>{attendee.email}</span>
            </div>
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
             {dayjs().to(attendee.createAt)}
          </TableCell>
          <TableCell className="py-3 px-4 text-sm text-zinc-300">
             {attendee.checkInAt === null ?
               <span className="text-zinc-500">Não fez check-in </span> :
               dayjs().to(attendee.checkInAt)}
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
             Mostrando {attendees.length} de {total} participantes
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
