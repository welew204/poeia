const InteriorLayout = ({ children }: { children: React.ReactNode}) => {
    return (
      <div className="page-wrapper">
        <main className="page bg-white">
          {children}
        </main>
      </div>
    )
  }
  
  export { InteriorLayout }