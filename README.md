# NETWORK EXPLAINED — The Routing Information Protocol (RIP)
### *An Award-Calibre Interactive Technical Monograph on Distributed Distance-Vector Dynamics*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Standards Track](https://img.shields.io/badge/IETF-RFC%202453%20%7C%20STD%2056-emerald.svg)](https://datatracker.ietf.org/doc/html/rfc2453)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-sky.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-cyan.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)

---

## Overview

**NETWORK EXPLAINED** is a digital publication and interactive monograph on the **Routing Information Protocol (RIP)**, distance-vector routing, and distributed Bellman-Ford convergence. 

Designed under the visual ethos of modern digital editorial essays (such as *Stripe Press*, *Bartosz Ciechanowski*, and *Quanta Magazine*), this publication breaks away from generic documentation and SaaS templates. It couples academic rigor with reactive vector diagrams, live network simulation, frame-by-frame packet dissection, and acoustic synthesis.

---

## Editorial Chapters & Interactive Sandboxes

1. **Chapter 00: Prologue & The Hop-Count Blind Spot**
   - The fundamental paradox of pure hop-count metrics: Why 1 hop over a 56kbps satellite link beats 2 hops over a 100Gbps optic fiber in RIP.
2. **Chapter 01: The Mathematical Engine (Bellman-Ford Formulation)**
   - Dynamic programming foundations (Bellman 1958; Ford & Fulkerson 1956).
   - Interactive formula inspector breaking down $D_x(y) = \min_v \{ c(x,v) + D_v(y) \}$ with physical router implications.
3. **Chapter 02: RIP Protocol Architecture & Frame Anatomy**
   - Encapsulation over **UDP Port 520** (RIPng over UDP 521).
   - Multicast destination **224.0.0.9** / MAC `01:00:5E:00:00:09`.
   - **Interactive Packet Dissector**: Switch between Visual Field Diagram, Raw Hex Dump, and Wireshark Packet-Tree representations.
4. **Chapter 03: The Hop Metric & The 15-Hop Frontier**
   - Why 16 is defined as Infinity ($\infty$).
   - Algorithmic bounds preventing perpetual looping in finite convergence windows.
5. **Chapter 04: Temporal Mechanics & The 4 Core Timers**
   - Scrubbable 0–260s lifecycle timeline: Periodic Update (30s ±15% Floyd-Jacobson jitter), Route Timeout / Invalid (180s), Flush / Garbage Collection (240s), Holddown (180s).
   - Mathematical **Convergence Latency Calculator** modeling network diameter, loss rates, and safeguard regimes.
6. **Chapter 05: Pathological Failure & Loop Prevention**
   - Step-by-step case study of the **Count-to-Infinity Problem**.
   - Interactive toggle testing Split Horizon, Poison Reverse, and Triggered (Flash) Updates.
7. **Chapter 06: Signature Experience — Distributed RIP Network Simulator**
   - Live interactive SVG/Canvas network graph with topology presets (Linear Chain, Redundant Triangle, Diamond Backbone).
   - Instant fault injection: sever links with a click to observe immediate convergence or count-to-infinity inflation.
   - Hardware **Routing Information Base (RIB) Inspector** modal displaying real-time metrics, interfaces, and timers.
   - Layer-3 IP Packet Forwarding Verifier: inject packets and watch them navigate multi-hop paths or get dropped with TTL alerts.
8. **Chapter 07: Production Configuration & Platform Implementations**
   - Production syntax artifacts for **Cisco IOS-XE**, **Juniper Junos**, and **Linux FRRouting (`ripd`)**.
   - Interactive command-by-command annotations and copy features.
   - Comparative triad: **RIPv1 (RFC 1058)** vs **RIPv2 (RFC 2453)** vs **RIPng (RFC 2080)**.
9. **Chapter 08: The Protocol Crucible (RIP vs OSPF vs EIGRP vs BGP)**
   - Multi-dimensional comparative matrix (Algorithm, Metric, Administrative Distance, Convergence, Overhead).
   - Interactive 3-question **Architectural Selection Engine**.
10. **Chapter 09: Academic Rigor & Mastery Assessment**
    - 10-question technical certification quiz covering packet structures, timer state machines, and RFC edge cases with celebratory particle physics.
11. **Chapter 10: Lexicon of Distributed Routing**
    - Searchable, categorized dictionary of networking terminology with standards cross-references.
12. **Chapter 11: Colophon & Critical Apparatus**
    - Formal academic citation generator (BibTeX & IEEE).
    - Annotated RFC and primary literature bibliography.

---

## Technology Stack

- **Framework:** React 18 + TypeScript + Vite 5
- **Animation & Physics:** GSAP (GreenSock) + ScrollTrigger
- **Smooth Inertial Scrolling:** Studio Freight Lenis (coupled to GSAP ticker)
- **Acoustic Synthesis:** Web Audio API (Zero external MP3/WAV dependencies; pure frequency & envelope synthesis)
- **Mathematical Typography:** KaTeX (bundled locally for offline rendering)
- **Iconography:** Lucide React
- **Styling:** Custom Tailwind CSS + CSS Glassmorphism + Editorial Tokens
- **CI/CD Deployment:** GitHub Pages + GitHub Actions (`.github/workflows/deploy.yml`)

---

## Local Development & Build

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 1. Installation
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Build Production Bundle
```bash
npm run build
```
Generates an optimized, tree-shaken static production bundle in `dist/`.

---

## GitHub Pages Deployment

The repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and publishes the publication upon pushing to `main`.

### Alternative CLI Deployment via `gh-pages`
```bash
npm run deploy
```

---

## Academic Citation

```bibtex
@article{padole2026rip,
  title={The Routing Information Protocol & Distance-Vector Convergence Dynamics},
  author={Padole, Salaj},
  journal={Network Explained: Interactive Technical Monographs},
  volume={1},
  number={RFC-2453},
  pages={1--42},
  year={2026},
  publisher={Network Explained Foundation}
}
```

---

## License
Open Educational Resource (OER) published under the [MIT License](LICENSE).
Crafted by **Salaj Padole** for the *Computer Networks & Web Technology (CNAWT)* Tutorial Series.
