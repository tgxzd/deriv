import { NextApiRequest, NextApiResponse } from 'next';
import { TelegramService } from '@/lib/telegram-service';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }

  try {
    const telegramService = new TelegramService();
    const { message } = req.body;

    if (!message?.text) {
      return res.status(400).json({ message: 'No message text provided' });
    }

    const chatId = message.chat.id;
    const command = message.text.split(' ')[0].toLowerCase();

    switch (command) {
      case '/start':
        await telegramService.handleStartCommand(chatId);
        break;
      case '/metrics':
        await telegramService.handleMetricsCommand(chatId);
        break;
      case '/pnl':
        await telegramService.handlePnLCommand(chatId);
        break;
      case '/distribution':
        await telegramService.handleDistributionCommand(chatId);
        break;
      case '/help':
        await telegramService.handleHelpCommand(chatId);
        break;
      default:
        await telegramService.sendMessage({
          chat_id: chatId,
          text: 'Unknown command. Type /help to see available commands.',
        });
    }

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Disable body parsing, need raw body for Telegram webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
}; 