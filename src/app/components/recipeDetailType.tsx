import { Prisma } from "@prisma/client"

// 1. Define the inclusion of steps and their elements (including the Element's data)
const recipeWithDetails = Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: { 
      steps: { 
        include: { 
          elements: { include: { element: true } } 
        } 
      } 
    },
  })
  
  // 2. Use Prisma's utility to get the corresponding type
export type RecipeWithDetails = Prisma.RecipeGetPayload<typeof recipeWithDetails>
// TODO move this to a separate file