import { GlossaryTerm, QuizQuestion, PacketField, ProtocolComparisonItem } from '../types/publication';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'as',
    term: 'Autonomous System',
    acronym: 'AS',
    category: 'Fundamentals',
    shortDefinition: 'A connected group of one or more IP prefixes run by one or more network operators with a single, clearly defined routing policy.',
    inDepthExplanation: 'Autonomous Systems (RFC 1930) represent the macro-architecture of the global internet. Interior Gateway Protocols (IGPs) like RIP and OSPF operate strictly within a single AS, whereas Exterior Gateway Protocols (EGPs) such as BGP manage route distribution between distinct Autonomous Systems.',
    rfcReferences: ['RFC 1930', 'RFC 4271'],
    relatedTerms: ['Interior Gateway Protocol', 'Border Gateway Protocol', 'Administrative Distance']
  },
  {
    id: 'bellman-ford',
    term: 'Bellman-Ford Algorithm',
    acronym: 'BF',
    category: 'Fundamentals',
    shortDefinition: 'A dynamic programming graph algorithm that calculates shortest paths from a single source node to all other nodes in a weighted digraph.',
    inDepthExplanation: 'Formulated by Richard Bellman (1958) and Lester Ford Jr. (1956). In distributed distance-vector routing, each node computes its distance vector iteratively: D_x(y) = min_v { c(x,v) + D_v(y) }, relying solely on local edge costs and neighbor advertisements without requiring global topology awareness.',
    rfcReferences: ['RFC 1058'],
    relatedTerms: ['Distance-Vector', 'Routing Information Protocol', 'Count-to-Infinity']
  },
  {
    id: 'distance-vector',
    term: 'Distance-Vector Protocol',
    acronym: 'DV',
    category: 'Fundamentals',
    shortDefinition: 'A routing protocol family where routers advertise vectors of (distance, direction) to immediate neighbors at regular periodic intervals.',
    inDepthExplanation: 'Often colloquially characterized as "routing by rumor." Routers do not possess a topological map of the network; instead, they trust neighbor assertions regarding cost and next-hop direction. RIP and Cisco IGRP are canonical examples.',
    rfcReferences: ['RFC 1058', 'RFC 2453'],
    relatedTerms: ['Bellman-Ford Algorithm', 'Link-State Protocol', 'Split Horizon']
  },
  {
    id: 'count-to-infinity',
    term: 'Count-to-Infinity Problem',
    category: 'Loop Prevention',
    shortDefinition: 'A pathology inherent to distance-vector protocols where a link failure causes routers to repeatedly increment route metrics in an invalid circular loop.',
    inDepthExplanation: 'When Router A loses direct connection to Subnet X, Router B may still advertise that it has a path to X through A. Router A, unaware that B’s path depends on A itself, updates its route to X through B with an incremented metric. The metric bounces iteratively between A and B until it hits the defined infinity threshold (16 in RIP).',
    rfcReferences: ['RFC 1058 Section 2.2'],
    relatedTerms: ['Split Horizon', 'Poison Reverse', 'Triggered Updates', 'Holddown Timer']
  },
  {
    id: 'split-horizon',
    term: 'Split Horizon',
    category: 'Loop Prevention',
    shortDefinition: 'A loop-prevention rule dictating that a router must never advertise a route out of the exact interface through which it was learned.',
    inDepthExplanation: 'Split Horizon halts two-node routing loops by enforcing informational directional asymmetry. If Router B learned its route to Network 10.0.0.0 via Router A on interface Gi0/0, Router B suppresses any advertisement of 10.0.0.0 back out of Gi0/0 toward Router A.',
    rfcReferences: ['RFC 1058 Section 3.4.3.1', 'RFC 2453'],
    relatedTerms: ['Poison Reverse', 'Count-to-Infinity', 'Triggered Updates']
  },
  {
    id: 'poison-reverse',
    term: 'Poison Reverse',
    category: 'Loop Prevention',
    shortDefinition: 'An explicit variant of Split Horizon where instead of suppressing the route, the router advertises it back to the neighbor with metric 16 (Infinity).',
    inDepthExplanation: 'By actively confirming that the reverse path is unreachable (cost 16), Poison Reverse prevents race conditions and breaks symmetric false assumptions immediately, preventing mutual dependency loops between adjacent nodes.',
    rfcReferences: ['RFC 1058 Section 3.4.3.2'],
    relatedTerms: ['Split Horizon', 'Count-to-Infinity', 'Metric Infinity']
  },
  {
    id: 'metric-infinity',
    term: 'Metric 16 (Infinity)',
    category: 'Metrics & Timers',
    shortDefinition: 'The upper bound of the RIP metric spectrum representing an unreachable network destination.',
    inDepthExplanation: 'RIP restricts allowable path lengths to 15 hops. A value of 16 signifies mathematical infinity, capping the maximum diameter of any single RIP routing domain to 15 hops. This finite bound is critical to ensuring that count-to-infinity loops eventually terminate.',
    rfcReferences: ['RFC 1058 Section 3.4.1'],
    relatedTerms: ['Hop Count', 'Count-to-Infinity', 'Invalid Timer']
  },
  {
    id: 'periodic-timer',
    term: 'Periodic Update Timer (30s)',
    category: 'Metrics & Timers',
    shortDefinition: 'The 30-second heart-beat interval at which RIP routers broadcast or multicast their complete routing table.',
    inDepthExplanation: 'RFC 2453 mandates a random jitter of +/- 15% (25.5s to 34.5s) to prevent the "Sally Floyd synchronization phenomenon," wherein network-wide timers accidentally align and flood the broadcast medium with simultaneous routing bursts.',
    rfcReferences: ['RFC 2453 Section 3.8'],
    relatedTerms: ['Invalid Timer', 'Flush Timer', 'Holddown Timer']
  },
  {
    id: 'invalid-timer',
    term: 'Route Timeout / Invalid Timer (180s)',
    category: 'Metrics & Timers',
    shortDefinition: 'The 180-second duration a router waits without receiving an update for an active route before declaring it invalid (metric 16).',
    inDepthExplanation: 'Corresponds to exactly 6 missed update intervals (6 x 30s = 180s). When the invalid timer expires, the router transitions the route to metric 16 (poisoned) and transmits a triggered update to inform neighbors.',
    rfcReferences: ['RFC 2453 Section 3.8'],
    relatedTerms: ['Periodic Timer', 'Flush Timer', 'Poison Reverse']
  },
  {
    id: 'flush-timer',
    term: 'Flush / Garbage-Collection Timer (240s)',
    category: 'Metrics & Timers',
    shortDefinition: 'The timer that monitors when an invalid route should be completely purged from the routing information base (RIB).',
    inDepthExplanation: 'Set to 240 seconds (or 60 seconds after the invalid timer fires). It allows the poisoned route (metric 16) to be repeatedly advertised to neighbors so the entire autonomous domain learns of the failure before the record is expunged.',
    rfcReferences: ['RFC 2453 Section 3.8'],
    relatedTerms: ['Invalid Timer', 'Count-to-Infinity']
  },
  {
    id: 'ripv2-multicast',
    term: 'RIPv2 Multicast Group (224.0.0.9)',
    category: 'RIP Protocol',
    shortDefinition: 'The dedicated Class D IPv4 multicast address utilized by RIPv2 for routing table updates.',
    inDepthExplanation: 'While RIPv1 broadcasted to 255.255.255.255 (forcing non-routing end hosts on the LAN to interrupt their CPU and parse UDP frames), RIPv2 sends updates to 224.0.0.9 (MAC 01:00:5E:00:00:09). Non-RIP hosts filter this frame at the Network Interface Card (NIC) layer with zero CPU penalty.',
    rfcReferences: ['RFC 2453 Section 3.4', 'RFC 1112'],
    relatedTerms: ['RIPv1', 'RIPng', 'UDP Port 520']
  },
  {
    id: 'administrative-distance',
    term: 'Administrative Distance',
    acronym: 'AD',
    category: 'Comparative Protocols',
    shortDefinition: 'A vendor-specific believability metric used by router route processors when multiple protocols learn of the identical prefix.',
    inDepthExplanation: 'Cisco IOS default AD values: Connected (0), Static (1), eBGP (20), EIGRP Internal (90), OSPF (110), IS-IS (115), RIP (120), External EIGRP (170), iBGP (200). Lower values indicate higher administrative trust.',
    rfcReferences: ['RFC 1812'],
    relatedTerms: ['OSPF', 'EIGRP', 'BGP']
  }
];

