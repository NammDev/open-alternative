"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateToolSchema, CreateToolSchemaType } from "@/lib/schemas/tool";
import { Button } from "@/components/app-ui/Button";
import { createTool } from "@/lib/actions/tools";
import { useRouter } from "next/navigation";

export function CreateToolForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  // react-hook-form
  const form = useForm<CreateToolSchemaType>({
    resolver: zodResolver(CreateToolSchema),
    defaultValues: {
      content: "Content",
    },
  });

  async function onSubmit(data: CreateToolSchemaType) {
    setLoading(true);
    try {
      await createTool(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      router.push("/submit");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-xl gap-6 grid-auto-fill-xs"
      >
        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormLabel className="block text-sm font-semibold text-foreground after:ml-0.5 after:text-red-600 after:content-['*'] [&[for]]:cursor-pointer">
                  Name:
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="PostHog" />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <>
                <FormLabel className="block text-sm font-semibold text-foreground after:ml-0.5 after:text-red-600 after:content-['*'] [&[for]]:cursor-pointer">
                  {" "}
                  Website:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://posthog.com"
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="repository"
            render={({ field }) => (
              <>
                <FormLabel className="block text-sm font-semibold text-foreground after:ml-0.5 after:text-red-600 after:content-['*'] [&[for]]:cursor-pointer">
                  Repository:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://github.com/posthog/posthog"
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <>
                <FormLabel className="block text-sm font-semibold text-foreground">
                  Youtube:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=zfAb95tJvZQ"
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormLabel className="block text-sm font-semibold text-foreground">
                  Content:
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="A platform that helps engineers build better products"
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </div>

        <div>
          <Button disabled={loading} className="min-w-32">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
