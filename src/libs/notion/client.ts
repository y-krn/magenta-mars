import { Client } from "@notionhq/client";
import type { Block, Page, PropertyValueTitle } from "./types";

export async function getPages() {
  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_ID,
  });
  return response.results as Page[];
}

export async function getPosts(blockId: string) {
  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return response.results as Block[];
}

export async function getTitleProperty(
  page: Page,
): Promise<PropertyValueTitle> {
  const titleProperty = Object.values(page.properties).find(
    (property) => property.type === "title",
  );
  if (!titleProperty || titleProperty.type !== "title") {
    throw new Error("Title property not found");
  }
  return titleProperty;
}