export const RIPV2_PACKET_FIELDS: PacketField[] = [
  {
    byteRange: '0 - 1',
    name: 'Command',
    hexValue: '0x02',
    decimalValue: 2,
    category: 'header',
    description: 'Specifies the intent of the message: 1 for Request, 2 for Response.',
    significance: 'Responses contain routing table updates transmitted periodically every 30 seconds or immediately when triggered by network topology shifts.'
  },
  {
    byteRange: '1 - 2',
    name: 'Version',
    hexValue: '0x02',
    decimalValue: 2,
    category: 'header',
    description: 'Protocol version number. 1 for RFC 1058, 2 for RFC 2453.',
    significance: 'Version 2 enables classless CIDR subnet masks, authentication vectors, multicast transmission, and route tags.'
  },
  {
    byteRange: '2 - 4',
    name: 'Routing Domain',
    hexValue: '0x00 0x00',
    decimalValue: 0,
    category: 'header',
    description: 'Identifier for the routing domain or AS instance (historically zero).',
    significance: 'Permits multiple autonomous RIP routing domains to coexist on the exact same physical broadcast domain without cross-pollinating tables.'
  },
  {
    byteRange: '4 - 6',
    name: 'Address Family Identifier (AFI)',
    hexValue: '0x00 0x02',
    decimalValue: 2,
    category: 'route-entry',
    description: 'Specifies protocol family. 2 represents standard IPv4. (0xFFFF indicates an authentication block).',
    significance: 'If the AFI in the first route entry is set to 0xFFFF, the remainder of the 20-byte record is repurposed as an Authentication Header: Type 2 for simple cleartext passwords (RFC 2453) or Keyed MD5 authentication (RFC 2082).'
  },
  {
    byteRange: '6 - 8',
    name: 'Route Tag',
    hexValue: '0x00 0x00',
    decimalValue: 0,
    category: 'route-entry',
    description: 'Attribute used to distinguish internal RIP routes from routes redistributed from external protocols (e.g. BGP/OSPF).',
    significance: 'Preserves the external Autonomous System Number (ASN) across redistributions, enabling sophisticated boundary filtering policies.'
  },
  {
    byteRange: '8 - 12',
    name: 'IP Address',
    hexValue: '0xC0 0xA8 0x01 0x00',
    decimalValue: '192.168.1.0',
    category: 'route-entry',
    description: 'The destination network or host IPv4 address prefix.',
    significance: 'The core network destination target being advertised in this distance-vector entry.'
  },
  {
    byteRange: '12 - 16',
    name: 'Subnet Mask',
    hexValue: '0xFF 0xFF 0xFF 0x00',
    decimalValue: '255.255.255.0 (/24)',
    category: 'route-entry',
    description: 'The subnet mask applied to the IP address. Absent in RIPv1.',
    significance: 'Enables Variable Length Subnet Masking (VLSM) and Classless Inter-Domain Routing (CIDR), breaking free of rigid Class A/B/C boundaries.'
  },
  {
    byteRange: '16 - 20',
    name: 'Next Hop Address',
    hexValue: '0x00 0x00 0x00 0x00',
    decimalValue: '0.0.0.0 (Direct Source)',
    category: 'route-entry',
    description: 'Specifies the immediate forwarding IP address. 0.0.0.0 defaults to the sender of the RIP packet.',
    significance: 'Eliminates suboptimal two-hop forwarding when multiple routers share a multi-access LAN (e.g., Ethernet), pointing packets directly to the optimal gateway.'
  },
  {
    byteRange: '20 - 24',
    name: 'Metric (Hop Count)',
    hexValue: '0x00 0x00 0x00 0x01',
    decimalValue: 1,
    category: 'route-entry',
    description: 'The path distance expressed in router hops. Permitted range: 1 to 15.',
    significance: '16 is mathematically defined as Infinity. Any destination advertised with metric 16 is immediately marked unreachable.'
  }
];

