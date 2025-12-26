"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Heart, MessageCircle, X, Send, ThumbsUp } from "lucide-react";
import Footer from "@/components/Footer";
import HamburgerMenu from "@/components/HamburgerMenu";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  isPending: boolean;
  replies?: Comment[];
}

export default function ShigotoSagashiPage() {
  const comicPages = [
    { src: "/IMG_2726 2.PNG", alt: "仕事探しの巻 - 1コマ目" },
    { src: "/IMG_2762 2.PNG", alt: "仕事探しの巻 - 2コマ目" },
    { src: "/IMG_2706 2.PNG", alt: "仕事探しの巻 - 3コマ目" },
    { src: "/IMG_2764 2.PNG", alt: "仕事探しの巻 - 4コマ目" },
    { src: "/IMG_2722 2 2.PNG", alt: "仕事探しの巻 - 5コマ目" },
    { src: "/IMG_2705 2.PNG", alt: "仕事探しの巻 - 6コマ目" },
    { src: "/IMG_2736 2.PNG", alt: "仕事探しの巻 - 7コマ目" },
    { src: "/IMG_2768 2.png", alt: "仕事探しの巻 - 8コマ目" },
    { src: "/IMG_2711 2.PNG", alt: "仕事探しの巻 - 9コマ目" },
    { src: "/IMG_2730 2.PNG", alt: "仕事探しの巻 - 10コマ目" },
  ];

  // 作者コメント配列（null の場合はそのコマでアイコン非表示）
  const authorComments: (string | null)[] = [
    "恥ずいから、広めんといてや。",
    "わて、背ぇ伸びたんやろか。",
    "あんた、相撲やっとったんか？",
    "そろそろ昼寝でもしよか。",
    "マスクの脇からチラ見。",
    "プロバイダってなんのことでござる？",
    "面接なしって、どゆこと？",
    "うめぼし星人スッパイダーマンでもええの？",
    "クロッキーの意味、教えて〜な。",
    "床屋、苦手やねん...。",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthorCommentOpen, setIsAuthorCommentOpen] = useState(false);
  const [pageViews, setPageViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  // コメント機能の状態
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState(0);

  const showAuthorComment = () => {
    setIsAuthorCommentOpen(true);
  };

  const hideAuthorComment = () => {
    setIsAuthorCommentOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(comicPages.length - 1, prev + 1));
  };

  const goToPage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'shigoto-sagashi' }),
      });
      const data = await response.json();
      setLikeCount(data.likes || 0);
      setIsLiked(data.isLiked || false);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // ページビューとイイネの初期化
  useEffect(() => {
    const pageId = "shigoto-sagashi";
    const viewedKey = `${pageId}-viewed`;

    // ビューカウントを取得・更新
    const fetchViews = async () => {
      try {
        const hasViewed = localStorage.getItem(viewedKey);

        if (!hasViewed) {
          // 未訪問の場合、カウントを増やす
          const response = await fetch('/api/views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: pageId }),
          });
          const data = await response.json();
          setPageViews(data.views || 0);
          localStorage.setItem(viewedKey, "true");
        } else {
          // 訪問済みの場合、現在のカウントを取得
          const response = await fetch(`/api/views?page=${pageId}`);
          const data = await response.json();
          setPageViews(data.views || 0);
        }
      } catch (error) {
        console.error('Error fetching views:', error);
        setPageViews(0);
      }
    };

    fetchViews();

    // イイネの初期化
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?page=${pageId}`);
        const data = await response.json();
        setLikeCount(data.likes || 0);
        setIsLiked(data.isLiked || false);
      } catch (error) {
        console.error('Error fetching likes:', error);
        setLikeCount(0);
        setIsLiked(false);
      }
    };

    fetchLikes();
  }, []);

  // スワイプ機能（方向判定付き）
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isHorizontalSwipe.current = null; // リセット
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      // 方向がまだ判定されていない場合
      if (isHorizontalSwipe.current === null) {
        const deltaX = Math.abs(touchEndX.current - touchStartX.current);
        const deltaY = Math.abs(touchCurrentY - touchStartY.current);

        // 一定以上の動きがあれば方向を判定（10px以上）
        if (deltaX > 10 || deltaY > 10) {
          isHorizontalSwipe.current = deltaX > deltaY;
        }
      }

      // 横スワイプの場合は縦スクロールを防止
      if (isHorizontalSwipe.current === true) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      // 横スワイプの場合のみコマ送り
      if (isHorizontalSwipe.current === true) {
        const diff = touchStartX.current - touchEndX.current;

        // 右→左へ50px以上スワイプで次へ
        if (diff > 50) {
          goToNext();
        }
        // 左→右へ50px以上スワイプで前へ
        else if (diff < -50) {
          goToPrevious();
        }
      }

      // リセット
      isHorizontalSwipe.current = null;
    };

    const imageContainer = document.getElementById('comic-container');
    if (imageContainer) {
      imageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      imageContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      imageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('touchstart', handleTouchStart);
        imageContainer.removeEventListener('touchmove', handleTouchMove);
        imageContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  // キーボード操作対応（PC）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen bg-[#F7CD63] flex flex-col">
      <HamburgerMenu />
      <main className="flex-1 relative pt-[38px] md:pt-0">
        {/* カルーセルセクション */}
        <section className="flex items-start justify-center py-0 md:py-12">
          <div className="w-full px-0 md:px-4 flex justify-center">
            {/* 画像表示エリア（スマホ：白カードなし全幅、iPad/PC：白カードあり） */}
            <div className="relative bg-transparent md:bg-white rounded-none md:rounded-2xl shadow-none md:shadow-lg px-0 md:px-8 py-0 md:py-8 w-full max-w-full md:max-w-4xl z-10">
              <div
                id="comic-container"
                className="relative w-full h-[calc(100vh-38px-70px)] md:aspect-auto md:h-[600px] mx-auto overflow-hidden"
              >
                <motion.div
                  className="flex h-full"
                  animate={{ x: `-${currentIndex * 100}%` }}
                  transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                >
                  {comicPages.map((page, index) => (
                    <div
                      key={index}
                      className="relative w-full h-full flex-shrink-0"
                    >
                      {/* スマホ版: 通常のImage */}
                      <Image
                        src={page.src}
                        alt={page.alt}
                        fill
                        sizes="100vw"
                        className="object-contain md:object-contain"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 矢印ボタン（iPad/PCのみ表示） */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                aria-label="前のコマ"
                className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={goToNext}
                disabled={currentIndex === comicPages.length - 1}
                aria-label="次のコマ"
                className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </section>

        {/* iPad/PC版：アイコンの横に固定の吹き出し */}
        {isAuthorCommentOpen && authorComments[currentIndex] && (
          <div className="hidden md:block absolute bottom-6 right-48 max-w-sm z-50">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-sm text-neutral-800 leading-relaxed">
                {authorComments[currentIndex]}
              </p>
            </div>
          </div>
        )}

        {/* ドットインジケーター（相対位置指定でカウンターの基準に） */}
        <div className="relative flex justify-center gap-2 mt-4 pb-4 md:pb-16">
          {comicPages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              aria-label={`${index + 1}コマ目に移動`}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-[#4A3424] scale-125"
                  : "bg-[#4A3424]/30 hover:bg-[#4A3424]/50"
              }`}
            />
          ))}

          {/* ページビュー＆LIKEボタン＆コメントボタン（絶対配置でレイアウトに影響なし） */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 md:top-8 flex items-center gap-6 md:gap-10">
            {/* ページビュー */}
            <div className="flex items-center gap-2 text-[#4A3424]">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-bold">{pageViews}</span>
            </div>

            {/* LIKEボタン */}
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-[#4A3424] hover:scale-110 transition-all duration-200"
              aria-label={isLiked ? "いいねを取り消す" : "いいね"}
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="text-sm font-bold">{likeCount}</span>
            </button>

            {/* コメントボタン */}
            <button
              onClick={() => setIsCommentsOpen(true)}
              className="flex items-center gap-2 text-[#4A3424] hover:scale-110 transition-all duration-200"
              aria-label="コメントを見る"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-bold">{commentCount}</span>
            </button>
          </div>
        </div>

        {/* スマホ版：アイコンと吹き出し（ドットの下） */}
        {authorComments[currentIndex] && (
          <div className="block md:hidden w-[90%] mx-auto mt-16 pb-8">
            <div className="flex items-center gap-3 justify-end">
              {/* 吹き出し */}
              <div className={`flex-1 bg-white rounded-lg shadow-lg p-4 min-h-[80px] flex items-center transition-opacity duration-200 ${
                isAuthorCommentOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {authorComments[currentIndex]}
                </p>
              </div>

              {/* アイコンボタン */}
              <button
                onMouseDown={showAuthorComment}
                onMouseUp={hideAuthorComment}
                onMouseLeave={hideAuthorComment}
                onDragStart={(e) => { e.preventDefault(); hideAuthorComment(); }}
                onDrag={hideAuthorComment}
                onTouchStart={showAuthorComment}
                onTouchEnd={hideAuthorComment}
                onTouchCancel={hideAuthorComment}
                onTouchMove={hideAuthorComment}
                onContextMenu={(e) => e.preventDefault()}
                aria-label="作者コメントを表示/非表示"
                className="flex-shrink-0 w-14 h-14 rounded-full shadow-lg overflow-hidden ring-4 ring-white select-none"
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                draggable={false}
              >
                <Image
                  src="/icons/author.png"
                  alt="作者アイコン"
                  width={64}
                  height={64}
                  className="object-cover pointer-events-none select-none"
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                />
              </button>
            </div>
          </div>
        )}

        {/* 作者アイコンボタン（iPad/PC版のみ：コンテンツエリア右下に配置） */}
        {authorComments[currentIndex] && (
          <button
            onMouseDown={showAuthorComment}
            onMouseUp={hideAuthorComment}
            onMouseLeave={hideAuthorComment}
            onDragStart={(e) => { e.preventDefault(); hideAuthorComment(); }}
            onDrag={hideAuthorComment}
            onTouchStart={showAuthorComment}
            onTouchEnd={hideAuthorComment}
            onTouchCancel={hideAuthorComment}
            onTouchMove={hideAuthorComment}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="作者コメントを表示/非表示"
            className="hidden md:block absolute bottom-6 right-28 w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 overflow-hidden ring-4 ring-white z-40 select-none"
            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            draggable={false}
          >
            <Image
              src="/icons/author.png"
              alt="作者アイコン"
              width={64}
              height={64}
              className="object-cover pointer-events-none select-none"
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            />
          </button>
        )}
      </main>

      {/* コメントモーダル */}
      <AnimatePresence>
        {isCommentsOpen && (
          <>
            {/* 背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCommentsOpen(false)}
            />

            {/* モーダルコンテンツ */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl max-h-[85vh] md:max-h-[80vh] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col"
            >
              {/* ヘッダー */}
              <div className="relative flex-shrink-0 px-6 pt-4 pb-3 border-b border-gray-200">
                {/* モバイル用ハンドル */}
                <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setIsCommentsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-transform z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* タイトル */}
                <h2 className="text-xl md:text-2xl font-black text-[#4A3424] pr-12">
                  コメント ({commentCount})
                </h2>
              </div>

              {/* スクロール可能なコンテンツ */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* 既存コメント表示 */}
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <span className="font-black text-[#4A3424]">{comment.author}</span>
                          <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                          {comment.isPending && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-bold">
                              承認待ち
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-[#4A3424] mb-2 font-bold">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-[#4A3424]/70 hover:text-[#4A3424] transition-colors">
                          <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-[#4A3424]' : ''}`} />
                          <span className="text-sm font-bold">{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          className="text-sm text-[#4A3424]/70 hover:text-[#4A3424] font-bold transition-colors"
                        >
                          返信
                        </button>
                      </div>

                      {/* 返信表示 */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-8 mt-3 space-y-3 border-l-2 border-[#F7CD63] pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <span className="font-black text-[#4A3424]">{reply.author}</span>
                                  <span className="text-xs text-gray-500 ml-2">{reply.timestamp}</span>
                                </div>
                              </div>
                              <p className="text-[#4A3424] mb-2 font-bold">{reply.content}</p>
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-[#4A3424]/70 hover:text-[#4A3424] transition-colors">
                                  <ThumbsUp className={`w-4 h-4 ${reply.isLiked ? 'fill-[#4A3424]' : ''}`} />
                                  <span className="text-sm font-bold">{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* コメント入力フォーム */}
                <div className="sticky bottom-0 bg-white pt-4 border-t-2 border-[#4A3424]">
                  <h3 className="font-black text-[#4A3424] mb-3">
                    {replyingTo ? "返信を書く" : "コメントを書く"}
                  </h3>
                  {replyingTo && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm text-[#4A3424] font-bold">返信中...</span>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="text-sm text-red-600 hover:text-red-700 font-bold"
                      >
                        キャンセル
                      </button>
                    </div>
                  )}
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="ニックネーム"
                      value={newComment.author}
                      onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-[#4A3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7CD63] font-bold placeholder:font-normal"
                    />
                    <textarea
                      placeholder="コメントを入力..."
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-[#4A3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7CD63] resize-none font-bold placeholder:font-normal"
                    />
                    <button
                      onClick={() => {
                        // ダミー送信処理
                        if (newComment.author && newComment.content) {
                          alert("コメントを送信しました！承認後に表示されます。");
                          setNewComment({ author: "", content: "" });
                          setReplyingTo(null);
                        }
                      }}
                      className="w-full bg-[#4A3424] text-[#FFF6D9] py-3 rounded-lg font-black hover:bg-[#4A3424]/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      送信する
                    </button>
                    <p className="text-xs text-[#4A3424]/70 text-center font-bold">
                      ※コメントは承認制です。承認後に表示されます。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
