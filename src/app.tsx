import { AttendeesList } from "./componets/attendees-list";
import { Header } from "./componets/header";

export function App() {

  return (
    <div className="max-w-[1116px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <AttendeesList/>
    </div>
  )
}


