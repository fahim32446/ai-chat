import ChatBox from '@/components/chat/ChatBox';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Card className='w-full max-w-4xl shadow-lg border border-blue-100 rounded-2xl overflow-hidden bg-white transition-all duration-300 ease-in-out hover:shadow-xl'>
        <CardHeader className='py-6 bg-white border-b border-blue-100'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-2xl font-semibold text-blue-800'>
              AI Chat Helpline
            </CardTitle>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full'></div>
              <span className='text-sm text-blue-600'>Online</span>
            </div>
          </div>
        </CardHeader>
        <ChatBox />
      </Card>
    </div>
  );
}
