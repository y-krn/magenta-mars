import type { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Page = Extract<
    PageObjectResponse,
    { properties: Record<string, unknown> }
>;

type PropertyValueMap = Page["properties"];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue["type"];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
    PropertyValue,
    { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<"title">;
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export type PropertyValueMultiSelect = ExtractedPropertyValue<"multi_select">;
export type PropertyValueUrl = ExtractedPropertyValue<"url">;
export type PropertyValueDate = ExtractedPropertyValue<"date">;
export type PropertyValueEditedTime =
    ExtractedPropertyValue<"last_edited_time">;

export type Block = Extract<BlockObjectResponse, { type: string }> | ListItemBlock;

export type BlockType = Block["type"];

type ExtractedBlockType<TType extends BlockType> = Extract<
    Block,
    { type: TType }
>;

export type ParagraphBlock = ExtractedBlockType<"paragraph">;

export type Heading1Block = ExtractedBlockType<"heading_1">;
export type Heading2Block = ExtractedBlockType<"heading_2">;
export type Heading3Block = ExtractedBlockType<"heading_3">;

export type HeadingBlock =
    | Heading1Block
    | Heading2Block
    | Heading3Block;

export type ListItemBlock = {
    type: "bulleted_list" | "numbered_list";
    blocks: Block[]
}

export type BulletedListItemBlock = ExtractedBlockType<"bulleted_list_item">;
export type NumberedListItemBlock = ExtractedBlockType<"numbered_list_item">;

export type QuoteBlock = ExtractedBlockType<"quote">;
export type EquationBlock = ExtractedBlockType<"equation">;
export type CodeBlock = ExtractedBlockType<"code">;
export type CalloutBlock = ExtractedBlockType<"callout">;
export type ToggleBlock = ExtractedBlockType<"toggle">;
export type EmbedBlock = ExtractedBlockType<"embed">;
export type WebBookmarkBlock = ExtractedBlockType<"bookmark">;
export type ImageBlock = ExtractedBlockType<"image">;

export type RichText = ParagraphBlock["paragraph"]["rich_text"][number];
export type File = ImageBlock["image"];
