import { Inter, Kanit } from '@next/font/google'
import React, { useEffect, useState, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { FillButton, OutlineButton, TransparencyButton } from '../ButtonComponents';
import styles from '@/styles/Home.module.css'
import Header from '../Components/Header';

const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({ subsets: ['latin'], weight: '700' })

interface ChatContent {
    Human: string;
    AI: string;
}

export default function Homepage() {
    const overview = process.env.MY_OVERVIEW;
    const defaultPromot = process.env.DEFAULT_CHAT_PROMPT;

    const [inputValue, setInputValue] = useState<string>("");
    const [prompt, setPrompt] = useState<string>(defaultPromot as string);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatContent, setChatContent] = useState<ChatContent[]>([])

    const chatBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleGetAnswer = async () => {
        if (inputValue === '/reset') {
            handleClearHistory()
        } else if (inputValue) {
            try {
                setIsLoading(true);
                setInputValue('')
                setChatContent([...chatContent, { Human: inputValue, AI: '...' }])
                const res = await fetch(`/api/openai-chat`, {
                    body: JSON.stringify(prompt + `Human:${inputValue}\nAI:`),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                });
                const data = await res.json();
                setPrompt(prompt + `Human:${inputValue}\nAI:${data}\n`)
                setChatContent([...chatContent, { Human: inputValue, AI: data }])
                localStorage.setItem('chatContent', JSON.stringify([...chatContent, { Human: inputValue, AI: data }]))
                localStorage.setItem('rememberPrompt', (prompt + `Human:${inputValue}\nAI:${data}\n`))
                setIsLoading(false);
            } catch {
                handleGetAnswer();
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleGetAnswer()
        }
    }

    const handleClearHistory = () => {
        localStorage.removeItem('chatContent')
        localStorage.removeItem('rememberPrompt')
        setChatContent([])
        setInputValue('')
        setPrompt(defaultPromot as string)
        setIsLoading(false)
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
    }, [JSON.stringify(chatContent)])

    useEffect(() => {
        const rememberChatContent = localStorage.getItem('chatContent')
        const rememberPrompt = localStorage.getItem('rememberPrompt')
        if (rememberPrompt && rememberPrompt.length > 0) {
            setPrompt(rememberPrompt)
        }
        if (rememberChatContent && rememberChatContent.length > 0) {
            setChatContent(JSON.parse(rememberChatContent))
        }
    }, [])

    return (
        <div className='descSection relative max-w-8xl w-full py-12 flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-0'>
            <div className='flex flex-col gap-8 w-2/5 min-w-full lg:min-w-[450px] xl:min-w-[550px]'>
                <div className={`${styles.descTitleGroup}`}>
                    <div className={`${kanit.className} ${styles.descTitle} text-7xl sm:text-8xl lg:text-7xl xl:text-8xl`}>ChatGPT made easy</div>
                    <div className={`${kanit.className} ${styles.descTitle} text-7xl sm:text-8xl lg:text-7xl xl:text-8xl`}>ChatGPT made easy</div>
                    <div className={`${kanit.className} ${styles.descTitle} text-7xl sm:text-8xl lg:text-7xl xl:text-8xl`}>ChatGPT made easy</div>
                </div>
                <p className={`${inter.className} text-slate-300 text-sm sm:text-base lg:text-sm xl:text-base`}><span className='font-bold'>ChatGPT</span> is a chatbot that was launched by <span className='font-bold'>OpenAI</span>, an artificial intelligence research and deployment company, in November 2022.</p>
                <FillButton name='Visit Creator' link="https://modernhealer.vercel.app" />
                <div className='flex items-center gap-5'>
                    <OutlineButton isIcon iconName='pajamas:twitter' link="https://twitter.com/CuiAdan" />
                    <OutlineButton isIcon iconName='ri:linkedin-fill' link="https://www.linkedin.com/in/yeshealer" />
                    <OutlineButton isIcon iconName='mdi:github' link="https://github.com/yeshealer" />
                    <OutlineButton isIcon iconName='mdi:telegram' link="https://t.me/yeshealer" />
                </div>
            </div>
            <div className={`${inter.className} relative max-w-xl w-full text-md self-center`} id='chatBox'>
                <div className='h-6 bg-slate-800 rounded-t-md flex items-center justify-end gap-2 px-4'>
                    <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-green-600' />
                    <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-yellow-600' />
                    <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-rose-600 transition-all hover:w-12 group' onClick={() => handleClearHistory()}>
                        <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>reset</div>
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
                    <TransparencyButton isIcon iconName='material-symbols:send' action={() => handleGetAnswer()} />
                </div>
            </div>
        </div>
    )
}