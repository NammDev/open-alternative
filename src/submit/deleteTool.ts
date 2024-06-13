import { db } from "@/lib/db";

async function main() {
  const tool = await db.tool.findFirst({
    where: { slug: "penx" },
  });
  if (!tool) return console.log("Tool not found");

  Promise.all([
    db.topicToTool.deleteMany({
      where: { toolId: tool.id },
    }),
    db.topicToTool.deleteMany({
      where: { toolId: tool.id },
    }),
    db.categoryToTools.deleteMany({
      where: { toolId: tool.id },
    }),
    db.languageToTool.deleteMany({
      where: { toolId: tool.id },
    }),
    db.technologyToTool.deleteMany({
      where: { toolId: tool.id },
    }),
    db.tool.delete({
      where: { id: tool.id },
    }),
  ]);

  console.log("Tool deleted", tool.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
