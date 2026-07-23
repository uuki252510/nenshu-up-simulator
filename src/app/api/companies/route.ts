import { NextResponse } from "next/server";
import { matchCompanies } from "@/lib/companies";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const lower = Number(params.get("lower"));
  const upper = Number(params.get("upper"));
  const estimate = Number(params.get("estimate"));
  const industry = params.get("industry") ?? "";
  const occupation = params.get("occupation") ?? "";

  if (
    !Number.isFinite(lower) ||
    !Number.isFinite(upper) ||
    !Number.isFinite(estimate) ||
    lower <= 0 ||
    upper < lower
  ) {
    return NextResponse.json({ error: "invalid params" }, { status: 400 });
  }

  const result = matchCompanies(
    // matchCompanies は SimulatorResult のうち lower/upper/estimate のみ参照する
    { lower, upper, estimate } as Parameters<typeof matchCompanies>[0],
    industry,
    occupation || undefined,
  );
  return NextResponse.json(result);
}
