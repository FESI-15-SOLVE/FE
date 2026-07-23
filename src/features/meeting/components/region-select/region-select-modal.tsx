import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RegionList } from './region-list';

export interface RegionSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion?: string | null;
  onSelect: (region: string) => void;
}

export function RegionSelectModal({
  isOpen,
  onClose,
  selectedRegion,
  onSelect,
}: RegionSelectModalProps) {
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);
  const [tempSelected, setTempSelected] = useState<string | null>(
    selectedRegion || null,
  );

  const handleClose = () => {
    setTempSelected(selectedRegion || null);
    setExpandedProvince(null);
    onClose();
  };

  const handleConfirm = () => {
    if (tempSelected) {
      onSelect(tempSelected);
    }
    onClose();
  };

  const handleToggleExpand = (province: string) => {
    setExpandedProvince(province || null);
  };

  const handleSelectRegion = (regionName: string) => {
    setTempSelected(regionName);
    if (regionName === '전체') {
      setExpandedProvince(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-85.75 sm:max-w-136 p-6 pt-8 pb-6 sm:p-12 rounded-[24px] sm:rounded-[40px] gap-8 sm:gap-14 border-none bg-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg sm:text-2xl font-semibold text-neutral-900">
            지역 선택
          </DialogTitle>
        </DialogHeader>

        <RegionList
          expandedProvince={expandedProvince}
          tempSelected={tempSelected}
          onToggleExpand={handleToggleExpand}
          onSelectRegion={handleSelectRegion}
        />

        <div className="flex items-center gap-3 sm:gap-4 w-full">
          <Button
            type="button"
            variant="tertiary"
            size="md"
            className="flex-1 h-12 sm:h-15 text-base sm:text-xl rounded-xl sm:rounded-2xl"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1 h-12 sm:h-15 text-base sm:text-xl rounded-xl sm:rounded-2xl"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
