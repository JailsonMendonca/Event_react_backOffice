import Icon from "../assets/icon.svg"
import { NavKink } from "./nav-kink"


export const Header = () => {
  return (
   <div className="flex items-center gap-5 py-2">
      <img src={Icon} alt="icon" />
      
     <nav className="flex items-center gap-5">
        <NavKink href="">
          Evento
        </NavKink>
        <NavKink  href="">
          Participantes
        </NavKink>
     </nav>
    </div>
  )
}
