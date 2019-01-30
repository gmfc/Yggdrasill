import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'

export declare type NPCData = {
    name: string,
    number: number
}
export declare type MapData = {
    name: string,
    npcs: NPCData[]
}

export function getMapData(name:string): MapData {
    const adapter = new FileSync('./data/db.json')
    const db = low(adapter)

    return <MapData>db.get('maps')
        .find({name:name})
        .value()

}