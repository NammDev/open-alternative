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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  EditToolSchema,
  EditToolSchemaType,
  EditToolTechnologySchema,
  EditToolTechnologySchemaType,
} from "@/lib/schemas/tool";
import { editTool, editToolTech } from "@/lib/actions/tools";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { getTechnologies } from "@/lib/actions/technology";

function AddTechToToolDialog({
  slug,
  technologiesByTool,
}: {
  slug: string;
  technologiesByTool: any;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const technologiesQuery = useQuery({
    queryKey: ["technologies"],
    queryFn: () => getTechnologies(),
  });
  const technologies = technologiesQuery.data || [];

  const form = useForm<EditToolTechnologySchemaType>({
    resolver: zodResolver(EditToolTechnologySchema),
    defaultValues: {
      technologies: technologiesByTool.map(
        (technology: any) => technology.technologyId,
      ),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: EditToolTechnologySchemaType) =>
      editToolTech(values, slug),
    onSuccess: async () => {
      toast.success("Tool updated successfully 🎉");
      router.push("/?openalternative%5BsortBy%5D=openalternative_locs_desc");
      setOpen((prev) => !prev);
    },
    onError: () => {},
  });

  const onSubmit = useCallback(
    (values: EditToolTechnologySchemaType) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-6 gap-2 text-sm">
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className={cn("text-red-500")}>Add</span> Technologies
          </DialogTitle>
          <DialogDescription>
            Technologies is something like prisma, supabase, etc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="technologies"
              render={() => (
                <FormItem className="mb-4 w-full">
                  <div className="mb-4"></div>
                  <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
                    {technologies.map((technology) => (
                      <FormField
                        key={technology.id}
                        control={form.control}
                        name="technologies"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={technology.id}
                              className="col-span-1 flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(technology.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = field.value || []; // Ensure field.value is an array
                                    if (checked) {
                                      field.onChange([
                                        ...updatedValue,
                                        technology.id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        updatedValue.filter(
                                          (value) => value !== technology.id,
                                        ),
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal hover:cursor-pointer">
                                {technology.name}
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
              className="bg-background"
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

export default AddTechToToolDialog;
