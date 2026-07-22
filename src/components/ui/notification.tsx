"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import notiImg from "@/assets/svg/noti_img.svg";
import profileImg from "@/assets/svg/img_profile.svg";
import checkCircle from "@/assets/svg/check-circle.svg";

export type NotificationType = "confirmed" | "cancelled" | "comment" | "changed";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "confirmed",
    title: "모임 확정",
    message: "힐링 오피스 스트레칭 모임 개설이 확정되었어요!",
    time: "1분 전",
    isRead: false,
  },
  {
    id: 2,
    type: "cancelled",
    title: "모임 취소",
    message: "힐링 오피스 스트레칭 모임이 취소되었어요.",
    time: "2시간 전",
    isRead: false,
  },
  {
    id: 3,
    type: "comment",
    title: "새로운 댓글",
    message: "클라이밍 어때요? - 딸기님의 댓글 “정말 재밌어요 :)”",
    time: "4일 전",
    isRead: false,
  },
  {
    id: 4,
    type: "changed",
    title: "모임 내용 변경",
    message: "'카페 투어 멤버 모집' 모임 내용이 변경되었어요.",
    time: "5일 전",
    isRead: false,
  },
];

interface NotificationPanelProps {
  isOpen: boolean;
  notifications: NotificationItem[];
  onNotificationClick: (id: number) => void;
  onMarkAllRead: () => void;
}

const showCheckIcon = (type: NotificationType) => type === "confirmed";

export function NotificationPanel({
  isOpen,
  notifications,
  onNotificationClick,
  onMarkAllRead,
}: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!panelRef.current) return;

    const isMobile = window.matchMedia("(max-width: 744px)").matches;

    if (isOpen) {
      if (isMobile) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, x: 40, scale: 0.96, borderRadius: 32, transformOrigin: "right center" },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            borderRadius: 32,
            duration: 0.45,
            ease: "power3.out",
          },
        );
      } else {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.7, y: -24, borderRadius: 64 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            borderRadius: 32,
            duration: 0.8,
            ease: "elastic.out(1, 0.7)",
            transformOrigin: "top right",
            keyframes: [
              { scale: 0.82, opacity: 0.55, y: -20, duration: 0.2 },
              { scale: 1.08, opacity: 0.95, y: 8, duration: 0.25 },
              { scale: 1, opacity: 1, y: 0, duration: 0.35 },
            ],
          },
        );
      }
    } else {
      if (isMobile) {
        gsap.to(panelRef.current, {
          opacity: 0,
          x: 36,
          scale: 0.96,
          borderRadius: 32,
          duration: 0.3,
          ease: "power3.in",
        });
      } else {
        gsap.to(panelRef.current, {
          opacity: 0,
          scale: 0.78,
          y: -20,
          borderRadius: 64,
          duration: 0.55,
          ease: "power4.in",
          transformOrigin: "top right",
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className="fixed top-16 left-0 right-0 z-50 w-full rounded-tr-[32px] rounded-bl-[32px] border border-zinc-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.08)] min-[745px]:absolute min-[745px]:top-full min-[745px]:right-0 min-[745px]:left-auto min-[745px]:mt-3 min-[745px]:w-[26rem] min-[745px]:min-w-[22rem] min-[745px]:rounded-[32px]"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
        <span className="text-sm font-semibold text-zinc-900">알림 내역</span>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="text-xs text-zinc-500 transition hover:text-zinc-900"
        >
          모두 읽기
        </button>
      </div>

      <div className="max-h-[30rem] overflow-y-auto">
        {notifications.map((notification) => (
          <a
            key={notification.id}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onNotificationClick(notification.id);
            }}
            className={`group relative block border-b border-zinc-200 px-5 py-4 transition ${
              notification.isRead ? "bg-white" : "bg-zinc-100"
            } hover:bg-white last:rounded-b-[32px] last:border-b-0`}
          >
            <div className="absolute right-5 top-5 flex items-center gap-1 text-xs text-zinc-500">
              {!notification.isRead ? (
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ) : null}
              <span>{notification.time}</span>
            </div>

            <div className="flex gap-3">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-3xl bg-zinc-100">
                <Image
                  src={notification.type === "comment" ? profileImg : notiImg}
                  alt="알림 이미지"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-900">
                    {notification.title}
                  </span>
                  {showCheckIcon(notification.type) ? (
                    <Image
                      src={checkCircle}
                      alt="확정 아이콘"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {notification.message}
                </p>
              </div>
            </div>

            
          </a>
        ))}
      </div>
    </div>
  );
}
