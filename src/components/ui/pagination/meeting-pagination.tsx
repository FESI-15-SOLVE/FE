"use client";

import { cn } from "@/lib/utils";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "../button";

export interface MeetingPaginationProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
  disabled?: boolean;
  size?: "lg" | "sm";
  className?: string;
}

type PageItem = number | "ellipsis";

// 페이지 번호 배열 생성하는 함수입니다. 피그마 디자인 보고 제작했고 확장성 보다는 페이지네이션은 고정되어있을 듯 싶어서 lg sm 에 따른 최소 최대, ... 위치 등만 고려했습니다.
function buildPageItems(
  current: number,
  total: number,
  size: "lg" | "sm",
): PageItem[] {
  if (size === "sm") {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 2) {
      return [1, 2, 3, "ellipsis", total];
    }
    if (current >= total - 1) {
      return [1, "ellipsis", total - 2, total - 1, total];
    }
    return [1, "ellipsis", current, "ellipsis", total];
  }

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", total];
  }
  if (current >= total - 3) {
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

const sizeClass = {
  lg: {
    item: "size-12 text-base leading-6 tracking-[-0.32px]",
    arrow: "size-12",
  },
  sm: {
    item: "size-8 text-xs leading-4",
    arrow: "size-8",
  },
} as const;

export function MeetingPagination({
  currentPage,
  totalPages,
  onNavigate,
  disabled = false,
  size = "lg",
  className,
}: MeetingPaginationProps) {
  const pageItems = buildPageItems(currentPage, totalPages, size);
  const { item: itemCls, arrow: arrowCls } = sizeClass[size];

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <PaginationRoot className={cn("justify-start", className)}>
      <PaginationContent
        className={cn(
          "gap-1 transition-opacity",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <Button
            type="button"
            variant={"custom"}
            size={"custom"}
            aria-label="이전 페이지"
            disabled={isFirstPage || disabled}
            onClick={() => onNavigate(currentPage - 1)}
            className={cn(
              arrowCls,
              "focus-visible:ring-ring mr-1.5 flex items-center justify-center rounded-md p-0 pl-0! transition-colors outline-none select-none focus-visible:ring-2 [&_svg]:size-6",
              isFirstPage || disabled
                ? "pointer-events-none text-slate-400"
                : "cursor-pointer text-slate-800 hover:bg-slate-50",
            )}
          >
            <IconArrowLeft className="size-6" />
          </Button>
        </PaginationItem>

        {/* 페이지 번호 목록 */}
        {pageItems.map((item, idx) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis
                className={cn(itemCls, "rounded-md text-slate-400")}
              />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <Button
                type="button"
                variant={"custom"}
                size={"custom"}
                aria-label={`${item} 페이지`}
                aria-current={item === currentPage ? "page" : undefined}
                disabled={disabled}
                onClick={() => onNavigate(item)}
                className={cn(
                  itemCls,
                  "focus-visible:ring-ring flex items-center justify-center rounded-md p-0 font-sans font-medium transition-colors outline-none select-none focus-visible:ring-2",
                  item === currentPage
                    ? "bg-green-200 font-bold text-green-600"
                    : "cursor-pointer bg-transparent font-normal text-slate-500 hover:bg-slate-50",
                  disabled && "pointer-events-none",
                )}
              >
                {item}
              </Button>
            </PaginationItem>
          ),
        )}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <Button
            type="button"
            variant={"custom"}
            size={"custom"}
            aria-label="다음 페이지"
            disabled={isLastPage || disabled}
            onClick={() => onNavigate(currentPage + 1)}
            className={cn(
              arrowCls,
              "focus-visible:ring-ring ml-1.5 flex items-center justify-center rounded-md p-0 pr-0! transition-colors outline-none select-none focus-visible:ring-2 [&_svg]:size-6",
              isLastPage || disabled
                ? "pointer-events-none text-slate-400"
                : "cursor-pointer text-slate-800 hover:bg-slate-50",
            )}
          >
            <IconArrowRight className="size-6" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export default MeetingPagination;
