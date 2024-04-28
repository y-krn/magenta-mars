import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Page = Extract<
  PageObjectResponse,
  { properties: Record<string, unknown> }
>;

type ExtractedType<T, K extends keyof T, V extends T[K]> = Extract<
  T,
  { [P in K]: V }
>;

type PropertyValueMap = Page["properties"];
type PropertyValue = PropertyValueMap[string];

export type PropertyValueTitle = ExtractedType<PropertyValue, "type", "title">;
export type PropertyValueRichText = ExtractedType<
  PropertyValue,
  "type",
  "rich_text"
>;
export type PropertyValueMultiSelect = ExtractedType<
  PropertyValue,
  "type",
  "multi_select"
>;
export type PropertyValueUrl = ExtractedType<PropertyValue, "type", "url">;
export type PropertyValueDate = ExtractedType<PropertyValue, "type", "date">;
export type PropertyValueEditedTime = ExtractedType<
  PropertyValue,
  "type",
  "last_edited_time"
>;

export type Block = (
  | Extract<BlockObjectResponse, { type: string }>
  | ListItemBlock
) & { children?: Block[] };

export type ParagraphBlock = ExtractedType<Block, "type", "paragraph">;
export type Heading1Block = ExtractedType<Block, "type", "heading_1">;
export type Heading2Block = ExtractedType<Block, "type", "heading_2">;
export type Heading3Block = ExtractedType<Block, "type", "heading_3">;
export type QuoteBlock = ExtractedType<Block, "type", "quote">;
export type EquationBlock = ExtractedType<Block, "type", "equation">;
export type CodeBlock = ExtractedType<Block, "type", "code">;
export type CalloutBlock = ExtractedType<Block, "type", "callout">;
export type ToggleBlock = ExtractedType<Block, "type", "toggle">;
export type EmbedBlock = ExtractedType<Block, "type", "embed">;
export type BookmarkBlock = ExtractedType<Block, "type", "bookmark">;
export type ImageBlock = ExtractedType<Block, "type", "image">;
export type ColumnListBlock = ExtractedType<Block, "type", "column_list">;
export type ColumnBlock = ExtractedType<Block, "type", "column">;

export type HeadingBlock = Heading1Block | Heading2Block | Heading3Block;

export type RichText = ParagraphBlock["paragraph"]["rich_text"][number];
export type File = ImageBlock["image"];
export type ListItemBlock = {
  id: string;
  type: "bulleted_list" | "numbered_list";
  blocks: Block[];
  has_children: boolean;
};
export type BulletedListItemBlock = ExtractedType<
  Block,
  "type",
  "bulleted_list_item"
>;
export type NumberedListItemBlock = ExtractedType<
  Block,
  "type",
  "numbered_list_item"
>;
