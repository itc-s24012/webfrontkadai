import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries, MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

// キャラクターの型定義
export type Character = {
  id: string;
  characterId: string;
  name: string;
  image?: MicroCMSImage;
  rarity: '★★★★★' | '★★★★';
  element: string;
  description: string;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// キャラクター一覧を取得
export const getCharacterList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Character>({
    endpoint: "characters",
    queries,
  });
  return listData;
};

// characterIdを指定してキャラクターを1件取得
export const getCharacterDetail = async (
  characterId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Character>({
    endpoint: "characters",
    contentId: characterId,
    queries,
  });
  return detailData;
};