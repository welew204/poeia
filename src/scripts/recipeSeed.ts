import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

const frankFurterId = "1aea7045-8358-4e94-a846-14c276010669";

const createNegroni = async () => {
  // recipe
  const negroniRecipe = await db.recipe.create({
    data: {
      name: "Negroni",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  // elements
  const ginTerroirElement = await db.element.create({
    data: {
      name: "Gin",
      type: "spirit",
      brand: "St. George",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 750,
      unit: "ml",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  const campariElement = await db.element.create({
    data: {
      name: "Campari",
      type: "liquer",
      brand: "Campari",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 750,
      unit: "ml",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  const sweetVermouthElement = await db.element.create({
    data: {
      name: "Sweet Vermouth",
      type: "fortified wine",
      brand: "Carpano Antica Formula",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 750,
      unit: "ml",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  const orangeElement = await db.element.create({
    data: {
      name: "orange",
      type: "grocery",
      // brand: "generic",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 2,
      unit: "unit",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  const lowBallGlassElement = await db.element.create({
    data: {
      name: "low ball glass",
      type: "ware",
      // brand: "generic",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 4,
      unit: "unit",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  // steps + // elementInSteps
  const firstStep = await db.step.create({
    data: {
      action:
        "Combine equal parts of gin, sweet vermouth, and Campari in a mixing glass with ice. Stir until chilled. ",
      stepNumber: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: negroniRecipe.id,
        },
      },
    },
  });
  const firstStepGin = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "oz",
      step: {
        connect: {
          id: firstStep.id,
        },
      },
      element: {
        connect: {
          id: ginTerroirElement.id,
        },
      },
    },
  });
  const firstStepCampari = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "oz",
      step: {
        connect: {
          id: firstStep.id,
        },
      },
      element: {
        connect: {
          id: campariElement.id,
        },
      },
    },
  });
  const firstStepVermouth = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "oz",
      step: {
        connect: {
          id: firstStep.id,
        },
      },
      element: {
        connect: {
          id: sweetVermouthElement.id,
        },
      },
    },
  });
  const secondStep = await db.step.create({
    data: {
      action:
        "Pour into a lowball glass over ice or straight up, then garnish with a piece of orange peel.",
      stepNumber: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: negroniRecipe.id,
        },
      },
    },
  });
  const secondStepOrange = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "c:peel",
      step: {
        connect: {
          id: secondStep.id,
        },
      },
      element: {
        connect: {
          id: orangeElement.id,
        },
      },
    },
  });
  const secondStepLowball = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "unit",
      step: {
        connect: {
          id: secondStep.id,
        },
      },
      element: {
        connect: {
          id: lowBallGlassElement.id,
        },
      },
    },
  });
};

