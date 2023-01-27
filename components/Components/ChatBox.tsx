import { Inter } from '@next/font/google'
import React, { Dispatch, RefObject, SetStateAction } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { TransparencyButton } from '../ButtonComponents';
import { ChatContentTypes } from '../PageComponents/Homepage';

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
    title
}: ChatBoxTypes) {
    const overview = process.env.MY_OVERVIEW;

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            getAnswerFunc()
        }
    }

    return (
        <div className={`${inter.className} relative max-w-xl w-full text-md self-center`} id='chatBox'>
            <div className='h-6 bg-slate-800 rounded-t-md flex items-center justify-between px-4'>
                <div className='text-sm justify-self-start text-slate-300'>{title}</div>
                <div className='flex items-center gap-2'>
                    <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-green-600' />
                    <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-yellow-600' />
                    <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-rose-600 transition-all hover:w-12 group' onClick={() => clearFunc()}>
                        <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>reset</div>
                    </div>
                </div>
            </div>
            <div className='h-[400px] xl:h-[450px] bg-[#00000080] p-5 text-slate-300 flex flex-col gap-3 overflow-auto text-sm'>
                {chatContent.length > 0 ? (
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
                ) : overview}
            </div>
            <div className='w-full bg-slate-800 rounded-b-md flex overflow-hidden'>
                <input className='w-full bg-slate-800 outline-none border-none rounded-b-md py-2 px-4' placeholder='Ask me anything...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} disabled={isLoading} ref={inputRef} autoFocus />
                <TransparencyButton isIcon iconName='material-symbols:send' action={() => getAnswerFunc()} />
            </div>
        </div>
    )
}