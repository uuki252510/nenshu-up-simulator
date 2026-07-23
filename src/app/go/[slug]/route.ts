import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.redirect(service.url, 302);
}
