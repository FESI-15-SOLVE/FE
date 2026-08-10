import { EmptyState } from '@/components/ui/empty/empty';

interface EmptyReviewStateProps {
  message: string;
}

export function EmptyReviewState({ message }: EmptyReviewStateProps) {
  return (
    <div className="py-16">
      <EmptyState message={message} />
    </div>
  );
}
