import Link from 'next/link';
import Image from 'next/image';
import { getCharacterList, Character } from '@/lib/microcms';
import styles from './page.module.css';

// 表示したい属性の順序を定義
const ELEMENT_ORDER = ['回折', '消滅', '焦熱', '凝縮', '電導', '気動'];

export default async function Home() {
  // 全件取得するためにlimitを設定（前回修正分）
  const { contents: allCharacters } = await getCharacterList({ limit: 100 });

  // 1. 「漂泊者」と「それ以外」に分ける
  // 名前が「漂泊者」から始まる、または含むキャラを抽出
  const rovers = allCharacters.filter((char) => char.name.includes('漂泊者'));
  const others = allCharacters.filter((char) => !char.name.includes('漂泊者'));

  // 2. 「それ以外」を属性ごとにグループ化
  const groupedCharacters: Record<string, Character[]> = {};
  
  others.forEach((char) => {
    const el = char.element;
    if (!groupedCharacters[el]) {
      groupedCharacters[el] = [];
    }
    groupedCharacters[el].push(char);
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>鳴潮 キャラクター紹介</h1>

      {/* --- 漂泊者セクション (一番上) --- */}
      {rovers.length > 0 && (
        <section className={styles.roverSection}>
          <h2 className={styles.sectionTitle}>主人公</h2>
          <div className={styles.roverGrid}>
            {rovers.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      )}

      {/* --- 属性別セクション --- */}
      {ELEMENT_ORDER.map((element) => {
        const charsInElement = groupedCharacters[element];
        // その属性にキャラがいなければ表示しない
        if (!charsInElement || charsInElement.length === 0) return null;

        return (
          <section key={element} className={styles.elementSection}>
            <h2 className={styles.elementTitle}>{element}</h2>
            <div className={styles.grid}>
              {charsInElement.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

// カード部分は共通化コンポーネントとして切り出しておくとスッキリします
function CharacterCard({ character }: { character: Character }) {
  return (
    <Link href={`/characters/${character.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {character.image ? (
          <Image
            src={character.image.url}
            alt={character.name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardName}>{character.name}</h3>
        <p className={styles.cardRarity}>{character.rarity}</p>
      </div>
    </Link>
  );
}