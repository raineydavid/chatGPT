import { Inter } from '@next/font/google'
import React, { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { Icon } from '@iconify/react';
import { TransparencyButton } from '../ButtonComponents';
import { ChatContentTypes } from '../PageComponents/Homepage';
import { LanguageList } from '../Constants/LanguageList';

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
    isShowHint: boolean;
    setIsShowHint: Dispatch<SetStateAction<boolean>>;
    isShowHistory?: boolean;
    setIsShowHistory?: Dispatch<SetStateAction<boolean>>;
    showSelectLanguages?: boolean;
    setShowSelectLanguages?: Dispatch<SetStateAction<boolean>>;
    isSelectLanguages?: boolean;
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
    isShowHint,
    setIsShowHint,
    isShowHistory,
    setIsShowHistory,
    showSelectLanguages,
    setShowSelectLanguages,
    isSelectLanguages,
    title
}: ChatBoxTypes) {
    const overview = 'I am prepared to speak with you. Fire away!';

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [allLanguages, setAllLanguages] = useState<string[]>(LanguageList);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        setIsShowHint(false)
        if (event.key === 'Enter') {
            getAnswerFunc()
        }
    }

    const handleShowHistory = () => {
        if (setIsShowHistory) {
            if (setShowSelectLanguages) {
                setShowSelectLanguages(false)
            }
            setIsShowHistory(true)
            setIsShowHint(false)
        }
    }

    const handleHiddenHistory = () => {
        if (setIsShowHistory) {
            if (setShowSelectLanguages) {
                setShowSelectLanguages(false)
            }
            setIsShowHistory(false)
            setIsShowHint(false)
        }
    }

    const handleClickLanguages = (language: string) => {
        if (selectedLanguages.includes(language)) {
            setSelectedLanguages(selectedLanguages.filter(item => item !== language))
            setAllLanguages([...allLanguages, language])
        } else {
            setSelectedLanguages([...selectedLanguages, language])
            setAllLanguages(allLanguages.filter(item => item !== language))
        }
    }

    useEffect(() => {
        if (inputRef) {
            inputRef.current?.focus()
        }
        if (chatBoxRef && !showSelectLanguages) {
            chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [JSON.stringify(chatContent)])

    return (
        <div className={`${inter.className} relative max-w-auto lg:max-w-xl w-full text-md self-center`} id='chatBox'>
            <div className='h-6 bg-slate-800 rounded-t-md flex items-center justify-between px-4'>
                <div className='text-sm justify-self-start text-slate-300'>{title}</div>
                <div className='flex items-center gap-2'>
                    {!isRememberChat ? (
                        <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-green-600 transition-all hover:w-12 group' onClick={() => handleHiddenHistory()}>
                            <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>home</div>
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
            <div className={`h-[450px] relative bg-[#00000080] p-5 text-slate-300 flex flex-col gap-3 overflow-auto text-sm ${!isRememberChat && !isShowHistory && !isLoading && chatContent.length > 0 && 'flex items-center justify-center'}`} ref={chatBoxRef}>
                {isRememberChat ?
                    chatContent.length > 0 ? (
                        chatContent.map((chat, index) => (
                            <div className='flex flex-col gap-2' key={index}>
                                <div className='bg-purple-600 max-w-[250px] sm:max-w-sm md:max-w-md lg:max-w-xs rounded-md p-2 w-max self-end'>{chat.Human}</div>
                                <div className='bg-slate-600 max-w-[250px] sm:max-w-sm md:max-w-md lg:max-w-xs rounded-md p-2 w-max'>
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
                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            <Player
                                autoplay
                                loop
                                src="https://assets7.lottiefiles.com/packages/lf20_pmgmuthj.json"
                                style={{ height: '250px', width: '250px' }}
                            />
                            <div>{overview}</div>
                        </div>
                    ) : showSelectLanguages ? (
                        <>
                            <div className='flex items-center gap-2'>
                                <div className='w-6 h-6 rounded-full bg-green-600 flex items-center justify-center cursor-pointer' onClick={() => handleHiddenHistory()}>
                                    <Icon icon='ic:round-keyboard-arrow-left' className='text-2xl' />
                                </div>
                                <div className='w-36 h-6 flex items-center justify-center rounded-full bg-transition border border-yellow-600 text-yellow-600 cursor-pointer'>Select Languages</div>
                            </div>
                            <input className='mx-3 sm:mx-4 rounded-full py-2 px-4 outline-none border-none' />
                            <div className='px-4'>
                                <div>Selected</div>
                                <div className='flex flex-wrap gap-2 p-1'>
                                    {selectedLanguages.map((language) => (
                                        <div
                                            className={`flex items-center justify-center ${selectedLanguages.includes(language) ? 'bg-purple-500 text-white' : 'bg-transparent text-purple-500'} border border-purple-500 w-max px-3 h-6 rounded-full cursor-pointer transition-all duration-500`}
                                            onClick={() => handleClickLanguages(language)}
                                            key={language}
                                        >
                                            {selectedLanguages.includes(language) ? (
                                                <div className='flex items-center'>
                                                    <Icon icon='material-symbols:check' className={`text-xl ${selectedLanguages.includes(language) ? 'opacity-100' : 'opacity-0'}`} />
                                                    {language}
                                                </div>
                                            ) : (
                                                language
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='px-4'>
                                <div>All</div>
                                <div className='flex flex-wrap gap-2 p-1'>
                                    {allLanguages.map((language) => (
                                        <div
                                            className={`flex items-center justify-center ${selectedLanguages.includes(language) ? 'bg-purple-500 text-white' : 'bg-transparent text-purple-500'} border border-purple-500 w-max px-3 h-6 rounded-full cursor-pointer transition-all duration-500`}
                                            onClick={() => handleClickLanguages(language)}
                                            key={language}
                                        >
                                            {selectedLanguages.includes(language) ? (
                                                <div className='flex items-center'>
                                                    <Icon icon='material-symbols:check' className={`text-xl ${selectedLanguages.includes(language) ? 'opacity-100' : 'opacity-0'}`} />
                                                    {language}
                                                </div>
                                            ) : (
                                                language
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : isShowHistory ? (
                        <>
                            <div className='flex items-center gap-2'>
                                <div className='w-6 h-6 rounded-full bg-green-600 flex items-center justify-center cursor-pointer' onClick={() => handleHiddenHistory()}>
                                    <Icon icon='ic:round-keyboard-arrow-left' className='text-2xl' />
                                </div>
                                <div className='w-28 h-6 flex items-center justify-center rounded-full bg-transition border border-yellow-600 text-yellow-600 cursor-pointer'>Chat History</div>
                            </div>
                            <div className='px-5 py-2 flex flex-col gap-4'>
                                {chatContent.length === 0 ? (
                                    <div>No History!</div>
                                ) : chatContent.map((chat, index) => (
                                    <div key={index}>
                                        <div className='text-green-600'><span className='font-bold'>You:</span> {chat.Human}</div>
                                        <div className='text-yellow-600'><span className='font-bold'>AI:</span> {chat.AI}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : isLoading ? (
                        <Player
                            autoplay
                            loop
                            src="https://assets1.lottiefiles.com/packages/lf20_fyye8szy.json"
                            style={{ height: '50px', width: '50px' }}
                        />
                    ) : chatContent.length > 0 ? (
                        <>
                            <div className='text-base'><span className='font-bold'>You:</span> {chatContent[chatContent.length - 1].Human}</div>
                            <div className='text-base'><span className='font-bold'>AI:</span> {chatContent[chatContent.length - 1].AI}</div>
                        </>
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            <Player
                                autoplay
                                loop
                                src="https://assets7.lottiefiles.com/packages/lf20_pmgmuthj.json"
                                style={{ height: '250px', width: '250px' }}
                            />
                            <div>{overview}</div>
                            {isSelectLanguages && <div className='underline underline-offset-2 cursor-pointer' onClick={() => setShowSelectLanguages && setShowSelectLanguages(true)}>Select Languages</div>}
                        </div>
                    )
                }
            </div>
            {isShowHint && <div className='absolute bottom-10 left-0'>
                <Player
                    autoplay
                    loop
                    src="https://assets9.lottiefiles.com/packages/lf20_uxud7cot.json"
                    style={{ height: '50px', width: '50px' }}
                />
            </div>}
            <div className='w-full bg-slate-800 rounded-b-md flex overflow-hidden'>
                <input
                    className='w-full bg-slate-800 outline-none border-none rounded-b-md py-2 px-4'
                    placeholder='Ask me anything...'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    disabled={isLoading}
                    ref={inputRef}
                    autoFocus
                />
                <TransparencyButton isIcon iconName='material-symbols:send' action={() => getAnswerFunc()} />
            </div>
        </div>
    )
}