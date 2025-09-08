import { Header } from "@/app/components/Header"

const InteriorLayout = ({ children, page }: { children: React.ReactNode, page: string}) => {
    return (
      <div className="page-wrapper">
        <main className="page bg-white">
          <Header page={page}/>
            <div>
              {children}
            </div>
        </main>
      </div>
    )
  }
  
  export { InteriorLayout }