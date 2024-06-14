"use server";
import { getTools } from "@/lib/actions/tools";
import algoliasearch from "algoliasearch";

export const updateAlgolia = async () => {
  const client = algoliasearch(
    "CZZ39RC5EV",
    "75c1124d94150815d93181fc9a31724d",
  );

  const tools = await getTools();
  const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);

  Promise.all([
    index.clearObjects(),
    index
      .saveObjects(tools, {
        autoGenerateObjectIDIfNotExist: true,
      })
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      }),
  ]);
};
