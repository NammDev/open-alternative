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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  EditDescriptionSchema,
  EditDescriptionSchemaType,
} from "@/lib/schemas/tool";
import { editToolDescription } from "@/lib/actions/tools";

function EditDescriptionDialog({
  slug,
  description,
}: {
  slug: string;
  description: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<EditDescriptionSchemaType>({
    resolver: zodResolver(EditDescriptionSchema),
    defaultValues: {
      description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: EditDescriptionSchemaType) =>
      editToolDescription(values, slug),
    onSuccess: async () => {
      toast.success("Tool updated successfully 🎉");
      router.push("/?openalternative%5BsortBy%5D=openalternative_locs_desc");
      setOpen((prev) => !prev);
    },
    onError: () => {},
  });

  const onSubmit = useCallback(
    (values: EditDescriptionSchemaType) => {
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
            <span className={cn("text-red-500")}>Edit</span> Description
          </DialogTitle>
          <DialogDescription>
            Description of opensource, github page, overall website, etc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type description here." {...field} />
                  </FormControl>
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

export default EditDescriptionDialog;
