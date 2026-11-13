import React, { useState } from 'react';
import { RIPV2_PACKET_FIELDS } from '../../data/publicationData';
import { PacketField } from '../../types/publication';
import { Binary, ShieldAlert, Cpu, Eye } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export const PacketDissector: React.FC = () => {
  const [selectedField, setSelectedField] = useState<PacketField>(RIPV2_PACKET_FIELDS[0]);
  const [activeTab, setActiveTab] = useState<'visual' | 'hex' | 'wireshark'>('visual');

  const handleSelectField = (field: PacketField) => {
    sound.playClick();
    setSelectedField(field);
  };

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-sky-500/30">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Binary className="w-4 h-4" />
            <span>Interactive Frame Dissection • RFC 2453 STD 56</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            RIPv2 UDP Payload Anatomy (Port 520)
          </h3>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => { sound.playClick(); setActiveTab('visual'); }}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'visual' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Visual Diagram
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('hex'); }}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'hex' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Raw Hex Stream
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('wireshark'); }}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'wireshark' ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Wireshark Tree
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-6">
        
        {/* Visual Block Representation */}
        {activeTab === 'visual' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>RIP Header (4 Bytes)</span>
              <span>1 to 25 Route Entries (20 Bytes each) • Max Payload 504 Bytes</span>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 p-2 bg-slate-950/70 rounded-xl border border-slate-800">
              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[0])}
                className={`col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[0].name
                    ? 'border-sky-400 bg-sky-950/60 shadow-glow-cyan'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-sky-400">Byte 0 (1B)</div>
                <div className="text-xs font-bold text-white truncate">Command</div>
                <div className="text-[11px] font-mono text-slate-400">0x02 (Response)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[1])}
                className={`col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[1].name
                    ? 'border-sky-400 bg-sky-950/60 shadow-glow-cyan'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-sky-400">Byte 1 (1B)</div>
                <div className="text-xs font-bold text-white truncate">Version</div>
                <div className="text-[11px] font-mono text-slate-400">0x02 (RIPv2)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[2])}
                className={`col-span-6 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[2].name
                    ? 'border-sky-400 bg-sky-950/60 shadow-glow-cyan'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-sky-400">Bytes 2-3 (2B)</div>
                <div className="text-xs font-bold text-white truncate">Routing Domain (Domain Tag)</div>
                <div className="text-[11px] font-mono text-slate-400">0x0000 (Default)</div>
              </button>
            </div>

            {/* Route Entry Row (20 Bytes) */}
            <div className="text-xs font-mono text-slate-400 pt-2">
              Route Table Entry (RTE #1) — 20 Bytes:
            </div>
            <div className="grid grid-cols-12 gap-2 p-2 bg-slate-950/70 rounded-xl border border-slate-800">
              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[3])}
                className={`col-span-6 sm:col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[3].name
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400">Bytes 4-5 (2B)</div>
                <div className="text-xs font-bold text-white truncate">Address Family (AFI)</div>
                <div className="text-[11px] font-mono text-slate-400">0x0002 (IPv4)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[4])}
                className={`col-span-6 sm:col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[4].name
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400">Bytes 6-7 (2B)</div>
                <div className="text-xs font-bold text-white truncate">Route Tag</div>
                <div className="text-[11px] font-mono text-slate-400">0x0000 (Internal)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[5])}
                className={`col-span-12 sm:col-span-6 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[5].name
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400">Bytes 8-11 (4B)</div>
                <div className="text-xs font-bold text-white truncate">IP Address Destination</div>
                <div className="text-[11px] font-mono text-slate-400">192.168.1.0</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[6])}
                className={`col-span-12 sm:col-span-4 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[6].name
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400">Bytes 12-15 (4B)</div>
                <div className="text-xs font-bold text-white truncate">Subnet Mask</div>
                <div className="text-[11px] font-mono text-slate-400">255.255.255.0 (/24)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[7])}
                className={`col-span-12 sm:col-span-4 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[7].name
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400">Bytes 16-19 (4B)</div>
                <div className="text-xs font-bold text-white truncate">Next Hop IP</div>
                <div className="text-[11px] font-mono text-slate-400">0.0.0.0 (Sender)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[8])}
                className={`col-span-12 sm:col-span-4 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[8].name
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-400">Bytes 20-23 (4B)</div>
                <div className="text-xs font-bold text-white truncate">Metric (Hop Count)</div>
                <div className="text-[11px] font-mono text-slate-400">1 (Valid: 1-15)</div>
              </button>
            </div>
          </div>
        )}

        {/* Raw Hex Stream View */}
        {activeTab === 'hex' && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto">
            <div className="text-xs text-slate-500 mb-2">// Raw RIPv2 Hex Dump (24 Bytes) — Click byte groups to inspect:</div>
            <div className="flex flex-wrap gap-2 text-slate-300">
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 hover:bg-sky-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[0])}>02</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 hover:bg-sky-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[1])}>02</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 hover:bg-sky-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[2])}>00 00</span>
              <span className="text-slate-600">|</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[3])}>00 02</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[4])}>00 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[5])}>C0 A8 01 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[6])}>FF FF FF 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[7])}>00 00 00 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-800" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[8])}>00 00 00 01</span>
            </div>
          </div>
        )}

        {/* Wireshark Tree View */}
        {activeTab === 'wireshark' && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
            <div className="text-slate-500 font-semibold">▾ User Datagram Protocol, Src Port: 520, Dst Port: 520</div>
            <div className="text-sky-400 font-semibold pl-4">▾ Routing Information Protocol (RIPv2)</div>
            <div className="pl-8 text-slate-300 hover:text-sky-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[0])}>Command: Response (2)</div>
            <div className="pl-8 text-slate-300 hover:text-sky-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[1])}>Version: RIP-2 (2)</div>
            <div className="pl-8 text-slate-300 hover:text-sky-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[2])}>Routing Domain: 0</div>
            <div className="pl-8 text-emerald-400 font-semibold">▾ IP Address: 192.168.1.0, Metric: 1</div>
            <div className="pl-12 text-slate-300 hover:text-emerald-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[3])}>Address Family: IP (2)</div>
            <div className="pl-12 text-slate-300 hover:text-emerald-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[4])}>Route Tag: 0</div>
            <div className="pl-12 text-slate-300 hover:text-emerald-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[5])}>IP Address: 192.168.1.0</div>
            <div className="pl-12 text-slate-300 hover:text-emerald-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[6])}>Netmask: 255.255.255.0</div>
            <div className="pl-12 text-slate-300 hover:text-emerald-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[7])}>Next Hop: 0.0.0.0</div>
            <div className="pl-12 text-slate-300 hover:text-emerald-300 cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[8])}>Metric: 1</div>
          </div>
        )}

      </div>

      {/* Field Inspection Details Box */}
      <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-sky-500/30 text-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-400">
                Bytes {selectedField.byteRange}
              </span>
              <h4 className="text-base font-bold text-white font-mono">{selectedField.name}</h4>
            </div>
            <div className="mt-1 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Hex: <strong className="text-slate-200">{selectedField.hexValue}</strong></span>
              <span>Decimal / Resolved: <strong className="text-emerald-400">{selectedField.decimalValue}</strong></span>
            </div>
          </div>
          <Eye className="w-5 h-5 text-sky-400 shrink-0" />
        </div>

        <p className="mt-3 text-slate-300 leading-relaxed text-xs sm:text-sm">
          {selectedField.description}
        </p>

        <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs">
          <span className="font-mono text-emerald-400 font-semibold block mb-1">Architectural Significance:</span>
          <span className="text-slate-300">{selectedField.significance}</span>
        </div>
      </div>
    </div>
  );
};
