export declare type MapData = {
  mapName: string,
  map: any,
  agentGroups: [{agentName: string, number: number}]
}

export function getMapData (mapName: string): MapData {
  return {
    mapName: 'testMap',
    map: false,
    agentGroups: [
      { agentName: 'TestSlime', number: 5 }
    ]
  } as MapData
}
