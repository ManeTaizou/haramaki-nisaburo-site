/**
 * 登場人物情報
 */

export type Character = {
  id: number;
  slug: string; // 例: "nisaburo"
  name: string; // 例: "腹巻二三郎"
  nameKana: string; // 例: "はらまき にさぶろう"
  thumbnail: string; // public 配下の画像パス
  description: string; // 短い説明
};

/**
 * キャラクター一覧
 */
export const characters: Character[] = [
  {
    id: 1,
    slug: "nisaburo",
    name: "腹巻二三郎",
    nameKana: "はらまき にさぶろう",
    thumbnail: "/characters/nisaburo/front.png",
    description: "30代独身。昼寝と腹巻が好きな、どこか抜けた主人公。",
  },
];
