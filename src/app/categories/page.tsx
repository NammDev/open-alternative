import { CategoryRecord } from "@/components/app-ui/CategoryRecord";
import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { getCategories } from "@/lib/actions/categories";
import CreateCategoryDialog from "./create-category";

const meta = {
  title: "Open Source Software Categories",
  description:
    "Browse top categories to find your best Open Source software options.",
};

export default async function CategoriesIndex() {
  const categories = await getCategories();

  return (
    <>
      <Intro {...meta} />
      <CreateCategoryDialog />;
      <Grid className="md:gap-8">
        {categories.map((category) => (
          <CategoryRecord key={category.id} category={category} />
        ))}
        {!categories.length && (
          <p className="col-span-full">No categories found.</p>
        )}
      </Grid>
    </>
  );
}
