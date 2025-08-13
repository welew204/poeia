import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";

export default defineScript(async ({ env }) => {
  setupDb(env);

  await db.$executeRawUnsafe(`\
    DELETE FROM User;
    DELETE FROM Element;
    DELETE FROM Recipe;
    DELETE FROM Step;
    DELETE FROM Credential
    DELETE FROM sqlite_sequence;
  `);

  await db.user.create({
    data: {
      id: "1",
      username: "testuser",
      firstName: "Dillon",
      lastName: "Westbrook",
    },
  });

  console.log("🌱 Finished seeding");
});
