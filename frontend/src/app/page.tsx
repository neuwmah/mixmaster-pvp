import Fullbanner from '@/app/home/Fullbanner';
import News from '@/app/home/News';
import Ranking from '@/app/home/Ranking';

export default function HomePage() {
  return (
    <main>
      <Fullbanner />
      <News account={false} />
      <Ranking />
    </main>
  )
}