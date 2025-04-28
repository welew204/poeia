import { Header } from "@/app/components/Header"
import { VoronoiPane } from "@/app/components/VoronoiPane"
import { InteriorLayout } from "@/app/layouts/InteriorLayout"
import { link } from "@/app/shared/links";

const Dashboard = () => {
    const children = [
        {
            label: "Bourbon",
            url: link("/"),
            color: "#b27041"
          },
          {
            label: "Tequila",
            url: link("/"),
            color: "#F5C9A5"
          },
          {
            label: "Gin",
            url: link("/"),
            color: "#ADD8E6"
          }          
    ];

    return (
        <InteriorLayout>
            <Header />
            <div className="w-full h-[80vh]">
                <VoronoiPane cellArray={children} />
            </div>
        </InteriorLayout>
    )
  }
  
  export { Dashboard }