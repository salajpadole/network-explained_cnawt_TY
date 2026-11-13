import React, { useState } from 'react';
import { RIPV2_PACKET_FIELDS } from '../../data/publicationData';
import { PacketField } from '../../types/publication';
import { Binary, ShieldAlert, Cpu, Eye } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { LiquidButton } from '../buttons/LiquidMetalAction';

export const PacketDissector: React.FC = () => {
  const [selectedField, setSelectedField] = useState<PacketField>(RIPV2_PACKET_FIELDS[0]);
  const [activeTab, setActiveTab] = useState<'visual' | 'hex' | 'wireshark'>('visual');

  const handleSelectField = (field: PacketField) => {
    sound.playClick();
    setSelectedField(field);
  };

  return (
    <div className="my-12 p-6 sm:p-8 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 shadow-liquid-glass">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Binary className="w-4 h-4" />
            <span>Interactive Frame Dissection • RFC 2453 STD 56</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            RIPv2 UDP Payload Anatomy (Port 520)
          </h3>
        </div>

        {/* View mode toggle */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#12141A]/60 backdrop-blur-md rounded-xl border border-[#D8CBB3]/20 text-xs font-mono shadow-inner">
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'visual'}
            onClick={() => setActiveTab('visual')}
          >
            Visual Diagram
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'hex'}
            onClick={() => setActiveTab('hex')}
          >
            Raw Hex Stream
          </LiquidButton>
          <LiquidButton
            variant="pill"
            isActive={activeTab === 'wireshark'}
            onClick={() => setActiveTab('wireshark')}
          >
            Wireshark Tree
          </LiquidButton>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-6">
        
        {/* Visual Block Representation */}
        {activeTab === 'visual' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#D8CBB3]/70 flex items-center justify-between">
              <span>RIP Header (4 Bytes)</span>
              <span>1 to 25 Route Entries (20 Bytes each) • Max Payload 504 Bytes</span>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 p-2 bg-[#121210] rounded-xl border border-[#D8CBB3]/20">
              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[0])}
                className={`col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[0].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Byte 0 (1B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Command</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">0x02 (Response)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[1])}
                className={`col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[1].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Byte 1 (1B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Version</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">0x02 (RIPv2)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[2])}
                className={`col-span-6 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[2].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 2-3 (2B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Routing Domain (Domain Tag)</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">0x0000 (Default)</div>
              </button>
            </div>

            {/* Route Entry Row (20 Bytes) */}
            <div className="text-xs font-mono text-[#D8CBB3]/70 pt-2 font-bold">
              Route Table Entry (RTE #1) — 20 Bytes:
            </div>
            <div className="grid grid-cols-12 gap-2 p-2 bg-[#121210] rounded-xl border border-[#D8CBB3]/20">
              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[3])}
                className={`col-span-6 sm:col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[3].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 4-5 (2B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Address Family (AFI)</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">0x0002 (IPv4)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[4])}
                className={`col-span-6 sm:col-span-3 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[4].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 6-7 (2B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Route Tag</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">0x0000 (Internal)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[5])}
                className={`col-span-12 sm:col-span-6 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[5].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 8-11 (4B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">IP Address Destination</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">192.168.1.0</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[6])}
                className={`col-span-12 sm:col-span-4 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[6].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 12-15 (4B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Subnet Mask</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">255.255.255.0 (/24)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[7])}
                className={`col-span-12 sm:col-span-4 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[7].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 16-19 (4B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Next Hop IP</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">0.0.0.0 (Sender)</div>
              </button>

              <button
                onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[8])}
                className={`col-span-12 sm:col-span-4 p-3 rounded-lg border text-left transition-all ${
                  selectedField.name === RIPV2_PACKET_FIELDS[8].name
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/20 shadow-glow-electric'
                    : 'border-[#D8CBB3]/15 bg-[#1E1E1C] hover:border-[#D8CBB3]/40'
                }`}
              >
                <div className="text-[10px] font-mono text-[#2F6BFF] font-bold">Bytes 20-23 (4B)</div>
                <div className="text-xs font-bold text-[#FAF7F2] truncate">Metric (Hop Count)</div>
                <div className="text-[11px] font-mono text-[#D8CBB3]/70">1 (Valid: 1-15)</div>
              </button>
            </div>
          </div>
        )}

        {/* Raw Hex Stream View */}
        {activeTab === 'hex' && (
          <div className="p-4 bg-[#121210] rounded-xl border border-[#D8CBB3]/20 font-mono text-sm leading-relaxed overflow-x-auto">
            <div className="text-xs text-[#D8CBB3]/50 mb-2">// Raw RIPv2 Hex Dump (24 Bytes) — Click byte groups to inspect:</div>
            <div className="flex flex-wrap gap-2 text-[#D8CBB3]">
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#FAF7F2] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[0])}>02</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#FAF7F2] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[1])}>02</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#FAF7F2] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[2])}>00 00</span>
              <span className="text-[#D8CBB3]/30">|</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#2F6BFF] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[3])}>00 02</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#2F6BFF] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[4])}>00 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#2F6BFF] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[5])}>C0 A8 01 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#2F6BFF] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[6])}>FF FF FF 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#2F6BFF] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[7])}>00 00 00 00</span>
              <span className="cursor-pointer px-1.5 py-0.5 rounded bg-[#1E1E1C] text-[#2F6BFF] hover:bg-[#2F6BFF]/30 border border-[#D8CBB3]/20" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[8])}>00 00 00 01</span>
            </div>
          </div>
        )}

        {/* Wireshark Tree View */}
        {activeTab === 'wireshark' && (
          <div className="p-4 bg-[#121210] rounded-xl border border-[#D8CBB3]/20 font-mono text-xs space-y-1.5 text-[#D8CBB3]">
            <div className="text-[#D8CBB3]/60 font-semibold">▾ User Datagram Protocol, Src Port: 520, Dst Port: 520</div>
            <div className="text-[#2F6BFF] font-semibold pl-4">▾ Routing Information Protocol (RIPv2)</div>
            <div className="pl-8 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[0])}>Command: Response (2)</div>
            <div className="pl-8 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[1])}>Version: RIP-2 (2)</div>
            <div className="pl-8 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[2])}>Routing Domain: 0</div>
            <div className="pl-8 text-[#2F6BFF] font-semibold">▾ IP Address: 192.168.1.0, Metric: 1</div>
            <div className="pl-12 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[3])}>Address Family: IP (2)</div>
            <div className="pl-12 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[4])}>Route Tag: 0</div>
            <div className="pl-12 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[5])}>IP Address: 192.168.1.0</div>
            <div className="pl-12 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[6])}>Netmask: 255.255.255.0</div>
            <div className="pl-12 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[7])}>Next Hop: 0.0.0.0</div>
            <div className="pl-12 text-[#FAF7F2] hover:text-[#2F6BFF] cursor-pointer" onClick={() => handleSelectField(RIPV2_PACKET_FIELDS[8])}>Metric: 1</div>
          </div>
        )}

      </div>

      {/* Field Inspection Details Box */}
      <div className="mt-6 p-5 rounded-xl bg-[#121210] border border-[#D8CBB3]/25 text-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[#2F6BFF]/20 border border-[#2F6BFF]/40 text-[#2F6BFF] font-bold">
                Bytes {selectedField.byteRange}
              </span>
              <h4 className="text-base font-bold text-[#FAF7F2] font-mono">{selectedField.name}</h4>
            </div>
            <div className="mt-1 flex items-center gap-4 text-xs font-mono text-[#D8CBB3]/70">
              <span>Hex: <strong className="text-[#FAF7F2]">{selectedField.hexValue}</strong></span>
              <span>Decimal / Resolved: <strong className="text-[#2F6BFF]">{selectedField.decimalValue}</strong></span>
            </div>
          </div>
          <Eye className="w-5 h-5 text-[#2F6BFF] shrink-0" />
        </div>

        <p className="mt-3 text-[#D8CBB3] leading-relaxed text-xs sm:text-sm">
          {selectedField.description}
        </p>

        <div className="mt-3 p-3 rounded-lg bg-[#1E1E1C] border border-[#D8CBB3]/20 text-xs">
          <span className="font-mono text-[#2F6BFF] font-semibold block mb-1">Architectural Significance:</span>
          <span className="text-[#D8CBB3]">{selectedField.significance}</span>
        </div>
      </div>
    </div>
  );
};
