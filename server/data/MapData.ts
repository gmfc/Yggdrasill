export declare type MapData = {
  mapName: string,
  map: any,
  size: number,
  agentGroups: [AgentGroupData]
}

export declare type AgentGroupData = {
  agentName: string,
  number: number
}

export function getMapData (mapName: string): MapData {
  return {
    mapName: 'testMap',
    map: false,
    size: 500,
    agentGroups: [
      { agentName: 'Slime', number: 30 }
    ]
  } as MapData
}