export const PROTOCOL_COMPARISONS: ProtocolComparisonItem[] = [
  {
    feature: 'Algorithm',
    ripv1: 'Bellman-Ford (DV)',
    ripv2: 'Bellman-Ford (DV)',
    ripng: 'Bellman-Ford (DV)',
    ospfv2: 'Dijkstra SPF (Link-State)',
    eigrp: 'DUAL (Advanced DV)',
    bgpv4: 'Path-Vector',
    significance: 'Determines mathematical model and convergence computational load.'
  },
  {
    feature: 'Metric Calculation',
    ripv1: 'Hop Count (1-15)',
    ripv2: 'Hop Count (1-15)',
    ripng: 'Hop Count (1-15)',
    ospfv2: 'Cost = 10^8 / Bandwidth',
    eigrp: 'Composite (Delay + Bandwidth)',
    bgpv4: 'AS-Path, MED, Local Pref, Weight',
    significance: 'Hop count ignores link speed; 1 hop over 56kbps wins over 2 hops over 100Gbps optical fiber.'
  },
  {
    feature: 'Max Network Diameter',
    ripv1: '15 Hops',
    ripv2: '15 Hops',
    ripng: '15 Hops',
    ospfv2: 'Virtually Unlimited (Hierarchical Areas)',
    eigrp: '224 Hops (Default 100)',
    bgpv4: 'Global Internet Scale',
    significance: 'Strictly limits RIP to small enterprise, campus, and laboratory deployments.'
  },
  {
    feature: 'VLSM / CIDR Support',
    ripv1: 'No (Classful only)',
    ripv2: 'Yes (Full CIDR)',
    ripng: 'Yes (IPv6 Prefixes)',
    ospfv2: 'Yes (Full CIDR)',
    eigrp: 'Yes (Full CIDR)',
    bgpv4: 'Yes (Full CIDR)',
    significance: 'Classful routing cannot distribute modern subnet masks, causing routing blackholes.'
  },
  {
    feature: 'Transport & Port',
    ripv1: 'UDP Port 520',
    ripv2: 'UDP Port 520',
    ripng: 'UDP Port 521',
    ospfv2: 'Raw IP Protocol 89',
    eigrp: 'Raw IP Protocol 88 (RTP)',
    bgpv4: 'TCP Port 179',
    significance: 'RIP runs as an application-layer daemon over UDP, relying on UDP checksums.'
  },
  {
    feature: 'Update Destination',
    ripv1: '255.255.255.255 (Broadcast)',
    ripv2: '224.0.0.9 (Multicast)',
    ripng: 'FF02::9 (Multicast)',
    ospfv2: '224.0.0.5 & 224.0.0.6',
    eigrp: '224.0.0.10',
    bgpv4: 'Unicast TCP Peer',
    significance: 'Multicast prevents interrupting host computers not participating in dynamic routing.'
  },
  {
    feature: 'Convergence Speed',
    ripv1: 'Slow (30s - 240s)',
    ripv2: 'Slow to Moderate (Timers)',
    ripng: 'Slow to Moderate (Timers)',
    ospfv2: 'Fast (Sub-second with LSA floods)',
    eigrp: 'Near Instant (Feasible Successor)',
    bgpv4: 'Deliberate / Slow (Stability prioritized)',
    significance: 'RIP convergence is paced by 30-second timers, causing temporary blackholes during topology shifts.'
  },
  {
    feature: 'Administrative Distance',
    ripv1: '120',
    ripv2: '120',
    ripng: '120',
    ospfv2: '110',
    eigrp: '90 (Internal) / 170 (Ext)',
    bgpv4: '20 (eBGP) / 200 (iBGP)',
    significance: 'Standard Cisco default; lower AD takes precedence in the routing table.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why does the Routing Information Protocol (RIP) set the maximum hop-count limit to 15, defining 16 as Infinity?',
    context: 'Network Architecture & Algorithmic Bounds',
    difficulty: 'Core',
    options: [
      { id: 'a', text: 'To limit memory allocation for the routing table to exactly 16 kilobytes.', isCorrect: false },
      { id: 'b', text: 'To bound the worst-case convergence duration of the Count-to-Infinity problem.', isCorrect: true },
      { id: 'c', text: 'Because IPv4 IP TTL header fields are restricted to 4 bits in RIP networks.', isCorrect: false },
      { id: 'd', text: 'To ensure that RIP packets never exceed standard 576-byte UDP MTU boundaries.', isCorrect: false }
    ],
    explanation: 'In distance-vector networks, topological disconnects trigger the Count-to-Infinity pathology where routers bounce incrementing metrics. Without a small finite ceiling, this looping would continue indefinitely. By defining 16 as Infinity, convergence failure terminates within at most 16 iterations (RFC 1058).',
    rfcAnchor: 'RFC 1058 §3.4.1'
  },
  {
    id: 2,
    question: 'Consider three routers: R1, R2, and R3 in a linear line (R1 - R2 - R3 - Network X). Link R3-X fails. If Split Horizon is disabled, what occurs immediately between R2 and R3?',
    context: 'Pathological Failure Modes',
    difficulty: 'Advanced',
    options: [
      { id: 'a', text: 'R2 advertises its old metric 2 to R3; R3 updates its table pointing to R2 with metric 3.', isCorrect: true },
      { id: 'b', text: 'R3 sends a link-state advertisement flushing Network X from all OSPF databases.', isCorrect: false },
      { id: 'c', text: 'R1 immediately takes over routing and directly provisions an encrypted GRE tunnel.', isCorrect: false },
      { id: 'd', text: 'R2 detects a collision on UDP port 520 and flushes its entire RIB within 300ms.', isCorrect: false }
    ],
    explanation: 'Without Split Horizon, R3 (having lost direct connection to X) accepts R2’s periodic advertisement claiming a path to X at cost 2. R3 believes R2 has an independent route and calculates cost = 2 + 1 = 3 via R2. A two-node routing loop is formed, beginning the count to 16.',
    rfcAnchor: 'RFC 1058 §2.2'
  },
  {
    id: 3,
    question: 'What is the exact distinction between Split Horizon and Split Horizon with Poison Reverse?',
    context: 'Loop Prevention Mechanics',
    difficulty: 'Core',
    options: [
      { id: 'a', text: 'Split Horizon uses UDP; Poison Reverse operates over TCP port 179.', isCorrect: false },
      { id: 'b', text: 'Split Horizon suppresses the route advertisement; Poison Reverse explicitly advertises it with metric 16.', isCorrect: true },
      { id: 'c', text: 'Split Horizon resets the holddown timer; Poison Reverse purges the route from RAM immediately.', isCorrect: false },
      { id: 'd', text: 'Split Horizon is only available in RIPng; Poison Reverse is exclusively RIPv1.', isCorrect: false }
    ],
    explanation: 'Standard Split Horizon simply omits (withholds) the prefix when advertising back out the interface it was learned from ("silence"). Poison Reverse explicitly advertises the prefix back to the neighbor with metric 16 (Infinity), actively confirming that the reverse direction is unreachable and preventing race conditions.',
    rfcAnchor: 'RFC 1058 §3.4.3.2'
  },
  {
    id: 4,
    question: 'Why does RFC 2453 mandate adding a random jitter (+/- 15%) to RIP’s 30-second periodic update timer?',
    context: 'Temporal Synchronization & Protocol Stability',
    difficulty: 'Advanced',
    options: [
      { id: 'a', text: 'To encrypt UDP packet contents against passive wiretapping snooping.', isCorrect: false },
      { id: 'b', text: 'To prevent timer synchronization storms that lead to catastrophic periodic channel congestion.', isCorrect: true },
      { id: 'c', text: 'To compensate for clock skew between hardware quartz oscillators in legacy routers.', isCorrect: false },
      { id: 'd', text: 'To allow RIP to dynamically calibrate the Administrative Distance between 100 and 120.', isCorrect: false }
    ],
    explanation: 'Discovered by Sally Floyd and Van Jacobson (1994). Without randomized jitter, deterministic periodic timers across interconnected routers naturally synchronize over time. This leads to massive simultaneous broadcast bursts ("synchronization storms") that overload switch buffers and cause high packet loss.',
    rfcAnchor: 'RFC 2453 §3.8'
  },
  {
    id: 5,
    question: 'A router running RIPv2 fails to receive updates for an active prefix. What is the sequence and duration of the timer states before the prefix is purged from the routing table?',
    context: 'Timer State Machines',
    difficulty: 'Architect',
    options: [
      { id: 'a', text: '30s update -> 60s holddown -> 90s flush.', isCorrect: false },
      { id: 'b', text: '180s Invalid Timer (marked metric 16) -> 240s Flush Timer total (purged from memory).', isCorrect: true },
      { id: 'c', text: '10s Hello -> 40s Dead Interval -> Immediate removal.', isCorrect: false },
      { id: 'd', text: '15s Polling -> 30s Wait -> 120s Garbage collection.', isCorrect: false }
    ],
    explanation: 'In RFC 2453 (§3.8), if no update arrives within 180 seconds (Route Timeout / Invalid Timer, equal to 6 missed 30s updates), the metric is clamped to 16. The route remains in the table for an additional 120 seconds under the Garbage Collection timer before removal. Under Cisco IOS defaults (timers basic 30 180 180 240), the flush timer is set to 240s total (evicting the route 60s after invalidation), while an implementation-dependent 180s holddown timer suppresses equal or inferior metrics.',
    rfcAnchor: 'RFC 2453 §3.8 / Cisco IOS'
  },
  {
    id: 6,
    question: 'Which fundamental limitation prevents RIPv1 from operating in modern networks utilizing Variable Length Subnet Masking (VLSM)?',
    context: 'Protocol Evolution (v1 vs v2)',
    difficulty: 'Core',
    options: [
      { id: 'a', text: 'RIPv1 packets do not contain a subnet mask field in their Route Entries.', isCorrect: true },
      { id: 'b', text: 'RIPv1 uses 32-bit floating-point metrics instead of integer hop counts.', isCorrect: false },
      { id: 'c', text: 'RIPv1 operates over TCP port 520 which strips CIDR headers.', isCorrect: false },
      { id: 'd', text: 'RIPv1 requires all subnets to be advertised under the 10.0.0.0 Class A space.', isCorrect: false }
    ],
    explanation: 'RFC 1058 (RIPv1) defines a 20-byte route entry containing only AFI, IP Address, and Metric. It completely lacks a Subnet Mask field. Routers receiving RIPv1 updates must deduce the mask based on natural Classful boundaries (Class A /8, Class B /16, Class C /24), making VLSM and CIDR impossible.',
    rfcAnchor: 'RFC 1058 §3.3'
  },
  {
    id: 7,
    question: 'What is the purpose of setting the Next-Hop field to a non-zero IP address in a RIPv2 route entry?',
    context: 'Packet Dissection & Routing Optimization',
    difficulty: 'Architect',
    options: [
      { id: 'a', text: 'It designates the BGP autonomous system path origin.', isCorrect: false },
      { id: 'b', text: 'It prevents two-hop suboptimal routing on multi-access broadcast networks like Ethernet.', isCorrect: true },
      { id: 'c', text: 'It triggers immediate DiffServ traffic priority reclassification.', isCorrect: false },
      { id: 'd', text: 'It enforces an encrypted IPsec tunnel endpoint between the two routers.', isCorrect: false }
    ],
    explanation: 'When routers share a common multi-access subnet (such as an Ethernet LAN), Router A can advertise a prefix learned from Router C, specifying Router C’s IP address as the Next Hop. This instructs Router B to send packets directly to Router C instead of taking an extra hop through Router A.',
    rfcAnchor: 'RFC 2453 §3.6'
  },
  {
    id: 8,
    question: 'How does RIPng (RFC 2080) handle IPv6 next-hop addressing given that IPv6 addresses are 128 bits (16 bytes)?',
    context: 'RIPng & IPv6 Architecture',
    difficulty: 'Architect',
    options: [
      { id: 'a', text: 'It truncates IPv6 addresses to 32 bits by discarding the interface ID.', isCorrect: false },
      { id: 'b', text: 'It utilizes a special Route Table Entry with metric 0xFF to define the Next Hop for subsequent entries.', isCorrect: true },
      { id: 'c', text: 'It forces all routers to communicate exclusively over IPv4 tunnels.', isCorrect: false },
      { id: 'd', text: 'It embeds next hops into DNS PTR records rather than packet headers.', isCorrect: false }
    ],
    explanation: 'In RIPng (RFC 2080), individual route entries cannot fit both a 16-byte destination and a 16-byte next hop within the standard 20-byte record. RIPng solves this by creating a dedicated Next Hop RTE identified by metric 0xFF (255). All subsequent normal route entries inherit this next hop until another 0xFF entry appears.',
    rfcAnchor: 'RFC 2080 §2.1.1'
  },
  {
    id: 9,
    question: 'In the Bellman-Ford equation D_x(y) = min_v { c(x, v) + D_v(y) }, what does term c(x, v) represent in a RIP network?',
    context: 'Mathematical Foundations',
    difficulty: 'Core',
    options: [
      { id: 'a', text: 'The cost of the direct link connecting local router x to immediate neighbor v (always 1 in standard RIP).', isCorrect: true },
      { id: 'b', text: 'The total cumulative bandwidth capacity in megabits per second.', isCorrect: false },
      { id: 'c', text: 'The propagation delay in milliseconds measured by ICMP timestamp pings.', isCorrect: false },
      { id: 'd', text: 'The Administrative Distance assigned by the local network administrator.', isCorrect: false }
    ],
    explanation: 'c(x, v) is the cost of the physical edge connecting node x to adjacent neighbor v. In pure, unconfigured RIP networks, every operational link has an identical cost of 1 hop regardless of its physical media, bandwidth, or latency.',
    rfcAnchor: 'Bellman 1958'
  },
  {
    id: 10,
    question: 'Why does RIPv2 utilize multicast IP 224.0.0.9 instead of 255.255.255.255 broadcast?',
    context: 'Protocol Efficiency & Host Burden',
    difficulty: 'Core',
    options: [
      { id: 'a', text: 'To allow packets to pass through firewalls without inspecting UDP payloads.', isCorrect: false },
      { id: 'b', text: 'To prevent non-router end systems on the LAN from having to process and discard UDP 520 packets at the OS layer.', isCorrect: true },
      { id: 'c', text: 'Because modern Layer 3 switches drop all 255.255.255.255 packets by default.', isCorrect: false },
      { id: 'd', text: 'To increase the MTU payload size from 512 bytes to 1500 bytes.', isCorrect: false }
    ],
    explanation: 'Broadcast packets (255.255.255.255) must be passed up the network stack by every device on the physical segment, causing CPU interrupts on workstations and servers. Multicast 224.0.0.9 maps to MAC 01:00:5E:00:00:09; network interface cards of non-routing machines filter the frame in hardware silicon with zero CPU overhead.',
    rfcAnchor: 'RFC 2453 §3.4'
  }
];

