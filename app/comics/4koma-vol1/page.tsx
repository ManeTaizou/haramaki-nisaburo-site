"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Heart, MessageCircle, X, Send, ThumbsUp } from "lucide-react";
import Footer from "@/components/Footer";

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

export default function FourKomaVol1Page() {
  const comicPages = [
    { src: "/4koma/vol1/1コマ目完成.png", alt: "4コマ Vol.1 - 1コマ目" },
    { src: "/4koma/vol1/2コマ目完成.png", alt: "4コマ Vol.1 - 2コマ目" },
    { src: "/4koma/vol1/3コマ目完成.png", alt: "4コマ Vol.1 - 3コマ目" },
    { src: "/4koma/vol1/4コマ目完成.png", alt: "4コマ Vol.1 - 4コマ目" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
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
        body: JSON.stringify({ page: '4koma-vol1' }),
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
    const pageId = "4koma-vol1";
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

  // スワイプ機能
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isHorizontalSwipe.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      if (isHorizontalSwipe.current === null) {
        const deltaX = Math.abs(touchEndX.current - touchStartX.current);
        const deltaY = Math.abs(touchCurrentY - touchStartY.current);

        if (deltaX > 10 || deltaY > 10) {
          isHorizontalSwipe.current = deltaX > deltaY;
        }
      }

      if (isHorizontalSwipe.current === true) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (isHorizontalSwipe.current === true) {
        const diff = touchStartX.current - touchEndX.current;

        if (diff > 50) {
          goToNext();
        } else if (diff < -50) {
          goToPrevious();
        }
      }

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

  // キーボード操作
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
      <main className="flex-1 relative pt-16 md:pt-0">
        {/* カルーセルセクション */}
        <section className="flex items-center justify-center py-4 md:pt-36 md:pb-12">
          <div className="w-full px-0 md:px-4 flex justify-center">
            <div className="relative bg-transparent md:bg-white rounded-none md:rounded-2xl shadow-none md:shadow-lg px-0 md:px-8 py-0 md:py-8 w-full max-w-full md:max-w-5xl">
              <div
                id="comic-container"
                className="relative w-full aspect-video md:aspect-auto md:h-[400px] mx-auto overflow-hidden"
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
                      <Image
                        src={page.src}
                        alt={page.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 矢印ボタン */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={goToNext}
                disabled={currentIndex === comicPages.length - 1}
                className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </section>

        {/* ドットインジケーター */}
        <div className="relative flex justify-center gap-2 pb-4 md:pb-40">
          {comicPages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-[#4A3424] scale-125"
                  : "bg-[#4A3424]/30 hover:bg-[#4A3424]/50"
              }`}
            />
          ))}

          {/* ページビュー＆LIKE＆コメントボタン */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 md:top-8 flex items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-[#4A3424]">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-bold">{pageViews}</span>
            </div>

            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-[#4A3424] hover:scale-110 transition-all duration-200"
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="text-sm font-bold">{likeCount}</span>
            </button>

            <button
              onClick={() => setIsCommentsOpen(true)}
              className="flex items-center gap-2 text-[#4A3424] hover:scale-110 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-bold">{commentCount}</span>
            </button>
          </div>
        </div>
      </main>

      {/* コメントモーダル */}
      <AnimatePresence>
        {isCommentsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCommentsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl max-h-[85vh] md:max-h-[80vh] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col"
            >
              <div className="relative flex-shrink-0 px-6 pt-4 pb-3 border-b border-gray-200">
                <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

                <button
                  onClick={() => setIsCommentsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-transform z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-xl md:text-2xl font-black text-[#4A3424] pr-12">
                  コメント ({commentCount})
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
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
