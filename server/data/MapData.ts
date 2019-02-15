export declare type MapData = {
  mapName: string,
  map: any,
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
    agentGroups: [
      { agentName: 'Slime', number: 20 }
    ]
  } as MapData
}
