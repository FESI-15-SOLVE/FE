import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export interface PlaceSearchFormProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: (e?: React.SubmitEvent) => void;
}

export function PlaceSearchForm({
  keyword,
  onKeywordChange,
  onSearch,
}: PlaceSearchFormProps) {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSearch(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
      <Input
        placeholder="장소명 또는 도로명 주소를 입력하세요 (예: 스타벅스 강남역점)"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        className="flex-1"
      />
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="px-5 shrink-0"
      >
        <Search className="size-5" />
      </Button>
    </form>
  );
}
