export declare type MapData = {
  mapName: string,
  map: any,
  size: number,
  agentGroups: [AgentGroupData]
}

export declare type AgentGroupData = {
  agentName: string,
  numberOfAgents: number
}

export function getMapData (mapName: string): MapData {
  return {
    mapName: 'testMap',
    map: false,
    size: 500,
    agentGroups: [
      { agentName: 'Slime', numberOfAgents: 150 }
    ]
  } as MapData
}
