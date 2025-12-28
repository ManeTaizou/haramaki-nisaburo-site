/**
 * 腹巻二三郎の漫画エピソード情報
 */

export type Episode = {
  id: number;
  slug: string; // 例: "shigoto-sagashi"
  title: string; // 例: "仕事探しの巻"
  format: "1コマ" | "2コマ" | "4コマ" | "10コマ";
  thumbnail: string; // public 配下の画像パス
  description?: string; // あれば短い説明
};

/**
 * エピソード一覧
 */
export const episodes: Episode[] = [
  {
    id: 1,
    slug: "shigoto-sagashi",
    title: "仕事探しの巻",
    format: "10コマ",
    thumbnail: "/IMG_2726 2.PNG",
    description: "腹巻二三郎が仕事探しを始める10コマ漫画。",
  },
  {
    id: 2,
    slug: "4koma-vol1",
    title: "4コマ Vol.1",
    format: "4コマ",
    thumbnail: "/4koma/vol1/1コマ目完成.jpg",
    description: "腹巻二三郎の4コマ漫画。",
  },
  {
    id: 3,
    slug: "4koma-vol2",
    title: "4コマ Vol.2",
    format: "4コマ",
    thumbnail: "/4koma/vol2/4koma-2-1.jpg",
    description: "腹巻二三郎の4コマ漫画 第2弾。",
  },
];
