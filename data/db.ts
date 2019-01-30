import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'

export function populate() {
    const adapter = new FileSync('./data/db.json')
    const db = low(adapter)

    db.defaults({ maps: [] })
        .write()

    // Add a post
    db.get('maps')
        .push({ name: 'test', npcs: [{ name: 'slime', number: 5 }] })
        .write()
}