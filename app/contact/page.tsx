"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: 実際の送信処理を実装
    // 現在はダミーの処理
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("お問い合わせありがとうございます！\n内容を確認次第、ご連絡させていただきます。");

    // フォームをリセット
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg border-4 border-[#4A3424] p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#4A3424] mb-4 text-center">
            お問い合わせ
          </h1>

          <p className="text-center text-[#4A3424] font-bold mb-8">
            ご意見・ご感想・お仕事のご依頼など、お気軽にお問い合わせください。
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* お名前 */}
            <div>
              <label htmlFor="name" className="block text-[#4A3424] font-black mb-2">
                お名前 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#4A3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7CD63] font-bold"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-[#4A3424] font-black mb-2">
                メールアドレス <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#4A3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7CD63] font-bold"
              />
            </div>

            {/* 件名 */}
            <div>
              <label htmlFor="subject" className="block text-[#4A3424] font-black mb-2">
                件名 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#4A3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7CD63] font-bold"
              />
            </div>

            {/* お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="block text-[#4A3424] font-black mb-2">
                お問い合わせ内容 <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 border-2 border-[#4A3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7CD63] resize-none font-bold"
              />
            </div>

            {/* 注意事項 */}
            <div className="bg-[#FFF6D9] border-2 border-[#4A3424] rounded-lg p-4">
              <p className="text-xs text-[#4A3424] font-bold leading-relaxed">
                ※ご入力いただいた個人情報は、お問い合わせへの対応のみに使用いたします。
                <br />
                ※返信までに数日お時間をいただく場合がございます。予めご了承ください。
              </p>
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4A3424] text-[#FFF6D9] py-4 rounded-lg font-black text-lg hover:bg-[#4A3424]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "送信中..." : "送信する"}
            </button>
          </form>

          {/* SNSでのお問い合わせ */}
          <div className="mt-8 pt-6 border-t-2 border-[#4A3424]">
            <p className="text-center text-[#4A3424] font-bold mb-4">
              SNSでもお気軽にお問い合わせください
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://x.com/Nisaburou_H"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A3424] hover:underline font-black"
              >
                X
              </a>
              <span className="text-[#4A3424]">|</span>
              <a
                href="https://instagram.com/nisaburou_h"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A3424] hover:underline font-black"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
