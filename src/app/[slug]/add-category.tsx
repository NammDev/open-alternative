"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EditToolSchema, EditToolSchemaType } from "@/lib/schemas/tool";
import { editTool } from "@/lib/actions/tools";
import { Checkbox } from "@/components/ui/checkbox";
import { getCategories } from "@/lib/actions/categories";
import { getCategoriesTool } from "@/lib/actions/categorytotool";
import { useRouter } from "next/navigation";

function AddCategoryToToolDialog({
  slug,
  categoriesByTool,
}: {
  slug: string;
  categoriesByTool: any;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const categories = categoriesQuery.data || [];

  const form = useForm<EditToolSchemaType>({
    resolver: zodResolver(EditToolSchema),
    defaultValues: {
      categories: categoriesByTool.map((category: any) => category.categoryId),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: EditToolSchemaType) => editTool(values, slug),
    onSuccess: async () => {
      toast.success("Tool updated successfully 🎉");
      router.push("/");
      setOpen((prev) => !prev);
    },
    onError: () => {},
  });

  const onSubmit = useCallback(
    (values: EditToolSchemaType) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-8 gap-2 text-sm">
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className={cn("m-1 text-red-500")}>Add</span> Categories
          </DialogTitle>
          <DialogDescription>
            Categories is something like admin, learning, ecommerce, etc <br />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem className="mb-4 w-full">
                  <div className="mb-4"></div>
                  <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
                    {categories.map((category) => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category.id}
                              className="col-span-1 flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = field.value || []; // Ensure field.value is an array
                                    if (checked) {
                                      field.onChange([
                                        ...updatedValue,
                                        category.id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        updatedValue.filter(
                                          (value) => value !== category.id,
                                        ),
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal hover:cursor-pointer">
                                {category.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button
              className="bg-slate-100"
              type="button"
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-black text-white"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryToToolDialog;
