import Image from 'next/image';
import { getCharacterDetail, getCharacterList } from '@/lib/microcms';
import styles from './page.module.css';

// Propsの型定義をここに記述
type Props = {
  params: Promise<{ id: string }>;
  // searchParamsも型定義に含めておくとより堅牢になりますが、今回は使わないのでなくてもOKです
};

// 静的パスを生成する関数 (SSG) - こちらは変更なし
export async function generateStaticParams() {
  const { contents } = await getCharacterList({
    fields: 'id',
  });

  const paths = contents.map((character) => ({
    id: character.id,
  }));

  return paths;
}

// ページコンポーネント
// Propsの型を先ほど定義した `Props` に変更
export default async function CharacterDetail(props: Props) {
  // propsオブジェクトから直接paramsを取り出す
  const { id } = await props.params; 
  const character = await getCharacterDetail(id);

  if (!character) {
    return <div>キャラクターが見つかりません。</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {character.image && (
          <Image
            src={character.image.url}
            alt={character.name}
            width={character.image.width}
            height={character.image.height}
            className={styles.image}
            priority
          />
        )}
      </div>
      <div className={styles.details}>
        <p className={styles.affiliation}>{character.affiliation || '所属不明'}</p>
        <h1 className={styles.name}>{character.name}</h1>
        <div className={styles.metaGrid}>
          <div>
            <span className={styles.metaLabel}>レアリティ</span>
            <span className={styles.metaValue}>{character.rarity}</span>
          </div>
          <div>
            <span className={styles.metaLabel}>属性</span>
            <span className={styles.metaValue}>{character.element}</span>
          </div>
          <div>
            <span className={styles.metaLabel}>武器種</span>
            <span className={styles.metaValue}>{character.weapon || '不明'}</span>
          </div>
          <div>
            <span className={styles.metaLabel}>出身地</span>
            <span className={styles.metaValue}>{character.origin || '不明'}</span>
          </div>
          <div>
            <span className={styles.metaLabel}>所属</span>
            <span className={styles.metaValue}>{character.affiliation || '不明'}</span>
          </div>
        </div>
        {character.description && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: character.description }}
          />
        )}
      </div>
    </div>
  );
}