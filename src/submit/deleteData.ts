import { db } from "@/lib/db";

async function main() {
  // await db.technologyToTool.deleteMany();
  // await db.categoryToTools.deleteMany();
  // await db.topicToTool.deleteMany();
  // await db.languageToTool.deleteMany();
  // await db.category.deleteMany();
  // await db.topic.deleteMany();
  // await db.tool.deleteMany();
  // await db.topic.deleteMany();
  // await db.language.deleteMany();
  // await db.technology.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
