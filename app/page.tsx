import Link from 'next/link';
import Image from 'next/image';
import { getCharacterList, Character } from '@/lib/microcms';
import styles from './page.module.css';

// 表示したい属性の順序を定義
const ELEMENT_ORDER = ['回折', '消滅', '焦熱', '凝縮', '電導', '気動'];

export default async function Home() {
  const { contents: allCharacters } = await getCharacterList({ limit: 100 });
  
  const rovers = allCharacters.filter((char) => char.name.includes('漂泊者'));
  const others = allCharacters.filter((char) => !char.name.includes('漂泊者'));

  const groupedCharacters: Record<string, Character[]> = {};
  others.forEach((char) => {
    const el = char.element;
    if (!groupedCharacters[el]) groupedCharacters[el] = [];
    groupedCharacters[el].push(char);
  });

  return (
    <main className={styles.main}>
      {/* 巨大なヒーロータイトルエリア */}
      <header className={styles.heroHeader}>
        <p className={styles.subHeader}>WUTHERING WAVES</p>
        <h1 className={styles.heroTitle}>鳴潮</h1>
        <p className={styles.heroDesc}>共鳴者一覧データ</p>
      </header>

      {/* 漂泊者（主役級の特別表示） */}
      {rovers.length > 0 && (
        <section className={styles.section}>
          <div className={styles.label}>Protagonist</div>
          <div className={styles.roverGrid}>
            {rovers.map((character) => (
              <CharacterCard key={character.id} character={character} isRover />
            ))}
          </div>
        </section>
      )}

      {/* 属性別リスト */}
      <div className={styles.elementWrapper}>
        {ELEMENT_ORDER.map((element) => {
          const charsInElement = groupedCharacters[element];
          if (!charsInElement || charsInElement.length === 0) return null;

          return (
            <section key={element} className={styles.section}>
              <div className={styles.elementHeader}>
                <span className={styles.elementLabel}>{element}</span>
                <span className={styles.line}></span>
              </div>
              <div className={styles.grid}>
                {charsInElement.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

// デザイン変更: テキストをImageContainerの中に移動し、オーバーレイ表示にする
function CharacterCard({ character, isRover = false }: { character: Character, isRover?: boolean }) {
  return (
    <Link href={`/characters/${character.id}`} className={`${styles.card} ${isRover ? styles.cardRover : ''}`}>
      <div className={styles.imageBackground}>
        {character.image ? (
          <Image
            src={character.image.url}
            alt={character.name}
            fill
            sizes={isRover ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 300px"}
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
        
        {/* 黒いグラデーションマスク */}
        <div className={styles.cardOverlay} />
      </div>

      {/* 情報レイヤー（画像の上に重ねる） */}
      <div className={styles.cardInfo}>
        <div className={styles.cardMeta}>
          <span className={styles.cardElement}>{character.element}</span>
          <span className={styles.cardRarity}>{character.rarity}</span>
        </div>
        <h3 className={styles.cardName}>{character.name}</h3>
      </div>
    </Link>
  );
}