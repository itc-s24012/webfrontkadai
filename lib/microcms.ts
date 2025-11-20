import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries, MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

// ... (Characterの型定義などは変更なし) ...
export type Character = {
  id: string;
  characterId: string;
  name: string;
  image?: MicroCMSImage;
  rarity: '★★★★★' | '★★★★';
  element: string;
  description: string;
  weapon?: string;     // 武器種
  origin?: string;     // 出身地
  affiliation?: string;// 所属
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// キャラクター一覧を取得 (変更なし)
export const getCharacterList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Character>({
    endpoint: "characters",
    queries,
  });
  return listData;
};

// 【ここを修正】コンテンツIDを指定してキャラクターを1件取得
export const getCharacterDetail = async (
  contentId: string, // 引数を contentId に変更
  queries?: MicroCMSQueries
) => {
  const detailData = await client.get<Character>({ // getListDetail から get に変更
    endpoint: "characters",
    contentId, // 受け取った contentId をそのまま渡す
    queries,
  });
  return detailData;
};