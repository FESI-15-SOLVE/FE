import { RegionItem } from './region-item';
import { RegionData } from '@/constants/regions';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface RegionGroupProps {
  region: RegionData;
  tempSelected: string | null;
  onSelectCity: (fullRegionName: string) => void;
}

export function RegionGroup({
  region,
  tempSelected,
  onSelectCity,
}: RegionGroupProps) {
  const isProvinceSelected = tempSelected?.startsWith(region.province);

  return (
    <AccordionItem value={region.province} className="flex flex-col w-full border-none">
      <AccordionTrigger
        className={cn(
          'flex items-center justify-between w-full rounded-xl px-3 py-2.5 sm:p-3 transition-colors bg-gray-50 hover:bg-neutral-50 hover:no-underline',
          isProvinceSelected && 'border-gradient-500',
          'data-open:bg-gray-200'
        )}
      >
        <span
          className={cn(
            'text-sm sm:text-base',
            isProvinceSelected ? 'text-brand-500 font-semibold' : 'text-neutral-800',
          )}
        >
          {region.province}
        </span>
      </AccordionTrigger>

      <AccordionContent className="flex flex-col w-full pl-4 pr-2 mt-1 gap-1">
        {region.cities.map((city) => {
          const fullRegionName = `${region.province} ${city}`;
          const isCitySelected = tempSelected === fullRegionName;

          return (
            <RegionItem
              key={city}
              variant="city"
              label={city}
              isSelected={isCitySelected}
              onClick={() => onSelectCity(fullRegionName)}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
}
