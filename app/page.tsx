import Link from 'next/link';
import Image from 'next/image';
import { getCharacterList, Character } from '@/lib/microcms'; // libフォルダからのインポート
import styles from './page.module.css'; // CSS Modulesのインポート

export default async function Home() {
  const { contents: characters } = await getCharacterList();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>鳴潮 キャラクター紹介</h1>
      <div className={styles.grid}>
        {characters.map((character: Character) => (
          <Link href={`/characters/${character.id}`} key={character.id} className={styles.card}>
            {character.image && (
              <Image
                src={character.image.url}
                alt={character.name}
                width={200}
                height={200}
                className={styles.cardImage}
              />
            )}
            <h2>{character.name}</h2>
            <p>{character.rarity}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}