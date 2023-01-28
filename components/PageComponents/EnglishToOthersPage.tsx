import { Inter } from '@next/font/google'
import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import ChatBox from '../Components/ChatBox'
import { ChatContentTypes } from './Homepage'

const interB = Inter({ subsets: ['latin'], weight: '900' })
const inter = Inter({ subsets: ['latin'], weight: '400' })

export default function EnglishToOthersPage() {
    const defaultPromot = process.env.DEFAULT_GRAMMAR_CORRECTION_PROMPT;

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<ChatContentTypes[]>([]);
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false)

    const chatBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleGetAnswer = async () => {
        if (inputValue === '/reset') {
            handleClearHistory()
        } else if (inputValue === '/history') {
            setIsShowHistory(true)
            setInputValue('')
        } else if (inputValue === '/home') {
            setIsShowHistory(false)
            setInputValue('')
        } else if (inputValue) {
            try {
                setIsLoading(true);
                setInputValue('');
                setIsShowHistory(false);
                const res = await fetch(`/api/openai-grammar-correction`, {
                    body: JSON.stringify(defaultPromot + inputValue),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                });
                const data = await res.json();
                setChatHistory([...chatHistory, { Human: inputValue, AI: data }])
                localStorage.setItem('englishToOthers', JSON.stringify([...chatHistory, { Human: inputValue, AI: data }]))
                setIsLoading(false);
            } catch {
                handleGetAnswer();
            }
        }
    }

    const handleClearHistory = () => {
        localStorage.removeItem('englishToOthers')
        setChatHistory([])
        setInputValue('')
        setIsLoading(false)
        setIsShowHistory(false)
        if (inputRef) {
            inputRef.current?.focus()
        }
    }

    useEffect(() => {
        if (inputRef) {
            inputRef.current?.focus()
        }
        if (chatBoxRef) {
            chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [JSON.stringify(chatHistory)])

    useEffect(() => {
        const rememberHistory = localStorage.getItem('englishToOthers')
        if (rememberHistory && rememberHistory.length > 0) {
            setChatHistory(JSON.parse(rememberHistory))
        }
    }, [])

    return (
        <div className='descSection w-full max-w-7xl flex flex-col justify-evenly'>
            <div className='flex items-center gap-2'>
                <Icon icon='bi:translate' className='text-purple-500 text-3xl' />
                <div className={`${interB.className} text-3xl text-purple-500`}>English to other Languages</div>
            </div>
            <div className='flex justify-around'>
                <ChatBox
                    clearFunc={handleClearHistory}
                    getAnswerFunc={handleGetAnswer}
                    setInputValue={setInputValue}
                    chatContent={chatHistory}
                    isLoading={isLoading}
                    inputValue={inputValue}
                    chatBoxRef={chatBoxRef}
                    inputRef={inputRef}
                    isRememberChat={false}
                    isShowHistory={isShowHistory}
                    setIsShowHistory={setIsShowHistory}
                    title='English to other languages'
                />
                <div className='max-w-md text-sm'>
                    <div className={`text-xl ${interB.className}`}>Prompt</div>
                    <div className={`${inter.className} flex flex-col rounded-xl p-3 px-5 mt-1 bg-[#3a0e1f73]`}>
                        <div>Correct this to standard English:</div><br />
                        <div>She no went to the market.</div>
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Response</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#0e3a0f73]`}>
                        She did not go to the market.
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Keyword</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#3a2c0e73]`}>
                        <div><span className='font-bold'>/reset</span>: Reset all chats between AI bots.</div>
                        <div><span className='font-bold'>/history</span>: Show all chats between AI bots.</div>
                        <div><span className='font-bold'>/home</span>: Show main chatbox.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
