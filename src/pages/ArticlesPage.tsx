import React, { useState } from 'react';
import { useRouter } from '../router';
import { sound } from '../audio/soundEngine';
import { BookOpen, Search, ArrowRight, Clock, Calendar, Bookmark, Filter, Compass } from 'lucide-react';

interface ArticleEntry {
  id: string;
  slug: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  abstract: string;
  readTime: string;
  date: string;
  status: 'published' | 'in-review' | 'research';
  tags: string[];
}

const ARTICLES: ArticleEntry[] = [
  {
    id: 'art-001',
    slug: '/articles/rip-routing-protocol',
    number: '001',
    category: 'Routing Protocols',
    title: 'RIP — The Routing Information Protocol',
    subtitle: 'Understanding how routers exchange information, calculate routes and make decisions across interconnected networks.',
    abstract: 'An exhaustive investigation into distributed Bellman-Ford calculations, the 15-hop diameter boundary, the Count-to-Infinity pathology, and real-world Cisco IOS deployments.',
    readTime: '24 min',
    date: 'November 2026',
    status: 'published',
    tags: ['Bellman-Ford', 'Distance-Vector', 'RFC 2453', 'Count-to-Infinity', 'Split Horizon']
  },
  {
    id: 'art-002',
    slug: '#',
    number: '002',
    category: 'Routing Protocols',
    title: 'OSPF & Dijkstra SPF: Hierarchical Area Physics',
    subtitle: 'How Link-State Advertisement flooding creates complete topological awareness in enterprise backbones.',
    abstract: 'Exploring Link-State Advertisements (LSAs), Area 0 backbone transit, Dijkstra’s shortest path tree computation, and sub-second convergence mechanics.',
    readTime: '28 min',
    date: 'Forthcoming / 2027',
    status: 'in-review',
    tags: ['Link-State', 'Dijkstra', 'RFC 2328', 'Area 0', 'LSA Flooding']
  },
  {
    id: 'art-003',
    slug: '#',
    number: '003',
    category: 'Internet Architecture',
    title: 'BGPv4 & Autonomous Systems: The Internet Fabric',
    subtitle: 'Path-vector dynamics, policy routing, and the global routing table across tier-1 carriers.',
    abstract: 'Analyzing peering relationships, AS-Path attributes, multi-homing policies, route reflectors, and why BGP prioritizes stability over metric speed.',
    readTime: '32 min',
    date: 'Research Draft',
    status: 'research',
    tags: ['Path-Vector', 'BGP', 'RFC 4271', 'Autonomous Systems', 'Peering']
  },
  {
    id: 'art-004',
    slug: '#',
    number: '004',
    category: 'Transport Layer',
    title: 'TCP Congestion Dynamics: From Tahoe to BBR',
    subtitle: 'Sliding windows, packet pacing, and bufferbloat mitigation across global links.',
    abstract: 'Mathematical breakdown of Additive Increase / Multiplicative Decrease (AIMD), bottleneck bandwidth round-trip propagation, and modern kernel optimizations.',
    readTime: '22 min',
    date: 'Concept Phase',
    status: 'research',
    tags: ['TCP', 'Flow Control', 'Congestion Window', 'BBR', 'AIMD']
  }
];

export const ArticlesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'published'>('all');

  const filtered = ARTICLES.filter((art) => {
    const matchSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        art.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        art.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchFilter = activeFilter === 'all' || art.status === 'published';
    return matchSearch && matchFilter;
  });

  const handleSelectArticle = (slug: string, status: string) => {
    if (status !== 'published') return;
    sound.playClick();
    navigate(slug);
  };

  return (
    <div className="relative text-slate-100 bg-[#050811] min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="pb-12 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Editorial Archives & Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            Technical Monographs
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-400 font-serif italic max-w-2xl leading-relaxed">
            Curated long-form investigations into computer network protocols, distributed algorithms, and internet infrastructure.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-8 border-b border-slate-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, keyword, RFC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono w-full sm:w-auto">
            <button
              onClick={() => { sound.playClick(); setActiveFilter('all'); }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeFilter === 'all'
                  ? 'bg-sky-500/20 text-sky-300 font-bold border-sky-500/40 shadow-glow-cyan'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Monographs ({ARTICLES.length})
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveFilter('published'); }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeFilter === 'published'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40 shadow-glow-emerald'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Published Only (1)
            </button>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="mt-8 space-y-6">
          {filtered.map((art) => {
            const isPublished = art.status === 'published';
            return (
              <div
                key={art.id}
                onClick={() => handleSelectArticle(art.slug, art.status)}
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isPublished
                    ? 'border-slate-800 hover:border-sky-500/50 bg-slate-950/70 hover:bg-slate-900/40 cursor-pointer shadow-subtle group'
                    : 'border-slate-900 bg-slate-950/30 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sky-400">ARTICLE {art.number}</span>
                    <span>•</span>
                    <span className="text-slate-400">{art.category}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {art.status}
                    </span>
                  </div>
                </div>

                <h2 className={`text-2xl sm:text-3xl font-serif text-white transition-colors ${isPublished ? 'group-hover:text-sky-300' : ''}`}>
                  {art.title}
                </h2>

                <p className="mt-2 text-sm sm:text-base text-slate-300 font-serif italic">
                  {art.subtitle}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {art.abstract}
                </p>

                {/* Tags and CTA */}
                <div className="mt-6 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {art.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800/80">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {isPublished ? (
                    <span className="text-xs font-mono font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-1.5 transition-colors">
                      <span>Read Publication</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 italic">
                      In Peer Review / Upcoming
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
