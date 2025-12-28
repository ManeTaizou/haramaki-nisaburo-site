import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12 md:pt-24 md:pb-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border-4 border-[#4A3424] p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-black text-[#4A3424] mb-8 text-center whitespace-nowrap">
            プライバシーポリシー
          </h1>

          <div className="space-y-8 text-[#4A3424]">
            {/* 1. 基本方針 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">1. 基本方針</h2>
              <p className="font-bold leading-relaxed">
                腹巻二三郎（以下、「当サイト」といいます。）は、ご利用者の個人情報の保護に関する法律、その他の規範を遵守し、個人情報の適切な取り扱いに努めます。
              </p>
            </section>

            {/* 2. 個人情報の定義 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">2. 個人情報の定義</h2>
              <p className="font-bold leading-relaxed">
                本プライバシーポリシーにおいて、個人情報とは、生存する個人に関する情報であって、当該情報に含まれる氏名、メールアドレス、その他の記述等により特定の個人を識別できるもの、または個人識別符号が含まれるものを指します。
              </p>
            </section>

            {/* 3. 個人情報の取得方法 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">3. 個人情報の取得方法</h2>
              <p className="font-bold leading-relaxed">
                当サイトでは、お問い合わせフォームやコメント機能をご利用いただく際に、氏名、メールアドレス等の個人情報をご提供いただく場合があります。
              </p>
            </section>

            {/* 4. 個人情報の利用目的 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">4. 個人情報の利用目的</h2>
              <p className="font-bold leading-relaxed mb-3">
                当サイトが取得した個人情報は、以下の目的で利用いたします。
              </p>
              <ul className="list-disc list-inside space-y-2 font-bold ml-4">
                <li>お問い合わせへの対応</li>
                <li>コメントの管理・承認</li>
                <li>サービスの改善・向上</li>
                <li>重要なお知らせの通知</li>
              </ul>
            </section>

            {/* 5. 個人情報の第三者提供 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">5. 個人情報の第三者提供</h2>
              <p className="font-bold leading-relaxed">
                当サイトは、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc list-inside space-y-2 font-bold ml-4 mt-3">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              </ul>
            </section>

            {/* 6. 個人情報の安全管理 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">6. 個人情報の安全管理</h2>
              <p className="font-bold leading-relaxed">
                当サイトは、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              </p>
            </section>

            {/* 7. Cookieの使用について */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">7. Cookieの使用について</h2>
              <p className="font-bold leading-relaxed">
                当サイトでは、ユーザーの利便性向上およびサイトの改善のため、Cookieを使用する場合があります。Cookieの設定は、ブラウザの設定により無効化することが可能です。
              </p>
            </section>

            {/* 8. アクセス解析ツールについて */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">8. アクセス解析ツールについて</h2>
              <p className="font-bold leading-relaxed">
                当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用しています。これらのツールはCookieを使用してユーザーの行動を分析しますが、個人を特定する情報は含まれません。データの収集・処理方法については、各ツールの利用規約をご確認ください。
              </p>
            </section>

            {/* 9. 開示・訂正・削除について */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">9. 開示・訂正・削除について</h2>
              <p className="font-bold leading-relaxed">
                ご本人から個人情報の開示、訂正、削除等の請求があった場合は、法令に従い、速やかに対応いたします。お問い合わせは下記の連絡先までお願いいたします。
              </p>
            </section>

            {/* 10. プライバシーポリシーの変更 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">10. プライバシーポリシーの変更</h2>
              <p className="font-bold leading-relaxed">
                当サイトは、法令の変更や事業内容の変更に伴い、本プライバシーポリシーを予告なく変更する場合があります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
              </p>
            </section>

            {/* 11. お問い合わせ先 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black mb-4">11. お問い合わせ先</h2>
              <p className="font-bold leading-relaxed">
                本プライバシーポリシーに関するお問い合わせは、以下までお願いいたします。
              </p>
              <div className="mt-4 bg-[#FFF6D9] border-2 border-[#4A3424] rounded-lg p-4">
                <p className="font-bold">運営者：KOTOMANE STUDIO</p>
                <p className="font-bold mt-2">
                  お問い合わせ：
                  <a href="https://x.com/Nisaburou_H" target="_blank" rel="noopener noreferrer" className="text-[#4A3424] hover:underline ml-2">
                    X @Nisaburou_H
                  </a>
                </p>
              </div>
            </section>

            {/* 制定日 */}
            <div className="mt-12 pt-6 border-t-2 border-[#4A3424] text-right">
              <p className="font-bold text-sm">制定日：2025年12月27日</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
