'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconChevronRight } from '@/components/icons';
import { CountBadge } from '@/components/ui/badge';

export interface MobileMenuLinkProps {
  href: string;
  label: string;
  hasBadge?: boolean;
}

interface MobileMenuNavProps {
  links: MobileMenuLinkProps[];
  isLoggedIn: boolean;
  onLinkClick: () => void;
}

export function MobileMenuNav({ links, isLoggedIn, onLinkClick }: MobileMenuNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col flex-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className="flex items-center justify-between px-4 py-2 bg-white transition-colors hover:bg-gray-50"
          >
            <div className="flex flex-1 items-center gap-1 p-4">
              <span
                className={cn(
                  'text-base tracking-[-0.32px]',
                  isActive
                    ? 'font-semibold text-green-600'
                    : 'font-medium text-neutral-500',
                )}
              >
                {link.label}
              </span>
              {link.hasBadge && isLoggedIn && (
                <div className="ml-1">
                  <CountBadge count={1} />
                </div>
              )}
            </div>
            <IconChevronRight className="size-5 text-neutral-400 shrink-0" />
          </Link>
        );
      })}
    </nav>
  );
}
