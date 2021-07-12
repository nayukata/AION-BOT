import { db } from '../libs/firebase-admin'
import { buildMonster, Monster } from '../types/Monster'

export const saveRespawnTime = async (
  id: string,
  name: string,
  start: number,
  end: number
) => {
  try {
    const ref = db.collection('monsters')
    ref.doc(id).set({ name, start, end })
  } catch (e) {
    return console.error(`saveRespawnTime Error: ${e}`)
  }
}

export const getMonsters = async () => {
  try {
    const ref = db.collection('monsters')
    const snapshot = await ref.get()
    let monsters: Monster[] = []
    snapshot.forEach((doc) => {
      const monster = buildMonster(doc.id, doc.data())
      monsters.push(monster)
    })
    return monsters
  } catch (e) {
    console.error(`getMonsters Error: ${e}`)
    return []
  }
}
