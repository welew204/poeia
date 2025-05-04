import { db } from "src/db";
import { InteriorLayout } from "@/app/layouts/InteriorLayout"
import { ElementsTable } from "@/app/components/ElementsTable"
import { CreateElementDialog } from "@/app/components/CreateElementDialog"

const Elements = async () => {
    const elements = await db.element.findMany({
        include: {
            steps: {
                include: {
                    step: {
                        include: {
                            recipe: true
                        }
                    }
                }
            }
        }
    })

    return (
        <InteriorLayout>
            <div className="mt-2">
                <ElementsTable elements={elements}/>
                <div className="px-page-side center mt-2">
                    {/* <h1 className="page-title">All Elements</h1> */}
                <CreateElementDialog/>
                </div>
                {/* <pre>{JSON.stringify(elements, null, 2)}</pre> */}
            </div>
        </InteriorLayout>
        )
}

export { Elements }