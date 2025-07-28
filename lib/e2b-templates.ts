// E2B Template Configuration for Zyro AI Website Builder
// Similar to vibecode-ai template management

export interface E2BTemplate {
  id: string;
  name: string;
  description: string;
  languages: string[];
  packages: string[];
}

// Available E2B templates
export const E2B_TEMPLATES: Record<string, E2BTemplate> = {
  'vieb-python': {
    id: 'vieb-python',
    name: 'Python Data Science',
    description: 'Python environment with data science, AI/ML, and web development packages',
    languages: ['python', 'py'],
    packages: [
      'numpy', 'pandas', 'matplotlib', 'seaborn', 'plotly', 'scipy', 'scikit-learn',
      'flask', 'fastapi', 'requests', 'beautifulsoup4', 'openai', 'anthropic',
      'Pillow', 'opencv-python', 'jupyter', 'ipython'
    ]
  },
  'vieb-fullstack': {
    id: 'vieb-fullstack',
    name: 'Full-Stack Development',
    description: 'Node.js + Python environment for full-stack web development',
    languages: ['javascript', 'typescript', 'python', 'js', 'ts', 'py', 'jsx', 'tsx'],
    packages: [
      'next', 'react', 'vue', 'express', 'fastapi', 'flask', 'prisma',
      'tailwindcss', 'typescript', 'pandas', 'numpy'
    ]
  },
  'vieb-basic': {
    id: 'vieb-basic',
    name: 'Basic Code Execution',
    description: 'Lightweight environment for basic code execution',
    languages: ['python', 'javascript', 'bash', 'shell'],
    packages: ['python3', 'nodejs', 'npm']
  }
};

// Default template fallback
export const DEFAULT_TEMPLATE = 'vieb-python';

/**
 * Determine the best E2B template based on file extension or code content
 */
export function getTemplateForCode(filename: string, code?: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  // Check by file extension
  if (extension) {
    for (const [templateId, template] of Object.entries(E2B_TEMPLATES)) {
      if (template.languages.includes(extension)) {
        return templateId;
      }
    }
  }
  
  // Check by code content if filename doesn't help
  if (code) {
    const lowerCode = code.toLowerCase();
    
    // Check for specific imports/frameworks
    if (lowerCode.includes('import pandas') || 
        lowerCode.includes('import numpy') || 
        lowerCode.includes('import matplotlib') ||
        lowerCode.includes('import seaborn') ||
        lowerCode.includes('import plotly')) {
      return 'vieb-python';
    }
    
    if (lowerCode.includes('import react') || 
        lowerCode.includes('from next') || 
        lowerCode.includes('import express') ||
        lowerCode.includes('import fastapi')) {
      return 'vieb-fullstack';
    }
  }
  
  return DEFAULT_TEMPLATE;
}

/**
 * Get template configuration
 */
export function getTemplate(templateId: string): E2BTemplate | null {
  return E2B_TEMPLATES[templateId] || null;
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