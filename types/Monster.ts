export type Monster = {
  id: string
  name: MonsterNames
  start: number
  end: number
}

type MonsterNames =
  | 'rasberg'
  | 'ラスベルグ'
  | 'zaphiel'
  | 'ザフィエル'
  | 'cheshti'
  | 'チェシュチ'
  | 'menotios'
  | 'メノティオス'
  | 'alukina'
  | 'アールキナ'
  | 'roughbrie'
  | 'ラフブリ'

// type ResponseNames = {
//   [key: string]: MonsterNames
// }

export const buildMonster = (
  id: string,
  data: FirebaseFirestore.DocumentData
): Monster => {
  return {
    id,
    name: data.name,
    start: data.start,
    end: data.end,
  }
}
