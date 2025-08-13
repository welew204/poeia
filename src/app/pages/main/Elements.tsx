import { db } from "@/db";
import { InteriorLayout } from "@/app/layouts/InteriorLayout";
import { ElementsTable } from "@/app/components/ElementsTable";
import { CreateElementDialog } from "@/app/components/CreateElementDialog";

const Elements = async ({ request }: { request: Request }) => {
  const elements = await db.element.findMany({
    include: {
      steps: {
        include: {
          step: {
            include: {
              recipe: true,
            },
          },
        },
      },
    },
  });

  const url = new URL(request.url);
  const search = url.searchParams.get("query") || "";

  const fixedElements = elements.map((el) => ({
    ...el,
    steps: el.steps?.map((eis) => ({
      ...eis,
      // issue was qty coming in as a Decimal which is a Prisma type, not a number
      qty: eis.qty?.toNumber?.() ?? null,
    })),
  }));

  return (
    <InteriorLayout>
      <div className="mt-2">
        <ElementsTable elements={fixedElements} initialSearch={search} />
        <div className="px-page-side center mt-2">
          {/* <h1 className="page-title">All Elements</h1> */}
          <CreateElementDialog />
        </div>
        {/* <pre>{JSON.stringify(elements, null, 2)}</pre> */}
      </div>
    </InteriorLayout>
  );
};

export { Elements };
