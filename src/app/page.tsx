import { css } from '@/styled-system/css';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className={css({ fontSize: "2xl", fontWeight: 'bold' })}>Hello 🐼!</div>
      <Link href="/gift">Create Gift Card</Link>
    </main>
  )
}
