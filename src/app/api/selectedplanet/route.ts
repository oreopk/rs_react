import { NextRequest, NextResponse } from "next/server";

export interface PlanetsListItem {
  uid: string;
  name: string;
  url: string;
}

export async function POST(request: NextRequest) {
  const { items = [] } = await request.json();
  const name_column = "id,name,url \r\n";
  const download_data = items
    .map(
      (items: PlanetsListItem, id: number) =>
        id + 1 + "," + items.name + "," + items.url,
    )
    .join("\r\n");
  const csvdata = name_column + download_data;
  return NextResponse.json({ csvdata });
}
