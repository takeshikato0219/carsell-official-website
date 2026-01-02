"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    privacy: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // EmailJSの初期化
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_47wjggu";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "62fy23UHQA1peUUj7";
    emailjs.init(publicKey);
  }, []);

  useEffect(() => {
    // 動画ファイルの存在確認（デバッグ用）
    const checkVideo = () => {
      const video1 = new Image();
      video1.onload = () => console.log("Video file 1 exists");
      video1.onerror = () => console.log("Video file 1 not found");
      // MP4ファイルはImageで直接チェックできないため、fetchで確認
      fetch("/video-1765107210260.mp4", { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            console.log("Video file 1 exists and is accessible");
          } else {
            console.log("Video file 1 not accessible:", res.status);
            setVideoError(true);
          }
        })
        .catch((err) => {
          console.log("Video file 1 check failed:", err);
          setVideoError(true);
        });
      
      fetch("/hero-bg.mp4", { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            console.log("Video file 2 exists and is accessible");
          } else {
            console.log("Video file 2 not accessible:", res.status);
          }
        })
        .catch((err) => {
          console.log("Video file 2 check failed:", err);
        });
    };
    checkVideo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      alert("プライバシーポリシーに同意してください。");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_47wjggu";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_66essgm";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "62fy23UHQA1peUUj7";

      const templateParams = {
        company: formData.company,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        message: formData.message,
        to_name: "CARSELL",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus("success");
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
        privacy: false,
      });

      // 3秒後に成功メッセージを非表示
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("EmailJS送信エラー:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav aria-label="パンくずリスト" className="sr-only">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="https://www.caesell.net">
              <span itemProp="name">ホーム</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-2" style={{ marginTop: '5px' }}>
                <img src="/carsell-logo.png" alt="CARSELL - 自動車営業ツール 自動車AI営業・自動車AI管理 売り上げAI" className="h-60 w-auto" />
              </div>

            <nav className="hidden lg:flex items-center space-x-8" aria-label="メインナビゲーション">
              <a
                href="#problem"
                className="text-sm font-medium text-gray-700 hover:text-[#426579] transition-colors"
                aria-label="自動車営業の課題セクションへ"
              >
                課題
              </a>
              <a
                href="#solution"
                className="text-sm font-medium text-gray-700 hover:text-[#426579] transition-colors"
                aria-label="自動車AI営業ソリューションセクションへ"
              >
                ソリューション
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-gray-700 hover:text-[#426579] transition-colors"
                aria-label="自動車営業ツールの機能セクションへ"
              >
                機能
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-gray-700 hover:text-[#426579] transition-colors"
                aria-label="自動車AI管理システムの料金セクションへ"
              >
                料金
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-gray-700 hover:text-[#426579] transition-colors"
                aria-label="よくある質問セクションへ"
              >
                FAQ
              </a>
            </nav>

            <a href="#contact" className="rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-2.5 text-sm font-medium transition-all">
              お問い合わせ
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 overflow-hidden bg-[#020617]">
        {/* Video Background - Full on mobile, Right side on desktop */}
        <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[55%] z-0">
          {!videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              aria-label="自動車営業ツールCARSELLの紹介動画"
              preload="auto"
              style={{ zIndex: 0 }}
              onError={() => setVideoError(true)}
            >
              <source src="/video-1765107210260.mp4" type="video/mp4" />
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#020617] to-[#0f172a]"></div>
          )}
          {/* Desktop: Gradient overlay for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-transparent hidden lg:block z-10"></div>
          {/* Mobile: Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#020617]/75 lg:hidden z-10"></div>
        </div>

        {/* Vertical SCROLL text - Left Side (Desktop only) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20">
          <div className="text-xs tracking-[0.3em] text-white/70 font-medium" style={{writingMode: 'vertical-rl'}}>
            SCROLL
          </div>
          <div className="w-px h-24 bg-gradient-to-b from-white/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-relaxed text-white tracking-tight">
              自動車営業ツールで、
              <br />
              AI営業・AI管理を実現。
              <br />
              売り上げAIで売上を最大化。
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mb-10 text-white/80 leading-relaxed max-w-lg">
              自動車販売業界に特化したAI営業ツール「CARSELL」。自動車AI営業・自動車AI管理を実現する売り上げAIシステムとして、顧客管理から見積作成、目標管理まで、営業プロセス全体を一元管理し、業務効率を飛躍的に向上させます。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-[#255668] hover:bg-[#1a3d4a] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-center font-medium transition-all shadow-lg text-sm sm:text-base">
                3分でわかる資料請求（無料）
              </a>
              <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-[#020617] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-center font-medium transition-all text-sm sm:text-base">
                専門家に相談する
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
          <div className="w-px h-16 bg-gradient-to-b from-white/70 to-transparent"></div>
          <div className="text-xs tracking-[0.3em] text-white/60 font-medium">SCROLL</div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden" aria-labelledby="problem-heading">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#87b1ca" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots2)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 id="problem-heading" className="text-2xl lg:text-3xl font-extrabold mb-6 text-center tracking-tight">
              その自動車営業管理、まだ手作業ですか？
            </h2>
            <p className="text-center mb-16 text-base leading-relaxed text-gray-700">
              展示会で集めたアンケート用紙の山、バラバラに管理される顧客情報、Excel上での煩雑な実績集計。自動車営業ツールがない環境では、営業担当者は本来の顧客対応に集中できず、管理業務に多くの時間を費やしています。そして見込み顧客のフォロー漏れによる機会損失は、売上に深刻な影響を与えています。自動車AI管理を実現する売り上げAIシステムで、これらの課題を解決しましょう。自動車AI営業ツールを導入することで、営業効率が大幅に向上し、売上を最大化できます。
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">展示会後のデータ入力地獄</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  展示会で集めた大量のアンケート用紙を、営業担当者が一枚一枚手入力。貴重な時間が事務作業に奪われ、肝心のフォローアップが遅れてしまう。
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">見込み顧客のフォロー漏れ</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  顧客情報が散在し、誰がどの段階にいるのか把握できない。適切なタイミングでのフォローができず、成約機会を逃してしまう。
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">実績管理の煩雑さ</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Excelでの手作業による集計は時間がかかり、ミスも発生しやすい。リアルタイムで営業状況を把握することができず、適切な判断が遅れてしまう。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="relative py-20 bg-[#426579] text-white overflow-hidden" aria-labelledby="solution-heading">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots3)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="solution-heading" className="text-2xl lg:text-3xl font-extrabold mb-6 tracking-tight">
              自動車AI営業・自動車AI管理で、
              <br />
              営業プロセス全体を一つのシステムで完結。
            </h2>
            <p className="text-lg leading-relaxed opacity-90">
              CARSELLは、自動車営業ツールとして、顧客管理から見積作成、営業目標管理、チームコミュニケーションまで、自動車販売に必要なすべての業務プロセスを一元管理する売り上げAIシステムです。自動車AI営業を実現し、展示会で収集したアンケート用紙をスキャンして即座にデジタル化し、顧客カンバンで進捗を可視化。営業担当者は顧客対応に集中でき、管理者はリアルタイムで営業状況を把握することが可能となります。自動車AI管理により、売上を最大化します。この自動車営業ツールは、自動車ディーラーやカーディーラー向けに最適化された、包括的な営業支援システムです。
            </p>

            {/* Sample Dashboard Image */}
            <div className="mt-16 max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="/sample-dashboard.png"
                  alt="自動車営業ツール CARSELL - 自動車AI営業・自動車AI管理で売上を最大化する売り上げAIシステムのダッシュボード"
                  className="w-full h-auto"
                />
              </div>
              <div className="text-center mt-8">
                <p className="text-xl lg:text-2xl font-extrabold opacity-95 mb-3">
                  最強のカーディーラー用のAIツールがここに誕生。
                </p>
                <p className="text-lg lg:text-xl font-bold opacity-90">
                  全てをここに完結できる（大幅カスタマイズ可能）
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-[#4D5269] text-white overflow-hidden" aria-labelledby="features-heading">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots4" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots4)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="text-sm tracking-widest mb-6 opacity-80">Core Features</div>
            <h2 id="features-heading" className="text-2xl lg:text-3xl font-extrabold mb-10 tracking-tight leading-relaxed">
              自動車AI営業・自動車AI管理で営業効率を最大化する、主要機能
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">ダッシュボード機能</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-2 font-bold">営業活動の全体像を、一目で把握。</p>
              <p className="text-sm opacity-80 leading-relaxed">
                今週・今月の商談数、未完了のTodoタスク、要連絡オーナーなど、重要な指標がリアルタイムで表示されます。進行中の商談リストや最近作成した見積もりも一覧表示され、その日の優先業務を即座に把握できます。
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">顧客管理機能</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-2 font-bold">見込み顧客の進捗を、視覚的に管理。</p>
              <p className="text-sm opacity-80 leading-relaxed">
                カンバン方式で顧客を「新規」「ランクN」「ランクC」「ランクI」などのステージに分類。ドラッグ&ドロップで直感的に進捗管理ができ、フォロー漏れを防ぎます。アンケートスキャン機能で展示会後のデータ入力も自動化。
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">見積もり作成機能</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-2 font-bold">車両見積書を、迅速に作成・管理。</p>
              <p className="text-sm opacity-80 leading-relaxed">
                見積もりを「下書き」「送付済」「成約」などのステータスで管理。車両情報、オプション、価格を入力して見積書を作成し、顧客に送付。成約した見積もりは自動的に契約管理と連携し、営業目標の実績に反映されます。
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">営業目標管理機能</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-2 font-bold">実績をリアルタイムで可視化。</p>
              <p className="text-sm opacity-80 leading-relaxed">
                年度単位で営業実績を分析・可視化。担当者別の契約台数、売上、利益を一覧表示し、月次目標と実績を詳細に追跡。データに基づいた営業戦略の立案と、効果的なチーム管理を実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Analysis Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#020617] to-[#0f172a] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots5" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots5)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-6 tracking-tight">
                チーム全体の連携を強化する、
                <br />
                充実のコミュニケーション機能。
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                CARSELLには、チーム内のコミュニケーションを円滑にする社内チャット機能、スケジュール共有、Todo管理機能が統合されています。カレンダーでチーム全体の予定を可視化し、チャット機能で情報をリアルタイムに共有。顧客対応から部門間連携まで、スムーズなコラボレーションを実現します。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white text-gray-900 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-[#255668] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
                <h4 className="text-lg font-bold mb-4">カレンダー・スケジュール管理</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  チーム全体のスケジュールを共有・管理。商談、納車、車検、展示会などをイベント種別で色分けし、視覚的に把握できます。
                </p>
              </div>

              <div className="bg-white text-gray-900 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-[#255668] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
                <h4 className="text-lg font-bold mb-4">社内チャット機能</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  テーマ別チャンネルやダイレクトメッセージで、チーム内のコミュニケーションを円滑に。絵文字リアクションやメッセージ検索機能も充実。
                </p>
              </div>

              <div className="bg-white text-gray-900 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-[#255668] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
                <h4 className="text-lg font-bold mb-4">契約・納車管理機能</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  契約から納車までのプロセスを管理。納車完了後はオーナーリストに移動し、定期的なフォローアップで長期的な関係を構築します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 tracking-tight">
              自動車営業ツールCARSELLがもたらす、3つの価値
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#255668]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4">自動車AI管理による業務効率の飛躍的向上</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                自動車営業ツールとして、顧客情報、見積もり、スケジュール、契約情報をすべて一元管理。自動車AI管理により、アンケートスキャン機能で展示会後のデータ入力が不要になり、営業担当者は顧客対応に集中できます。この自動車AI営業システムにより、従来の手作業による管理業務から解放され、売上を最大化するための営業活動に専念できます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#255668]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4">売り上げAIによるデータに基づく営業戦略</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                売り上げAIシステムにより、リアルタイムで営業実績を把握し、データに基づいた意思決定が可能に。自動車AI営業ツールとして、担当者別・月別の実績を詳細に分析することで、強みと弱みを明確にし、効果的な営業戦略を立案できます。自動車AI管理機能により、売上を最大化するための最適なタイミングで顧客にアプローチできるようになります。
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#255668]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4">顧客満足度の向上</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                顧客情報が一元管理され、過去のやり取りがすべて記録されるため、きめ細かい対応が可能に。定期的なフォローアップにより、長期的な関係構築と顧客の信頼獲得を実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 tracking-tight">
              ニーズに合わせて選べる柔軟な料金体系
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              販売店の規模やニーズに応じて柔軟に選択いただけるよう、複数の料金プランをご用意しています。まずは小規模からスタートし、事業の成長に合わせて拡張することも可能です。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border-2 border-gray-200 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">スタータープラン</h3>
              <p className="text-3xl font-bold text-[#255668] mb-4 min-h-[3rem] flex items-center">155万円</p>
              <p className="text-sm text-gray-600 mb-6">小規模販売店向け。基本的な顧客管理と営業支援機能を提供。</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ダッシュボード機能
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  顧客管理（カンバン）
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  見積もり作成
                </li>
              </ul>
            </div>

            <div className="border-2 border-[#426579] p-8 rounded-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#255668] text-white px-4 py-1 rounded-full text-sm font-bold">おすすめ</div>
              <h3 className="text-xl font-bold mb-2">スタンダードプラン</h3>
              <p className="text-3xl font-bold text-[#255668] mb-4 min-h-[3rem] flex items-center">498万円</p>
              <p className="text-sm text-gray-600 mb-6">中規模販売店向け。全機能を利用可能で、チーム全体の営業効率を最大化。</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  スタータープランの全機能
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  アンケートスキャン機能
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  営業目標管理機能
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  社内チャット機能
                </li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">エンタープライズプラン</h3>
              <p className="text-3xl font-bold text-[#255668] mb-4 min-h-[3rem] flex items-center">応相談</p>
              <p className="text-sm text-gray-600 mb-6">大規模ディーラーや複数拠点を持つ販売グループ向け。カスタマイズと専任サポートを提供。</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  スタンダードプランの全機能
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  カスタマイズ開発
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  専任サポート
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API連携・外部システム統合
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="bg-[#255668] hover:bg-[#1a3d4a] text-white px-10 py-4 rounded-full inline-flex items-center gap-2 text-base transition-all" aria-label="自動車営業ツールの詳細資料を請求する">
              <span>詳細な料金・機能比較表はこちら（資料請求）</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 to-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 tracking-tight">よくあるご質問</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              自動車営業ツール「CARSELL」に関するよくある質問にお答えします。自動車AI営業・自動車AI管理、売り上げAIシステムについてのご質問も承っております。
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <article className="bg-white p-8 rounded-2xl shadow-sm" itemScope itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-3" itemProp="name">Q. どのような業種に対応していますか？</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-600" itemProp="text">
                  自動車ディーラー、キャンピングカー販売店、輸入車販売店、中古車販売店など、自動車販売に関わるすべての業態に対応しています。新車・中古車問わずご利用いただけます。この自動車営業ツールは、カーディーラーや自動車ディーラー向けに最適化された、包括的な営業支援システムです。
                </p>
              </div>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-sm" itemScope itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-3" itemProp="name">Q. 展示会で使えるアンケートスキャン機能の精度はどのくらいですか？</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-600" itemProp="text">
                  スマートフォンやスキャナーで撮影した紙のアンケート用紙から、顧客情報を高精度で自動抽出します。JPG、PNG、HEIC、PDF形式に対応しており、複数枚を一度にアップロードすることも可能です。この自動車AI管理機能により、展示会後のデータ入力作業が大幅に削減され、営業効率が向上します。
                </p>
              </div>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-sm" itemScope itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-3" itemProp="name">Q. 導入までにどのくらいの期間がかかりますか？</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-600" itemProp="text">
                  お申し込み後、最短で1週間程度でご利用を開始できます。初期設定やデータ移行のサポートも充実しており、スムーズに導入いただけます。自動車AI営業システムの導入により、すぐに営業効率化と売上最大化を実現できます。
                </p>
              </div>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-sm" itemScope itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-3" itemProp="name">Q. 既存のシステムとの連携は可能ですか？</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-600" itemProp="text">
                  エンタープライズプランでは、API連携や外部システム統合が可能です。既存の基幹システムやCRMとの連携についてはお気軽にご相談ください。この自動車営業ツールは、既存の業務システムと連携することで、より包括的な営業管理を実現します。
                </p>
              </div>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-sm" itemScope itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-3" itemProp="name">Q. 自動車AI営業・自動車AI管理の具体的な機能は何ですか？</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p className="text-gray-600" itemProp="text">
                  自動車AI営業機能として、顧客の購買傾向を分析し、最適なタイミングでのアプローチを提案します。自動車AI管理機能では、営業実績の自動集計、目標達成率の可視化、売上予測などを行います。売り上げAIシステムにより、データに基づいた営業戦略の立案が可能になります。
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#255668] to-[#1a3d4a] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-6 tracking-tight">
                今すぐ、営業DXの第一歩を。
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                業務効率の向上と売上拡大を実現するために、まずは無料の資料請求で、CARSELLがあなたの営業活動をどのように変革できるか、ご確認ください。専門スタッフによる個別相談やデモンストレーションも承っております。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-8 rounded-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">会社名・組織名<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#426579]"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">氏名<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#426579]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">メールアドレス<span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#426579]"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">電話番号<span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#426579]"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">お問い合わせ種別<span className="text-red-500">*</span></label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#426579]"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                  >
                    <option value="">選択してください</option>
                    <option value="document">資料請求</option>
                    <option value="consultation">個別相談を希望</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">お問い合わせ内容（任意）</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#426579]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    <a href="#" className="text-[#255668] underline">プライバシーポリシー</a>に同意する
                  </label>
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                    お問い合わせありがとうございます。送信が完了しました。
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    送信に失敗しました。しばらく時間をおいて再度お試しください。
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#255668] hover:bg-[#1a3d4a] text-white py-4 rounded-full font-medium transition-all ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "送信中..." : "送信する"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/carsell-logo.png" alt="CARSELL - 自動車営業ツール 自動車AI営業・自動車AI管理 売り上げAI" className="h-60 w-auto" />
              </div>
              <p className="text-sm text-gray-600">
                自動車販売業界に特化した包括的な営業支援システム。自動車AI営業・自動車AI管理を実現する売り上げAIシステムです。自動車営業ツールとして、カーディーラーや自動車ディーラーの営業効率化と売上最大化をサポートします。
              </p>
            </div>

            <div>
              <ul className="space-y-3 text-sm">
                <li><a href="#problem" className="hover:text-[#426579] transition-colors">課題</a></li>
                <li><a href="#solution" className="hover:text-[#426579] transition-colors">ソリューション</a></li>
                <li><a href="#features" className="hover:text-[#426579] transition-colors">機能</a></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-3 text-sm">
                <li><a href="#pricing" className="hover:text-[#426579] transition-colors">料金</a></li>
                <li><a href="#faq" className="hover:text-[#426579] transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-[#426579] transition-colors">お問い合わせ</a></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#426579] transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-[#426579] transition-colors">利用規約</a></li>
                <li><a href="#" className="hover:text-[#426579] transition-colors">会社概要</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4">会社情報</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><span className="font-medium">代表者名：</span> 加藤健資 (Takeshi Kato)</li>
                  <li><span className="font-medium">住所：</span> 新潟県三条市石上１丁目10番33号</li>
                  <li><span className="font-medium">設立年：</span> 2024年10月10日</li>
                  <li><span className="font-medium">資本金：</span> 6,000万円</li>
                  <li><span className="font-medium">業務内容：</span> 特許ライセンス業・AI開発</li>
                  <li><span className="font-medium">従業員：</span> 5名</li>
                  <li><span className="font-medium">電話番号：</span> <a href="tel:070-9133-6957" className="hover:text-[#426579] transition-colors">070-9133-6957</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>&copy; CARSELL All Rights Reserved.</p>
              <p className="mt-2">特許第7742067号取得</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
