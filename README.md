# NETWORK EXPLAINED — The Routing Information Protocol (RIP)
### *An Interactive Technical Monograph on Distributed Distance-Vector Dynamics*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Standards Track](https://img.shields.io/badge/IETF-RFC%202453%20%7C%20STD%2056-emerald.svg)](https://datatracker.ietf.org/doc/html/rfc2453)
[![Standards Track](https://img.shields.io/badge/IETF-RFC%202082-blue.svg)](https://datatracker.ietf.org/doc/html/rfc2082)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-sky.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-cyan.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)

---

## Overview

**NETWORK EXPLAINED** is a digital publication and interactive technical monograph dedicated to the **Routing Information Protocol (RIP)**, distance-vector routing principles, and distributed Bellman-Ford convergence mechanics.

Designed with modern digital editorial standards inspired by *Stripe Press*, *Bartosz Ciechanowski*, and *Quanta Magazine*, this work couples mathematical rigor and primary IETF RFC standards with interactive visualizations, frame-by-frame packet inspection, and fluid hardware-accelerated user interfaces.

---

## Monograph Structure & Covered Content

The publication contains 15 comprehensive technical sections:

1. **01 / Introduction:** Forwarding challenges across heterogeneous computer networks and the necessity of autonomous dynamic routing.
2. **02 / Understanding Network Routing:** Layer-3 forwarding anatomy, routing information base (RIB) lookup, longest prefix match, and static vs. dynamic tradeoffs.
3. **03 / What is RIP?:** Historic origins from the Xerox PARC GWINFO protocol, development into IETF RFC 1058, and its classification as an Interior Gateway Protocol (IGP).
4. **04 / Distance-Vector Routing:** The distributed "routing by rumor" paradigm, vector sharing mechanics, and lack of global topological maps.
5. **05 / The Bellman-Ford Algorithm:** Mathematical formulation of $D_x(y) = \min_v \{ c(x,v) + D_v(y) \}$ based on Lester R. Ford Jr. (1956, Paper P-923) and Richard Bellman (1958), complete with an interactive formula breakdown.
6. **06 / How RIP Works:** Protocol state machines, startup initialization, periodic solicitation (UDP port 520), and table evolution.
7. **07 / Understanding Hop Count:** The metric model, the 1–15 hop operational boundary, and why 16 is mathematically defined as Infinity ($\infty$).
8. **08 / RIP Versions & Packet Dissection:** 
   - Comparative architectural triad: **RIPv1 (RFC 1058)**, **RIPv2 (RFC 2453 / STD 56)**, and **RIPng (RFC 2080)**.
   - Interactive 24-byte UDP packet dissector with Visual Field Breakdown, Raw Hex Stream, and Wireshark Packet Tree views.
   - Cryptographic authentication: Type 2 cleartext authentication (RFC 2453) vs. Keyed MD5 authentication (RFC 2082).
9. **09 / RIP Timers & State Machines:**
   - 30s Periodic Update Timer with ±15% randomized jitter (Floyd & Jacobson 1994).
   - 180s Route Timeout / Invalid Timer (marking metric 16).
   - Flush / Garbage Collection Timer: RFC 2453 120s post-invalidation grace period vs. Cisco IOS 240s total timer.
   - Holddown Timer (180s in Cisco IOS): explained as an implementation-dependent loop dampener rather than a mandatory RFC timer.
   - Triggered Updates: rate-limited by a 1–5 second randomized suppression window (RFC 2453 §3.8.1).
10. **10 / Routing Loops & Prevention:** The Count-to-Infinity pathology examined step-by-step alongside Split Horizon, Poison Reverse, and rate-limited Triggered Updates.
11. **11 / Practical Cisco Configuration:** Production-ready syntax for **Cisco IOS-XE**, **Juniper Junos**, and **Linux FRRouting (`ripd`)**, including detailed analysis of `passive-interface` behavior.
12. **12 / Comparative Analysis:** Multi-dimensional protocol comparison evaluating RIP against OSPFv2 (Link-State), EIGRP (Advanced Distance-Vector), and BGPv4 (Path-Vector).
13. **13 / Advantages and Limitations:** Objective engineering evaluation of computational overhead vs. scalability frontiers.
14. **14 / Conclusion:** Architectural legacy and relevance in modern network engineering education.
15. **15 / Standards & References:** Formally annotated bibliography connecting every claim to genuine IETF RFCs and seminal literature.

---

## Technology Stack

- **Framework:** React 18 + TypeScript + Vite 5
- **Animation & Physics:** GSAP (GreenSock) + ScrollTrigger
- **Smooth Inertial Scrolling:** Lenis (integrated with GSAP ticker cleanup)
- **Background Graphics:** Custom Canvas-based Electric Rays shader & Three.js 3D network mesh
- **Mathematical Typography:** KaTeX (bundled locally for offline rendering)
- **Icons:** Lucide React
- **Styling:** Tailwind CSS + CSS Glassmorphism
- **Routing:** Dual HTML5 History & Hash Router for universal GitHub Pages hosting

---

## Local Development & Build

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Installation
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your web browser.

### 3. Build Production Bundle
```bash
npm run build
```
Generates an optimized, type-checked static production bundle in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Deployment to GitHub Pages

The project is preconfigured for static deployment on GitHub Pages with automatic `404.html` fallback generation and relative asset paths (`base: './'`).

### Automated Deployment (GitHub Actions)
Pushing to the `main` branch automatically triggers the workflow defined in `.github/workflows/deploy.yml`.

### Manual CLI Deployment
```bash
npm run deploy
```

---

## Academic Citation

```bibtex
@misc{padole2026rip,
  title={The Routing Information Protocol: Distance-Vector Dynamics and Convergence Mechanics},
  author={Salaj Padole},
  year={2026},
  howpublished={Interactive Technical Monograph, Network Explained},
  note={Computer Networks and Web Technology (CNAWT) Research}
}
```

---

## License

Open Educational Resource (OER) published under the [MIT License](LICENSE).  
Authored by **Salaj Padole** for the *Computer Networks and Web Technology (CNAWT)* Academic Track.
