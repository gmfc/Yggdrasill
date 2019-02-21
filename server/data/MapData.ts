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

export async function getMapData (mapName: string): Promise<MapData> {
  return {
    mapName: 'testMap',
    map: false,
    size: 500,
    agentGroups: [
      { agentName: 'Slime', numberOfAgents: 30 }
    ]
  } as MapData
}
