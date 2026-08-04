"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronsDown, Heart, User } from "lucide-react";
import { Gnb } from "@/components/ui/gnb";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/ui/use-media-query";
import { cn } from "@/lib/utils";
import mainIllustration from "@/assets/imgs/img_main_img1.svg";
import talkIllustration from "@/assets/imgs/img_main_img2.svg";
import bottomSparkle from "@/assets/imgs/img_bottom_img1.svg";
import bottomCircle from "@/assets/imgs/img_bottom_img2.svg";
import bottomWave from "@/assets/imgs/img_bottom_img3.svg";
import IconHobby from "@/assets/icons/img_hobby.svg";
import IconStudy from "@/assets/icons/img_study.svg";
import IconBusiness from "@/assets/icons/img_busi.svg";
import IconHealth from "@/assets/icons/img_health.svg";
import IconFamily from "@/assets/icons/img_family.svg";
import IconEtc from "@/assets/icons/img_etc.svg";

const categories = [
  {
    label: "취미 / 여가",
    icon: IconHobby,
    cardClassName: "from-emerald-300 to-emerald-500",
    pillClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "스터디",
    icon: IconStudy,
    cardClassName: "from-red-300 to-red-400",
    pillClassName: "bg-red-50 text-red-600",
  },
  {
    label: "비즈니스",
    icon: IconBusiness,
    cardClassName: "from-blue-300 to-blue-500",
    pillClassName: "bg-blue-50 text-blue-600",
  },
  {
    label: "운동 / 건강",
    icon: IconHealth,
    cardClassName: "from-yellow-300 to-yellow-400",
    pillClassName: "bg-yellow-50 text-yellow-700",
  },
  {
    label: "가족 / 육아",
    icon: IconFamily,
    cardClassName: "from-teal-300 to-teal-500",
    pillClassName: "bg-teal-50 text-teal-700",
  },
  {
    label: "기타",
    icon: IconEtc,
    cardClassName: "from-orange-300 to-orange-400",
    pillClassName: "bg-orange-50 text-orange-700",
  },
] as const;

const reviews = [
  {
    name: "럽윈즈올",
    date: "2024.01.25",
    text: "처음 만난 분들과도 금세 친해질 수 있었어요. 웃고 떠들다 보니 시간이 금방 갔습니다.",
  },
  {
    name: "운동광",
    date: "2024.05.31",
    text: "혼자였다면 끝까지 못 했을 텐데, 같이 하니 꾸준히 운동할 수 있었어요.",
  },
  {
    name: "이수빈",
    date: "2024.07.21",
    text: "같이 재료를 손질하고 조리해서 분위기가 화기애애했어요!",
  },
  {
    name: "카피바라",
    date: "2024.08.08",
    text: "평소 혼자 가던 카페도 함께 다니니 더 재미있고 보람찼어요 ~",
  },
  {
    name: "딸기",
    date: "2024.04.14",
    text: "다른 부모님들과의 교류가 활발했어요. 오랜만에 소중한 추억을 만들었네요 :)",
  },
  {
    name: "산책러버",
    date: "2024.02.09",
    text: "매주 만나는 게 기대될 만큼 즐거운 시간이었어요. 다음 모임도 신청했어요!",
  },
  {
    name: "책벌레민준",
    date: "2024.03.17",
    text: "책 이야기를 나눌 사람이 없었는데, 여기서 진짜 좋은 친구들을 만났어요.",
  },
  {
    name: "그린티라떼",
    date: "2024.06.02",
    text: "낯가림이 심한 편인데도 편하게 대화할 수 있는 분위기였어요.",
  },
  {
    name: "클라이밍조아",
    date: "2024.09.19",
    text: "실력이 달라도 서로 응원해주는 분위기가 정말 좋았어요.",
  },
  {
    name: "소소한행복",
    date: "2024.10.05",
    text: "일상에 활력이 생겼어요. 같이달램 덕분에 새로운 취미를 찾았습니다.",
  },
] as const;

