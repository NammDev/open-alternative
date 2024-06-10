import { getTools } from "@/lib/actions/tools";

export async function GET(request: Request) {
  const tools = await getTools();
  return Response.json(tools);
}
