import { db } from '../libs/firebase-admin'
import { buildMonster, Monster } from '../types/Monster'

export const saveRespawnTime = async (
  id: string,
  name: string,
  start: number,
  end: number
) => {
  const ref = db.collection('monsters')
  ref
    .doc(id)
    .set({ name, start, end })
    .catch((e) => console.error(e))
}

// .where("name", "==", name).get()
//   const doc = snapshot.docs.shift()
//   const data = doc?.data()

export const getMonsters = async () => {
  const ref = db.collection('monsters')
  const snapshot = await ref.get()
  let monsters: Monster[] = []
  snapshot.forEach((doc) => {
    const monster = buildMonster(doc.id, doc.data())
    monsters.push(monster)
  })
  return monsters
}
