// E2B Template Configuration for Zyro AI Website Builder
// Using existing vibegourab template with team configuration

export interface E2BTemplate {
  id: string;
  name: string;
  description: string;
  languages: string[];
  packages: string[];
  teamId?: string;
}

// Available E2B templates - using your existing vibegourab template
export const E2B_TEMPLATES: Record<string, E2BTemplate> = {
  'vibegourab': {
    id: 'vibegourab',
    name: 'Vibegourab Universal Environment',
    description: 'Your existing E2B template with pre-configured development environment',
    languages: ['python', 'javascript', 'typescript', 'py', 'js', 'ts', 'jsx', 'tsx'],
    packages: [
      'python3', 'nodejs', 'npm', 'pip', 'jupyter', 'pandas', 'numpy', 
      'matplotlib', 'requests', 'flask', 'fastapi', 'react', 'next'
    ],
    teamId: process.env.E2B_TEAM_ID // Team ID for template access
  }
};

// Default template
export const DEFAULT_TEMPLATE = 'vibegourab';

// E2B Configuration
export interface E2BConfig {
  apiKey: string;
  teamId?: string;
  defaultTemplate: string;
}

export function getE2BConfig(): E2BConfig {
  return {
    apiKey: process.env.E2B_API_KEY || '',
    teamId: process.env.E2B_TEAM_ID,
    defaultTemplate: DEFAULT_TEMPLATE
  };
}

/**
 * Get template configuration
 */
export function getTemplate(templateId: string): E2BTemplate | null {
  return E2B_TEMPLATES[templateId] || E2B_TEMPLATES[DEFAULT_TEMPLATE];
}

/**
 * Get all available templates
 */
export function getAllTemplates(): E2BTemplate[] {
  return Object.values(E2B_TEMPLATES);
}

/**
 * Check if a template supports a specific language
 */
export function templateSupportsLanguage(templateId: string, language: string): boolean {
  const template = getTemplate(templateId);
  return template ? template.languages.includes(language.toLowerCase()) : false;
}