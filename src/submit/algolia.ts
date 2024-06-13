import { getTools } from "@/lib/actions/tools";
import algoliasearch from "algoliasearch";

async function main() {
  const client = algoliasearch(
    "CZZ39RC5EV",
    "75c1124d94150815d93181fc9a31724d",
  );

  const tools = await getTools();
  const index = client.initIndex("openalternative");

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
