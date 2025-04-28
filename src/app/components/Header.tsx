import { link } from "@/app/shared/links";
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
import { Settings } from 'lucide-react';

const Header = () => {
    return (
      <header className="py-5 px-page-side h-20 flex justify-between items-center border-b-1 border-border mb-12">
        {/* left side */}
        <div className="flex items-center gap-8">
            <a href={link("/")} className="flex items-center gap-3 font-display font-bold text-3xl">
                <img src="/images/mixopoeiaLogo2.svg" alt="mixopoeia" 
                    //className="pt-5 -mb-3"
                    className="h-12 w-auto"
                />
                <span>mixo.poeia</span>
            </a>
            <nav>
                <ul>
                <li><a href={link("/applications")}>Dashboard</a></li>
                </ul>
            </nav>
        </div>
  
        {/* right side */}
        <nav>
            <ul className="flex items-center gap-7">
                <li><a href={link("/user/logout")}>Logout</a></li>
                <li><a href="#"><Settings/></a></li>
            </ul>
        </nav>
        
      </header>
    )
  }

export { Header }