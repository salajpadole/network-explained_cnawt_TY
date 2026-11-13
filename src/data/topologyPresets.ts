import { TopologyPreset } from '../types/network';

export const TOPOLOGY_PRESETS: TopologyPreset[] = [
  {
    id: 'linear',
    name: '3-Node Linear Chain',
    description: 'The canonical textbook topology for analyzing Count-to-Infinity and testing Split Horizon.',
    difficulty: 'Elementary',
    recommendedDemo: 'Sever link R2-R3 with safeguards disabled to observe count-to-infinity metric explosion.',
    routers: [
      {
        id: 'R1',
        name: 'Border Gateway R1',
        label: 'R1',
        x: 140,
        y: 220,
        status: 'online',
        updateJitterRemaining: 28,
        lanNetwork: '10.0.1.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.12.1/30', connectedToRouterId: 'R2', connectedLinkCost: 1, isUp: true },
          { name: 'Loop0', ip: '10.0.1.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '10.0.1.0/24', networkName: 'R1 Local LAN', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Loop0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.12.0/30', networkName: 'Link R1-R2', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.23.0/30', networkName: 'Link R2-R3', nextHop: 'R2', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '192.168.10.0/24', networkName: 'Target Subnet X', nextHop: 'R2', metric: 3, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R2',
        name: 'Distribution Router R2',
        label: 'R2',
        x: 400,
        y: 220,
        status: 'online',
        updateJitterRemaining: 31,
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.12.2/30', connectedToRouterId: 'R1', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.23.1/30', connectedToRouterId: 'R3', connectedLinkCost: 1, isUp: true }
        ],
        routingTable: [
          { destination: '10.0.1.0/24', networkName: 'R1 Local LAN', nextHop: 'R1', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.12.0/30', networkName: 'Link R1-R2', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.23.0/30', networkName: 'Link R2-R3', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' },
          { destination: '192.168.10.0/24', networkName: 'Target Subnet X', nextHop: 'R3', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R3',
        name: 'Edge Router R3',
        label: 'R3',
        x: 660,
        y: 220,
        status: 'online',
        updateJitterRemaining: 26,
        lanNetwork: '192.168.10.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.23.2/30', connectedToRouterId: 'R2', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '192.168.10.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '10.0.1.0/24', networkName: 'R1 Local LAN', nextHop: 'R2', metric: 3, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.12.0/30', networkName: 'Link R1-R2', nextHop: 'R2', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.23.0/30', networkName: 'Link R2-R3', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '192.168.10.0/24', networkName: 'Target Subnet X', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' }
        ]
      }
    ],
    links: [
      { id: 'R1-R2', source: 'R1', target: 'R2', sourceInterface: 'Gi0/0', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '1 Gbps', latency: '1 ms' },
      { id: 'R2-R3', source: 'R2', target: 'R3', sourceInterface: 'Gi0/1', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '1 Gbps', latency: '1 ms' }
    ]
  },
  {
    id: 'triangle',
    name: 'Redundant Triangle',
    description: 'Demonstrates alternate-path convergence: when the direct link breaks, RIP reroutes across the alternate node.',
    difficulty: 'Intermediate',
    recommendedDemo: 'Break link R1-R3. Watch R1 dynamically converge and adopt the route via R2 (metric increases from 1 to 2).',
    routers: [
      {
        id: 'R1',
        name: 'Gateway R1',
        label: 'R1',
        x: 180,
        y: 130,
        status: 'online',
        updateJitterRemaining: 29,
        lanNetwork: '10.1.0.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.12.1/30', connectedToRouterId: 'R2', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.13.1/30', connectedToRouterId: 'R3', connectedLinkCost: 1, isUp: true },
          { name: 'Loop0', ip: '10.1.0.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '10.1.0.0/24', networkName: 'R1 LAN', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Loop0', lastUpdated: 0, status: 'active' },
          { destination: '10.2.0.0/24', networkName: 'R2 LAN', nextHop: 'R2', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.3.0.0/24', networkName: 'Target Subnet (R3)', nextHop: 'R3', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R2',
        name: 'Transit Router R2',
        label: 'R2',
        x: 620,
        y: 130,
        status: 'online',
        updateJitterRemaining: 32,
        lanNetwork: '10.2.0.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.12.2/30', connectedToRouterId: 'R1', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.23.1/30', connectedToRouterId: 'R3', connectedLinkCost: 1, isUp: true },
          { name: 'Loop0', ip: '10.2.0.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '10.1.0.0/24', networkName: 'R1 LAN', nextHop: 'R1', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.2.0.0/24', networkName: 'R2 LAN', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Loop0', lastUpdated: 0, status: 'active' },
          { destination: '10.3.0.0/24', networkName: 'Target Subnet (R3)', nextHop: 'R3', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R3',
        name: 'Edge Router R3',
        label: 'R3',
        x: 400,
        y: 330,
        status: 'online',
        updateJitterRemaining: 27,
        lanNetwork: '10.3.0.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.13.2/30', connectedToRouterId: 'R1', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.23.2/30', connectedToRouterId: 'R2', connectedLinkCost: 1, isUp: true },
          { name: 'Loop0', ip: '10.3.0.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '10.1.0.0/24', networkName: 'R1 LAN', nextHop: 'R1', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.2.0.0/24', networkName: 'R2 LAN', nextHop: 'R2', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' },
          { destination: '10.3.0.0/24', networkName: 'Target Subnet (R3)', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Loop0', lastUpdated: 0, status: 'active' }
        ]
      }
    ],
    links: [
      { id: 'R1-R2', source: 'R1', target: 'R2', sourceInterface: 'Gi0/0', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '10 Gbps', latency: '0.8 ms' },
      { id: 'R1-R3', source: 'R1', target: 'R3', sourceInterface: 'Gi0/1', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '1 Gbps', latency: '3 ms' },
      { id: 'R2-R3', source: 'R2', target: 'R3', sourceInterface: 'Gi0/1', targetInterface: 'Gi0/1', cost: 1, status: 'up', bandwidth: '1 Gbps', latency: '2 ms' }
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond Backbone (4 Nodes)',
    description: 'Dual-path enterprise core demonstrating multi-path topology and Bellman-Ford equal cost distribution.',
    difficulty: 'Intermediate',
    recommendedDemo: 'Send packets from R1 to R4 LAN. Observe how RIP selects the shortest path and converges if one branch fails.',
    routers: [
      {
        id: 'R1',
        name: 'Ingress Gateway R1',
        label: 'R1',
        x: 120,
        y: 220,
        status: 'online',
        updateJitterRemaining: 29,
        lanNetwork: '192.168.1.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.12.1/30', connectedToRouterId: 'R2', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.13.1/30', connectedToRouterId: 'R3', connectedLinkCost: 1, isUp: true },
          { name: 'Loop0', ip: '192.168.1.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '192.168.1.0/24', networkName: 'Source LAN', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Loop0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.24.0/30', networkName: 'North Link', nextHop: 'R2', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '10.0.34.0/30', networkName: 'South Link', nextHop: 'R3', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' },
          { destination: '192.168.4.0/24', networkName: 'Target DataCenter', nextHop: 'R2', metric: 3, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R2',
        name: 'North Spine R2',
        label: 'R2',
        x: 400,
        y: 110,
        status: 'online',
        updateJitterRemaining: 30,
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.12.2/30', connectedToRouterId: 'R1', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.24.1/30', connectedToRouterId: 'R4', connectedLinkCost: 1, isUp: true }
        ],
        routingTable: [
          { destination: '192.168.1.0/24', networkName: 'Source LAN', nextHop: 'R1', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '192.168.4.0/24', networkName: 'Target DataCenter', nextHop: 'R4', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R3',
        name: 'South Spine R3',
        label: 'R3',
        x: 400,
        y: 330,
        status: 'online',
        updateJitterRemaining: 27,
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.13.2/30', connectedToRouterId: 'R1', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.34.1/30', connectedToRouterId: 'R4', connectedLinkCost: 1, isUp: true }
        ],
        routingTable: [
          { destination: '192.168.1.0/24', networkName: 'Source LAN', nextHop: 'R1', metric: 2, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '192.168.4.0/24', networkName: 'Target DataCenter', nextHop: 'R4', metric: 2, learnedViaInterface: 'Gi0/1', lastUpdated: 0, status: 'active' }
        ]
      },
      {
        id: 'R4',
        name: 'Egress Router R4',
        label: 'R4',
        x: 680,
        y: 220,
        status: 'online',
        updateJitterRemaining: 31,
        lanNetwork: '192.168.4.0/24',
        interfaces: [
          { name: 'Gi0/0', ip: '10.0.24.2/30', connectedToRouterId: 'R2', connectedLinkCost: 1, isUp: true },
          { name: 'Gi0/1', ip: '10.0.34.2/30', connectedToRouterId: 'R3', connectedLinkCost: 1, isUp: true },
          { name: 'Loop0', ip: '192.168.4.1/24', connectedLinkCost: 0, isUp: true }
        ],
        routingTable: [
          { destination: '192.168.1.0/24', networkName: 'Source LAN', nextHop: 'R2', metric: 3, learnedViaInterface: 'Gi0/0', lastUpdated: 0, status: 'active' },
          { destination: '192.168.4.0/24', networkName: 'Target DataCenter', nextHop: 'DIRECT', metric: 1, learnedViaInterface: 'Loop0', lastUpdated: 0, status: 'active' }
        ]
      }
    ],
    links: [
      { id: 'R1-R2', source: 'R1', target: 'R2', sourceInterface: 'Gi0/0', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '10 Gbps', latency: '0.5 ms' },
      { id: 'R1-R3', source: 'R1', target: 'R3', sourceInterface: 'Gi0/1', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '10 Gbps', latency: '0.6 ms' },
      { id: 'R2-R4', source: 'R2', target: 'R4', sourceInterface: 'Gi0/1', targetInterface: 'Gi0/0', cost: 1, status: 'up', bandwidth: '10 Gbps', latency: '0.5 ms' },
      { id: 'R3-R4', source: 'R3', target: 'R4', sourceInterface: 'Gi0/1', targetInterface: 'Gi0/1', cost: 1, status: 'up', bandwidth: '10 Gbps', latency: '0.6 ms' }
    ]
  }
];
