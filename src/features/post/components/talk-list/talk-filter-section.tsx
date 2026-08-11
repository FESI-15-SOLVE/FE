'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useQueryStates } from 'nuqs';
import { Search } from 'lucide-react';
import { postSearchParams, PostSortBy, SORT_BY_OPTIONS } from '../../schema/post-search-params';
import { FilterTrigger } from '@/components/ui/filter';

const SORT_LABELS: Record<PostSortBy, string> = {
  createdAt: '최신순',
  likeCount: '좋아요순',
  viewCount: '조회수순',
  commentCount: '댓글많은순',
};

export function TalkFilterSection() {
  const [params, setParams] = useQueryStates(postSearchParams);
  const [searchInput, setSearchInput] = useState(params.keyword);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ keyword: searchInput.trim(), page: 1 });
  };

  const handleSortSelect = (value: PostSortBy) => {
    setParams({ sortBy: value, page: 1 });
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-2 w-full">
      {/* 검색바 — 피그마: bg-slate-100/rounded-full/pl-4 pr-3 py-2.5 */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center bg-slate-100 rounded-full pl-4 pr-3 py-2.5 w-[376px]"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="궁금한 내용을 검색해보세요."
          className="flex-1 bg-transparent text-sm font-normal text-slate-800 placeholder:text-slate-500 placeholder:tracking-[-0.28px] focus:outline-none leading-5"
        />
        <button
          type="submit"
          className="shrink-0 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="검색"
        >
          <Search className="size-6" />
        </button>
      </form>

      {/* 정렬 필터 — FilterTrigger mode="sort" */}
      <div className="relative" ref={dropdownRef}>
        <FilterTrigger
          mode="sort"
          size="lg"
          isSelected={isOpen || params.sortBy !== 'createdAt'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {SORT_LABELS[params.sortBy]}
        </FilterTrigger>

        {isOpen && (
          <ul className="absolute right-0 top-full mt-1 z-20 min-w-[130px] bg-white border border-slate-200 rounded-xl shadow-md py-1 overflow-hidden">
            {SORT_BY_OPTIONS.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSortSelect(option)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.28px] transition-colors cursor-pointer
                    ${params.sortBy === option
                      ? 'text-green-500 bg-green-50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                >
                  {SORT_LABELS[option]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
