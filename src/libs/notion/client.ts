import { Client } from "@notionhq/client";
import type { Block, Page, PropertyValueTitle } from "./types";

export async function getPages(): Promise<Page[]> {
  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_ID,
    filter: {
      property: "ステータス",
      status: {
        equals: "公開済み",
      },
    },
  });
  return response.results as Page[];
}

export async function getPosts(blockId: string): Promise<Block[]> {
  const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
  const response = await notion.blocks.children.list({ block_id: blockId });
  return await getChildren(response.results as Block[]);
}

async function getChildren(blocks: Block[]): Promise<Block[]> {
  return Promise.all(
    blocks.map(async (block) => {
      return block.has_children
        ? { ...block, children: await getPosts(block.id) }
        : block;
    }),
  );
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