const createGnT = async () => {
  const gntRecipe = await db.recipe.create({
    data: {
      name: "Gin & Tonic",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  // elements
  let gin = await db.element.findFirst({
    where: {
      name: "Gin",
      userId: frankFurterId,
    },
    orderBy: {
      brand: "asc",
    },
  });
  if (!gin) {
    console.log("making gin!");
    gin = await db.element.create({
      data: {
        name: "Gin",
        type: "spirit",
        brand: "St. George",
        createdAt: new Date(),
        updatedAt: new Date(),
        quantity: 750,
        unit: "ml",
        user: {
          connect: {
            id: frankFurterId,
          },
        },
      },
    });
  }
  const tonic = await db.element.create({
    data: {
      name: "tonic",
      type: "dry good",
      brand: "Fever Tree",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 6,
      unit: "c:6oz bottle",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  const limeElement = await db.element.create({
    data: {
      name: "lime",
      type: "grocery",
      // brand: "generic",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 2,
      unit: "unit",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  const highBallGlassElement = await db.element.create({
    data: {
      name: "high ball glass",
      type: "ware",
      // brand: "generic",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 4,
      unit: "unit",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });
  // steps // elementInSteps
  const stepOne = await db.step.create({
    data: {
      action: "Fill a highball glass with ice, then add the gin.",
      stepNumber: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: gntRecipe.id,
        },
      },
    },
  });
  const stepOneGin = await db.elementInStep.create({
    data: {
      qty: 2,
      unit: "oz",
      step: {
        connect: {
          id: stepOne.id,
        },
      },
      element: {
        connect: {
          id: gin.id,
        },
      },
    },
  });
  const stepOneHighBall = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "unit",
      step: {
        connect: {
          id: stepOne.id,
        },
      },
      element: {
        connect: {
          id: highBallGlassElement.id,
        },
      },
    },
  });
  const stepTwo = await db.step.create({
    data: {
      action:
        "Top with the tonic water and gently stir. Garnish with lime wheels.",
      stepNumber: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: gntRecipe.id,
        },
      },
    },
  });
  const stepTwoTonic = await db.elementInStep.create({
    data: {
      qty: 4,
      unit: "oz",
      step: {
        connect: {
          id: stepTwo.id,
        },
      },
      element: {
        connect: {
          id: tonic.id,
        },
      },
    },
  });
  const stepTwoLime = await db.elementInStep.create({
    data: {
      qty: 2,
      unit: "c:slices",
      step: {
        connect: {
          id: stepTwo.id,
        },
      },
      element: {
        connect: {
          id: limeElement.id,
        },
      },
    },
  });
};

const createLemonDrop = async () => {
  const lemonDropRecipe = await db.recipe.create({
    data: {
      name: "Lemon Drop",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const sugar = await db.element.create({
    data: {
      name: "sugar",
      type: "dry good",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 64,
      unit: "oz",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const simpleSyrup = await db.element.create({
    data: {
      name: "simple syrup",
      type: "dry good",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 12,
      unit: "oz",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const lemon = await db.element.create({
    data: {
      name: "lemon",
      type: "grocery",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 3,
      unit: "unit",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const vodka = await db.element.create({
    data: {
      name: "Vodka",
      type: "spirit",
      brand: "Tito's",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 750,
      unit: "ml",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const tripleSec = await db.element.create({
    data: {
      name: "Triple Sec",
      type: "liquer",
      brand: "Cointreau",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 750,
      unit: "ml",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const martiniGlass = await db.element.create({
    data: {
      name: "martini glass",
      type: "ware",
      //brand: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: 4,
      unit: "unit",
      user: {
        connect: {
          id: frankFurterId,
        },
      },
    },
  });

  const firstStep = await db.step.create({
    data: {
      action:
        "Add sugar to a plate, then rub the zest into the sugar with your fingers until it is tinted yellow and fragrant.",
      stepNumber: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: lemonDropRecipe.id,
        },
      },
    },
  });

  const firstStepSugar = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "oz",
      step: {
        connect: {
          id: firstStep.id,
        },
      },
      element: {
        connect: {
          id: sugar.id,
        },
      },
    },
  });

  const firstStepLemon = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "c:peel", // designating a c: for custom (will mean NOT USED UP)
      step: {
        connect: {
          id: firstStep.id,
        },
      },
      element: {
        connect: {
          id: lemon.id,
        },
      },
    },
  });

  const secondStep = await db.step.create({
    data: {
      action:
        "Moisten the rim of a chilled martini glass with the juiced lemon, turn the glass upside down, twist into the lemon sugar, and set aside.",
      stepNumber: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: lemonDropRecipe.id,
        },
      },
    },
  });

  const secondStepLemon = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "c:juice", // designating a c: for custom (will mean NOT USED UP)
      step: {
        connect: {
          id: secondStep.id,
        },
      },
      element: {
        connect: {
          id: lemon.id,
        },
      },
    },
  });

  const secondStepMartiniGlass = await db.elementInStep.create({
    data: {
      qty: 1,
      unit: "unit",
      step: {
        connect: {
          id: secondStep.id,
        },
      },
      element: {
        connect: {
          id: martiniGlass.id,
        },
      },
    },
  });

  const thirdStep = await db.step.create({
    data: {
      action:
        "Add vodka, Cointreau (or triple sec), lemon juice, simple syrup, and a handful of ice to a cocktail shaker. Shake for 30 seconds or until very cold. Strain into the prepared martini glass and serve immediately.",
      stepNumber: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe: {
        connect: {
          id: lemonDropRecipe.id,
        },
      },
    },
  });

  const thirdStepVodka = await db.elementInStep.create({
    data: {
      qty: 2,
      unit: "oz", // designating a c: for custom
      step: {
        connect: {
          id: thirdStep.id,
        },
      },
      element: {
        connect: {
          id: vodka.id,
        },
      },
    },
  });

  const thirdStepTripleSec = await db.elementInStep.create({
    data: {
      qty: 0.75,
      unit: "oz", // designating a c: for custom
      step: {
        connect: {
          id: thirdStep.id,
        },
      },
      element: {
        connect: {
          id: tripleSec.id,
        },
      },
    },
  });

  const thirdStepLemonJuice = await db.elementInStep.create({
    data: {
      qty: 0.5,
      unit: "oz",
      step: {
        connect: {
          id: thirdStep.id,
        },
      },
      element: {
        connect: {
          id: lemon.id,
        },
      },
    },
  });

  const thirdStepSimpleSyrup = await db.elementInStep.create({
    data: {
      qty: 0.75,
      unit: "oz",
      step: {
        connect: {
          id: thirdStep.id,
        },
      },
      element: {
        connect: {
          id: simpleSyrup.id,
        },
      },
    },
  });
};

const createRecipes = async () => {
  await createLemonDrop();
  await createNegroni();
  await createGnT();
};

export default defineScript(async ({ env }) => {
  setupDb(env);
  await db.$executeRawUnsafe(`\
        DELETE FROM ElementInStep;
        DELETE FROM Element;
        DELETE FROM Step;
        DELETE FROM Recipe;
        DELETE FROM sqlite_sequence;
        `);

  await createRecipes();

  console.log("🌱 Finished seeding");
});
