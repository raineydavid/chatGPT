import { Inter } from '@next/font/google'
import React, { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { TransparencyButton } from '../ButtonComponents';
import { ChatContentTypes } from '../PageComponents/Homepage';
import { Icon } from '@iconify/react';

const inter = Inter({ subsets: ['latin'] })

interface ChatBoxTypes {
    clearFunc: () => void;
    getAnswerFunc: () => void;
    setInputValue: Dispatch<SetStateAction<string>>;
    chatContent: ChatContentTypes[];
    isLoading: boolean;
    inputValue: string;
    chatBoxRef: RefObject<HTMLDivElement>;
    inputRef: RefObject<HTMLInputElement>;
    isRememberChat: boolean;
    isShowHistory?: boolean;
    setIsShowHistory?: Dispatch<SetStateAction<boolean>>;
    title: string;
}

export default function ChatBox({
    clearFunc,
    getAnswerFunc,
    setInputValue,
    chatContent,
    isLoading,
    inputValue,
    chatBoxRef,
    inputRef,
    isRememberChat,
    isShowHistory,
    setIsShowHistory,
    title
}: ChatBoxTypes) {
    const overview = process.env.MY_OVERVIEW;

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            getAnswerFunc()
        }
    }

    const handleShowHistory = () => {
        if (setIsShowHistory) {
            setIsShowHistory(true)
        }
    }

    const handleHiddenHistory = () => {
        if (setIsShowHistory) {
            setIsShowHistory(false)
        }
    }

    return (
        <div className={`${inter.className} relative max-w-xl w-full text-md self-center`} id='chatBox'>
            <div className='h-6 bg-slate-800 rounded-t-md flex items-center justify-between px-4'>
                <div className='text-sm justify-self-start text-slate-300'>{title}</div>
                <div className='flex items-center gap-2'>
                    {!isRememberChat ? (
                        <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-green-600 transition-all hover:w-12 group' onClick={() => handleHiddenHistory()}>
                            <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>back</div>
                        </div>
                    ) : (
                        <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-green-600' />
                    )}
                    {!isRememberChat ? (
                        <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-yellow-600 transition-all hover:w-12 group' onClick={() => handleShowHistory()}>
                            <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>history</div>
                        </div>
                    ) : (
                        <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-yellow-600' />
                    )}
                    <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-rose-600 transition-all hover:w-12 group' onClick={() => clearFunc()}>
                        <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>reset</div>
                    </div>
                </div>
            </div>
            <div className={`h-[400px] xl:h-[450px] bg-[#00000080] p-5 text-slate-300 flex flex-col gap-3 overflow-auto text-sm ${!isRememberChat && !isShowHistory && !isLoading && chatContent.length > 0 && 'flex items-center justify-center'}`}>
                {isRememberChat ?
                    chatContent.length > 0 ? (
                        chatContent.map((chat, index) => (
                            <div className='flex flex-col gap-2' key={index}>
                                <div className='bg-purple-600 max-w-[240px] sm:max-w-xs rounded-md p-2 w-max self-end'>{chat.Human}</div>
                                <div className='bg-slate-600 max-w-[240px] sm:max-w-xs rounded-md p-2 w-max' ref={chatContent.length - 1 === index ? chatBoxRef : null}>
                                    {isLoading && chatContent.length - 1 === index ? (
                                        <Player
                                            autoplay
                                            loop
                                            src="https://assets1.lottiefiles.com/packages/lf20_fyye8szy.json"
                                            style={{ height: '50px', width: '50px', marginBottom: '-15px', marginTop: '-15px' }}
                                        />
                                    ) : chat.AI}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>{overview}</div>
                    ) : isShowHistory ? (
                        <div>
                            <div className='flex items-center gap-2'>
                                <div className='w-7 h-7 rounded-full bg-green-600 flex items-center justify-center cursor-pointer' onClick={() => handleHiddenHistory()}>
                                    <Icon icon='ic:round-keyboard-arrow-left' className='text-2xl' />
                                </div>
                                <div className='w-32 h-7 flex items-center justify-center rounded-full bg-yellow-600 text-base cursor-pointer'>Chat History</div>
                            </div>
                            <div className='p-5 flex flex-col gap-4'>
                                {chatContent.length === 0 ? (
                                    <div>No History!</div>
                                ) : chatContent.map((chat, index) => (
                                    <div key={index}>
                                        <div className='text-green-600'><span className='font-bold'>You:</span> {chat.Human}</div>
                                        <div className='text-yellow-600'><span className='font-bold'>AI:</span> {chat.AI}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isLoading ? (
                        <Player
                            autoplay
                            loop
                            src="https://assets1.lottiefiles.com/packages/lf20_fyye8szy.json"
                            style={{ height: '50px', width: '50px', marginBottom: '-15px', marginTop: '-15px' }}
                        />
                    ) : chatContent.length > 0 ? (
                        <>
                            <div className='text-base'><span className='font-bold'>You:</span> {chatContent[chatContent.length - 1].AI}</div>
                            <div className='text-base'><span className='font-bold'>AI:</span> {chatContent[chatContent.length - 1].Human}</div>
                        </>
                    ) : (
                        <div>{overview}</div>
                    )
                }
            </div>
            <div className='w-full bg-slate-800 rounded-b-md flex overflow-hidden'>
                <input className='w-full bg-slate-800 outline-none border-none rounded-b-md py-2 px-4' placeholder='Ask me anything...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} disabled={isLoading} ref={inputRef} autoFocus />
                <TransparencyButton isIcon iconName='material-symbols:send' action={() => getAnswerFunc()} />
            </div>
        </div>
    )
}