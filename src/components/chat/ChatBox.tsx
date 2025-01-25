'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from 'ai/react';
import { Bot, Send, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
type Props = {};

const ChatBox = (props: Props) => {
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
    <>
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
    </>
  );
};

export default ChatBox;
