import fsPromises from 'fs/promises';
import path from 'path';
import { Section } from '@/components';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'aiken', 'cnft-gift-card', 'plutus.json');
  const data = await fsPromises.readFile(filePath, 'utf-8');
  const blueprint = JSON.parse(data);

  return (
    <main>
      <Section blueprint={blueprint} />
    </main>
  );
}
