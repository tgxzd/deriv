export const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
export const WEBHOOK_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/webhook`
  : 'http://localhost:3000/api/webhook';

// Commands that our bot will support
export const BOT_COMMANDS = [
  { command: 'start', description: 'Start the bot' },
  { command: 'metrics', description: 'Show trading metrics' },
  { command: 'pnl', description: 'Show PnL details' },
  { command: 'distribution', description: 'Show distribution stats' },
  { command: 'help', description: 'Show help information' },
]; 