export default function Home() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reviewTrackRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 745px)");

  useLayoutEffect(() => {
    const track = reviewTrackRef.current;
    if (!track) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      gsap.to(track, {
        scrollLeft: track.scrollLeft + event.deltaY,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    };

    track.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      track.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useLayoutEffect(() => {
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    if (cards.length === 0) return;

    if (!isDesktop) {
      gsap.set(cards, { y: 0 });
      return;
    }

    const tweens = cards.map((card, index) => {
      const isTopToBottom = index % 2 === 0;
      const baseY = isTopToBottom ? 20 : -20;
      const peakY = isTopToBottom ? baseY + 14 : baseY - 14;

      gsap.set(card, { y: baseY, force3D: true });

      return gsap.to(card, {
        y: peakY,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        force3D: true,
      });
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [isDesktop]);

  return (
    <div className="flex min-h-screen flex-col">
      <Gnb />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-10 bg-linear-to-br from-gradient-start-100 to-gradient-end-100 px-6 py-16 mobile:gap-16 mobile:px-16 mobile:py-24">
          <div className="flex w-full max-w-7xl flex-col items-center gap-10 mobile:flex-row mobile:justify-between mobile:gap-8">
            <div className="flex flex-col items-start gap-6 text-left">
              <h1 className="text-3xl leading-snug font-bold break-keep text-zinc-900 mobile:text-5xl">
                혼자보다 함께,
                <br />
                같이달램에서 시작해보세요
              </h1>
              <p className="text-sm leading-relaxed break-keep text-zinc-500 mobile:text-base">
                작은 한 걸음도 혼자가 아니면 가벼워집니다.
                <br />
                당신의 첫 모임, 같이달램이 도와드릴게요.
              </p>
              <Button size="md" nativeButton={false} render={<Link href="/events" />}>
                모임 찾아보기
              </Button>
            </div>

            <Image
              src={mainIllustration}
              alt="책을 읽는 두 사람 일러스트"
              className="h-auto w-full min-w-0 max-w-[18rem] mobile:max-w-104"
            />
          </div>

          <ChevronsDown className="h-6 w-6 text-green-500" aria-hidden />
        </section>

        <section className="flex flex-col items-center gap-12 bg-white px-6 py-16 mobile:px-16 mobile:py-24">
          <div className="flex w-full max-w-7xl flex-col items-center gap-3 text-center">
            <span className="text-sm font-bold text-green-500 mobile:text-base">모임 찾기</span>
            <h2 className="text-2xl font-bold break-keep text-zinc-900 mobile:text-4xl">
              다양한 분야의 모임을 만나보세요
            </h2>
            <p className="text-sm break-keep text-zinc-500 mobile:text-base">
              취향에 따라서 원하는 모임을 골라보세요.
            </p>
          </div>

          <div className="grid w-full max-w-7xl grid-cols-2 gap-4 min-[600px]:grid-cols-3 mobile:grid-cols-6 mobile:gap-6">
            {categories.map((category, index) => (
              <div
                key={category.label}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "flex aspect-3/4 flex-col items-center justify-center gap-6 rounded-3xl bg-linear-to-br will-change-transform",
                  category.cardClassName,
                )}
              >
                <category.icon className="h-16 w-16 mobile:h-20 mobile:w-20" />
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-center text-sm font-semibold break-keep",
                    category.pillClassName,
                  )}
                >
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-10 bg-slate-100 px-6 py-16 mobile:gap-16 mobile:px-16 mobile:py-24">
          <div className="flex w-full max-w-7xl flex-col items-center gap-10 mobile:flex-row mobile:justify-between mobile:gap-8">
            <div className="flex flex-col items-start gap-6 text-left">
              <span className="text-sm font-bold text-green-500 mobile:text-base">달램 토크</span>
              <h2 className="text-2xl leading-snug font-bold break-keep text-zinc-900 mobile:text-4xl">
                다양한 사람들과
                <br />
                자유롭게 이야기를 나눠보세요
              </h2>
              <p className="text-sm leading-relaxed break-keep text-zinc-500 mobile:text-base">
                일상 속 궁금증, 경험, 생각들을 자유롭게 나누세요.
                <br />
                웃고 공감하며 함께 즐거움을 나누는 공간입니다.
              </p>
            </div>

            <Image
              src={talkIllustration}
              alt="달램 토크 게시글과 댓글 화면 예시"
              className="h-auto w-full min-w-0 max-w-md mobile:max-w-2xl"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-12 bg-emerald-300 py-16 mobile:py-24">
          <div className="flex w-full max-w-7xl flex-col items-center gap-3 px-6 text-center mobile:px-16">
            <span className="text-sm font-bold text-emerald-800 mobile:text-base">모든 리뷰</span>
            <h2 className="text-2xl font-bold break-keep text-zinc-900 mobile:text-4xl">
              참여자들의 생생한 후기를 만나보세요
            </h2>
            <p className="text-sm break-keep text-zinc-700 mobile:text-base">
              함께한 순간이 어떤 특별한 경험이 되었는지 전해드립니다.
            </p>
          </div>

          <div
            ref={reviewTrackRef}
            data-lenis-prevent
            className="no-scrollbar w-full overflow-x-auto"
          >
            <div className="flex w-max gap-6 px-6">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="flex w-80 shrink-0 flex-col gap-4 rounded-3xl bg-white p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <User className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, heartIndex) => (
                          <Heart
                            key={heartIndex}
                            className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">
                        <span className="font-semibold text-zinc-700">{review.name}</span>{" "}
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed break-keep text-zinc-700">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gradient-start-100 to-gradient-end-100 px-6 py-20 mobile:py-32">
          <Image
            src={bottomCircle}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-6 left-[18%] z-0 h-20 w-20 opacity-80 mobile:h-48 mobile:w-48"
          />
          <Image
            src={bottomSparkle}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-[6%] z-0 h-auto w-6 -translate-y-1/2 mobile:w-10"
          />
          <Image
            src={bottomWave}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-0 -bottom-10 z-0 h-auto w-64 translate-x-1/4 mobile:w-2xl"
          />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <h2 className="text-2xl font-bold break-keep mobile:text-4xl">
              <span className="text-zinc-900">혼자 시작하기 어려웠던 일들,</span>
              <br />
              <span className="text-green-500">같이달램에서 함께 해요</span>
            </h2>
            <Button size="md" nativeButton={false} render={<Link href="/events" />}>
              모임 찾아보기
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
