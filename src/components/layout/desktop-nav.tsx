'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CountBadge } from '@/components/ui/badge';
import { MobileMenuLinkProps } from './mobile-menu-nav';

interface DesktopNavProps {
  links: MobileMenuLinkProps[];
  isLoggedIn: boolean;
}

export function DesktopNav({ links, isLoggedIn }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-1 px-1 py-2 text-base tracking-[-0.32px] transition-colors',
              isActive
                ? 'font-semibold text-green-600'
                : 'font-medium text-neutral-500 hover:text-neutral-900',
            )}
          >
            {link.label}
            {link.hasBadge && isLoggedIn && <CountBadge count={1} />}
          </Link>
        );
      })}
    </nav>
  );
}
