import { notFound } from 'next/navigation';
import JournalDetail from '@/components/JournalDetail';
import { JOURNAL_ARTICLES } from '@/constants';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JournalPage({ params }: PageProps) {
  const { id } = await params;
  const article = JOURNAL_ARTICLES.find(a => a.id.toString() === id);

  if (!article) {
    notFound();
  }

  return <JournalDetail article={article} />;
}