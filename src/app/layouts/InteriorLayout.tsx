import { Header } from "@/app/components/Header"

const InteriorLayout = ({ children }: { children: React.ReactNode}) => {
    return (
      <div className="page-wrapper">
        <main className="page bg-white">
          <Header/>
            <div>
              {children}
            </div>
        </main>
      </div>
    )
  }
  
  export { InteriorLayout }