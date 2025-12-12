import React from 'react';

export interface UserContext {
  name: string;
  industry: string;
  email?: string;
  company?: string;
  phone?: string;
  hasOnboarded: boolean;
}

export enum PageView {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  // New Service Pillars
  MARKETING = 'MARKETING',
  AI_APPS = 'AI_APPS',
  WEB_DEV = 'WEB_DEV',
  
  TOOLS = 'TOOLS',
  CONTACT = 'CONTACT'
}

export interface ServiceItem {
  id: string;
  title: string;
  defaultDescription: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface BlogPost {
  title: string;
  summary: string;
  sourceUrl?: string;
  generatedContent?: string;
}