export const RFC_BIBLIOGRAPHY = [
  {
    code: 'RFC 1058',
    title: 'Routing Information Protocol',
    author: 'C. Hedrick',
    year: '1988',
    status: 'Historic / Foundation',
    url: 'https://datatracker.ietf.org/doc/html/rfc1058',
    summary: 'The original formal specification of RIPv1, establishing Bellman-Ford distance-vector routing over UDP port 520, the 15-hop boundary, and count-to-infinity loop handling.'
  },
  {
    code: 'RFC 2453',
    title: 'RIP Version 2',
    author: 'G. Malkin',
    year: '1998',
    status: 'Internet Standard (STD 56)',
    url: 'https://datatracker.ietf.org/doc/html/rfc2453',
    summary: 'The modern standard adding CIDR/VLSM subnet mask support, multicast destination 224.0.0.9, Type 2 cleartext authentication, route tagging, and next-hop overrides.'
  },
  {
    code: 'RFC 2082',
    title: 'RIP-2 MD5 Authentication',
    author: 'F. Baker, R. Atkinson',
    year: '1997',
    status: 'Proposed Standard',
    url: 'https://datatracker.ietf.org/doc/html/rfc2082',
    summary: 'Specifies keyed MD5 cryptographic authentication for RIPv2, replacing cleartext passwords with digital signatures to prevent unauthorized route injection.'
  },
  {
    code: 'RFC 2080',
    title: 'RIPng for IPv6',
    author: 'G. Malkin, R. Minnear',
    year: '1997',
    status: 'Proposed Standard',
    url: 'https://datatracker.ietf.org/doc/html/rfc2080',
    summary: 'Adapts RIP for IPv6 networks, shifting to UDP port 521, link-local multicast FF02::9, and specialized Next-Hop Route Table Entries.'
  },
  {
    code: 'RFC 1723',
    title: 'RIP Version 2 Carrying Additional Information',
    author: 'G. Malkin',
    year: '1994',
    status: 'Obsoleted by RFC 2453',
    url: 'https://datatracker.ietf.org/doc/html/rfc1723',
    summary: 'Interim standard defining backward compatibility between RIPv1 and RIPv2.'
  },
  {
    code: 'Academic Paper',
    title: 'On a Routing Problem',
    author: 'Richard Bellman',
    year: '1958',
    status: 'Quarterly of Applied Mathematics, 16(1):87-90',
    url: 'https://doi.org/10.1090/qam/102435',
    summary: 'Foundational paper introducing dynamic programming principles for solving single-source shortest path problems in directed graphs.'
  },
  {
    code: 'Academic Paper',
    title: 'Network Flow Theory',
    author: 'Lester R. Ford Jr.',
    year: '1956',
    status: 'Paper P-923, The RAND Corporation, Santa Monica, CA',
    url: 'https://www.rand.org/pubs/papers/P923.html',
    summary: 'The seminal paper introducing the shortest-path relaxation procedure that forms the algorithmic foundation of the Bellman-Ford algorithm in distance-vector routing.'
  },
  {
    code: 'ACM SIGCOMM Paper',
    title: 'The Synchronization of Periodic Routing Messages',
    author: 'Sally Floyd & Van Jacobson',
    year: '1994',
    status: 'IEEE/ACM Transactions on Networking, 2(2):122-136',
    url: 'https://doi.org/10.1109/90.298431',
    summary: 'Rigorous empirical analysis proving why unjittered periodic routing timers catastrophically synchronize, mandating +/-15% randomized jitter in RFC 2453.'
  }
];
