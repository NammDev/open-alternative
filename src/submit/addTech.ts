import { db } from "@/lib/db";
import { getOg } from "@/lib/utils/og";
import slugify from "slugify";

type TechnologySubmit = {
  name: string;
  website: string;
};

const technologies: TechnologySubmit[] = [
  {
    name: "Uploadthing",
    website: "https://uploadthing.com/",
  },
  {
    name: "Contentlayer",
    website: "https://contentlayer.dev/",
  },
  //   {
  //     name: "",
  //     website: "",
  //   },
  //   {
  //     name: "",
  //     website: "",
  //   },
  //   {
  //     name: "",
  //     website: "",
  //   },
];

export async function createTechnology(technology: TechnologySubmit) {
  const ogData = await getOg(technology.website);
  const description = ogData?.description as string;
  //@ts-ignore
  const faviconUrl = `${technology.website}${ogData.favIconImage}`;
  const name = technology.name;

  try {
    const newTech = await db.technology.create({
      data: {
        name: name,
        slug: slugify(name),
        website: technology.website,
        description,
        faviconUrl,
      },
    });
    console.log(`Created tool ${name}`);
  } catch (error) {
    console.log(`Error in create tool ${name}`);
  }
}

async function main() {
  Promise.all(technologies.map(createTechnology));
}

// name        String
// slug        String             @unique
// description String?
// website     String             @unique
// faviconUrl  String?

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});
