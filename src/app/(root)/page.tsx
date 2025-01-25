'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from 'ai/react';
import { Send, User, Bot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ElegantChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useState(60);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setInputHeight(Math.min(Math.max(e.target.scrollHeight, 60), 200));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

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
        <CardContent className='p-6 bg-white'>
          <ScrollArea
            ref={scrollAreaRef}
            className='h-[60vh] pr-4 overflow-y-auto'
          >
            <div className='flex flex-col gap-6'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role !== 'user' && (
                    <Bot className='w-6 h-6 mr-3 text-blue-600 opacity-80' />
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] shadow-sm transition-all duration-200 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-800 border border-blue-100'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <User className='w-6 h-6 ml-3 text-blue-600 opacity-80' />
                  )}
                </div>
              ))}
              {isLoading && (
                <div className='flex items-start justify-start'>
                  <Bot className='w-6 h-6 mr-3 text-blue-600 opacity-80' />
                  <div className='rounded-2xl px-4 py-3 bg-blue-50 text-blue-800 border border-blue-100'>
                    <div className='flex space-x-2'>
                      <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'></div>
                      <div
                        className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className='p-6 bg-white border-t border-blue-100'>
          <form
            onSubmit={handleSubmit}
            className='flex w-full items-center space-x-4'
          >
            <Textarea
              value={input}
              onChange={handleInputResize}
              onKeyPress={handleKeyPress}
              placeholder='Type your message...'
              disabled={isLoading}
              style={{ height: `${inputHeight}px` }}
              className='flex-grow rounded-xl border-2 bg-white text-blue-800 border-blue-200 focus:border-blue-400 resize-none transition-all duration-200 ease-in-out'
            />
            <Button
              type='submit'
              size='lg'
              disabled={isLoading}
              className='rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 ease-in-out'
            >
              <Send className='h-5 w-5 mr-2' />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
