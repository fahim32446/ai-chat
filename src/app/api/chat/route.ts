import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: 'AIzaSyC-zU7yO_PAQeH3-bovCkuvttKsF1kuk70',
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash-latest'),
    messages,
  });

  return result.toDataStreamResponse();
}
