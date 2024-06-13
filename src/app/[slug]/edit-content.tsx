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
import { EditContentSchema, EditContentSchemaType } from "@/lib/schemas/tool";
import { Textarea } from "@/components/ui/textarea";
import { editToolContent } from "@/lib/actions/tools";

function EditContentToolDialog({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<EditContentSchemaType>({
    resolver: zodResolver(EditContentSchema),
    defaultValues: {
      content,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: EditContentSchemaType) =>
      editToolContent(values, slug),
    onSuccess: async () => {
      toast.success("Tool updated successfully 🎉");
      router.push("/?openalternative%5BsortBy%5D=openalternative_locs_desc");
      setOpen((prev) => !prev);
    },
    onError: () => {},
  });

  const onSubmit = useCallback(
    (values: EditContentSchemaType) => {
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
            <span className={cn("text-red-500")}>Edit</span> Content
          </DialogTitle>
          <DialogDescription>
            Write what you know, you think, you like about this opensource.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type content here." {...field} />
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

export default EditContentToolDialog;
