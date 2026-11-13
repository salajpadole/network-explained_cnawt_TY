export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: 'Fundamentals' | 'RIP Protocol' | 'Loop Prevention' | 'Metrics & Timers' | 'Comparative Protocols';
  shortDefinition: string;
  inDepthExplanation: string;
  rfcReferences?: string[];
  relatedTerms?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  rfcAnchor?: string;
  difficulty: 'Core' | 'Advanced' | 'Architect';
}

export interface PacketField {
  byteRange: string;
  name: string;
  hexValue: string;
  decimalValue: string | number;
  description: string;
  significance: string;
  category: 'header' | 'route-entry';
}

export interface ProtocolComparisonItem {
  feature: string;
  ripv1: string;
  ripv2: string;
  ripng: string;
  ospfv2: string;
  eigrp: string;
  bgpv4: string;
  significance: string;
}
