export interface RouteEntry {
  destination: string;       // e.g. "192.168.1.0/24" or "R4-LAN"
  networkName: string;       // Friendly label e.g. "Subnet Alpha"
  nextHop: string;           // "DIRECT" or Router ID like "R2"
  metric: number;            // 1 to 16 (16 = Infinity / unreachable)
  routeTag?: number;         // RIPv2 route tag
  learnedViaInterface: string;
  lastUpdated: number;       // relative sim tick
  status: 'active' | 'in-holddown' | 'poisoned' | 'expired';
  holddownRemaining?: number;
}

export interface RouterInterface {
  name: string;              // e.g. "eth0", "Gi0/0"
  ip: string;                // e.g. "10.0.1.1/30"
  connectedToRouterId?: string;
  connectedLinkCost: number;  // typically 1 in pure RIP
  isUp: boolean;
}

export interface RouterNode {
  id: string;                // e.g. "R1"
  name: string;              // e.g. "Border Router 01"
  label: string;
  x: number;                 // Canvas X coordinate
  y: number;                 // Canvas Y coordinate
  interfaces: RouterInterface[];
  routingTable: RouteEntry[];
  lanNetwork?: string;       // Locally attached subnet e.g. "172.16.1.0/24"
  status: 'online' | 'rebooting' | 'offline';
  updateJitterRemaining: number; // Seconds until next periodic update
}

export interface NetworkLink {
  id: string;                // e.g. "R1-R2"
  source: string;            // Router ID
  target: string;            // Router ID
  sourceInterface: string;
  targetInterface: string;
  cost: number;              // default 1
  status: 'up' | 'down' | 'flapping';
  bandwidth?: string;        // e.g. "1 Gbps" or "56 Kbps"
  latency?: string;          // e.g. "2 ms"
}

export interface AnimatedPacket {
  id: string;
  sourceId: string;
  targetId: string;
  destinationNetwork: string;
  progress: number;          // 0.0 to 1.0 along the link
  type: 'data' | 'rip-update' | 'rip-response' | 'rip-poison';
  color: string;
  payloadSummary: string;
  hopCount: number;
  currentLink: string;
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  type: 'update' | 'poison' | 'link_failure' | 'link_recovery' | 'convergence' | 'loop_detected' | 'packet_delivered';
  message: string;
  details?: string;
  routerId?: string;
}

export interface TopologyPreset {
  id: string;
  name: string;
  description: string;
  difficulty: 'Elementary' | 'Intermediate' | 'Pathological';
  routers: RouterNode[];
  links: NetworkLink[];
  recommendedDemo: string;
}

export interface SafeguardsConfig {
  splitHorizon: boolean;
  poisonReverse: boolean;
  triggeredUpdates: boolean;
  holddownTimers: boolean;
}
