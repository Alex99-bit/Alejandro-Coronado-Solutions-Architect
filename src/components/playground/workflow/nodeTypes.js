export const NODE_TYPES = [
  {
    id: 'trigger',
    label: 'Trigger',
    icon: 'fa-bolt',
    color: 'emerald',
    description: 'Entry point — starts the workflow execution',
    inputs: 0,
    outputs: 1,
    defaultConfig: {
      inputText: 'Analyze the sentiment of this review: "This product is amazing and I love it!"',
    },
    configFields: [
      { key: 'inputText', label: 'Input Text', type: 'textarea', placeholder: 'Text or JSON to pass to the next node...' },
    ],
  },
  {
    id: 'llm-agent',
    label: 'LLM Agent',
    icon: 'fa-brain',
    color: 'violet',
    description: 'AI reasoning step — processes context via Gemini',
    inputs: 1,
    outputs: 1,
    defaultConfig: {
      prompt: 'Analyze the following text for sentiment. Reply with POSITIVE, NEGATIVE, or NEUTRAL and explain why.\n\n{{input}}',
      temperature: 0.7,
    },
    configFields: [
      { key: 'prompt', label: 'Prompt Template', type: 'textarea', placeholder: 'Use {{input}} to reference the previous node output...' },
      { key: 'temperature', label: 'Temperature', type: 'range', min: 0, max: 1, step: 0.1 },
    ],
  },
  {
    id: 'data-loader',
    label: 'Data Loader',
    icon: 'fa-database',
    color: 'sky',
    description: 'Fetches and parses structured data from a source',
    inputs: 0,
    outputs: 1,
    defaultConfig: {
      jsonData: '{"users": ["Alice", "Bob", "Charlie"], "count": 3}',
    },
    configFields: [
      { key: 'jsonData', label: 'JSON Data', type: 'textarea', placeholder: '{"key": "value"}' },
    ],
  },
  {
    id: 'filter',
    label: 'Filter',
    icon: 'fa-filter',
    color: 'amber',
    description: 'Conditionally passes or blocks data items',
    inputs: 1,
    outputs: 1,
    defaultConfig: {
      condition: '{{input}}.length > 0',
    },
    configFields: [
      { key: 'condition', label: 'Condition', type: 'text', placeholder: '{{input}}.length > 0' },
    ],
  },
  {
    id: 'transform',
    label: 'Transform',
    icon: 'fa-wand-magic-sparkles',
    color: 'blue',
    description: 'Maps, reshapes, or enriches the data payload',
    inputs: 1,
    outputs: 1,
    defaultConfig: {
      expression: 'Summary: {{input}}',
    },
    configFields: [
      { key: 'expression', label: 'Expression', type: 'text', placeholder: 'Summary: {{input}}' },
    ],
  },
  {
    id: 'conditional',
    label: 'Conditional',
    icon: 'fa-code-branch',
    color: 'orange',
    description: 'Branches flow into true / false paths',
    inputs: 1,
    outputs: 2,
    defaultConfig: {
      condition: '{{input}}.includes("positive")',
    },
    configFields: [
      { key: 'condition', label: 'Condition', type: 'text', placeholder: '{{input}}.includes("positive")' },
    ],
  },
  {
    id: 'webhook',
    label: 'Webhook',
    icon: 'fa-globe',
    color: 'pink',
    description: 'Sends output to an external HTTP endpoint',
    inputs: 1,
    outputs: 0,
    defaultConfig: {
      url: '',
    },
    configFields: [
      { key: 'url', label: 'Endpoint URL', type: 'text', placeholder: 'https://api.example.com/webhook (optional)' },
    ],
  },
  {
    id: 'output',
    label: 'Output',
    icon: 'fa-arrow-right-from-bracket',
    color: 'cyan',
    description: 'Terminal node — renders or stores final result',
    inputs: 1,
    outputs: 0,
    defaultConfig: {},
    configFields: [],
  },
]

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-500/15', ring: 'ring-emerald-500/40', text: 'text-emerald-400', port: 'bg-emerald-400', glow: 'shadow-emerald-500/30' },
  violet: { bg: 'bg-violet-500/15', ring: 'ring-violet-500/40', text: 'text-violet-400', port: 'bg-violet-400', glow: 'shadow-violet-500/30' },
  sky: { bg: 'bg-sky-500/15', ring: 'ring-sky-500/40', text: 'text-sky-400', port: 'bg-sky-400', glow: 'shadow-sky-500/30' },
  amber: { bg: 'bg-amber-500/15', ring: 'ring-amber-500/40', text: 'text-amber-400', port: 'bg-amber-400', glow: 'shadow-amber-500/30' },
  blue: { bg: 'bg-blue-500/15', ring: 'ring-blue-500/40', text: 'text-blue-400', port: 'bg-blue-400', glow: 'shadow-blue-500/30' },
  orange: { bg: 'bg-orange-500/15', ring: 'ring-orange-500/40', text: 'text-orange-400', port: 'bg-orange-400', glow: 'shadow-orange-500/30' },
  pink: { bg: 'bg-pink-500/15', ring: 'ring-pink-500/40', text: 'text-pink-400', port: 'bg-pink-400', glow: 'shadow-pink-500/30' },
  cyan: { bg: 'bg-cyan-500/15', ring: 'ring-cyan-500/40', text: 'text-cyan-400', port: 'bg-cyan-400', glow: 'shadow-cyan-500/30' },
}

export function getNodeColors(color) {
  return COLOR_MAP[color] || COLOR_MAP.blue
}

export function getNodeType(id) {
  return NODE_TYPES.find((n) => n.id === id)
}
