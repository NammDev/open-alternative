import { getTools } from "@/lib/actions/tools";
import algoliasearch from "algoliasearch";

async function main() {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_API_KEY!,
  );

  const tools = await getTools();
  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);

  await index.clearObjects();

  await index
    .saveObjects(tools, {
      autoGenerateObjectIDIfNotExist: true,
    })
    .then(({ objectIDs }) => {
      console.log(objectIDs);
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});
