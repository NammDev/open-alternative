"use client";

import { Button } from "@/components/app-ui/Button";
import { updateAlgolia } from "@/submit/algolia";
import { RefreshCwIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function UpdateAlgolia() {
  const [isPending, startTransition] = useTransition();

  async function refreshAlgolia() {
    await updateAlgolia();
    toast("Algolia index updated");
  }

  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            refreshAlgolia();
          });
        }}
      >
        <RefreshCwIcon />
      </Button>
    </div>
  );
}
