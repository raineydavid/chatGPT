import React from 'react'
import { UltraExtraButton } from '../ButtonComponents'
import Header from '../Components/Header'

export default function Examplespage() {
    return (
        <main className='mainBg relative min-h-screen px-4 sm:px-12 xl:px-24 py-6 sm:py-12 flex flex-col justify-between items-center'>
            <div className='bgPattern absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5' />
            <Header isExample />
            <div className='descSection grid grid-cols-4 relative max-w-8xl w-full py-12'>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Real time chat' bgIcon='material-symbols:chat-bubble-outline-rounded' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Grammer correction' bgIcon='fluent:text-grammar-wand-20-regular' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='English to other languages' bgIcon='bi:translate' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Python to natural language' bgIcon='teenyicons:python-outline' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Movie to Emoji' bgIcon='mdi:emoji-happy-outline' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Calculate Time Complexity' bgIcon='ic:sharp-access-time' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Python bug fixer' bgIcon='ion:bug' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='JavaScript helper chatbot' bgIcon='mdi:cloud-question' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Airport code extractor' bgIcon='mdi:local-airport' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='SQL request' bgIcon='mdi:sql-query' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='JavaScript to Python' bgIcon='material-symbols:code-blocks-outline-sharp' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Mood to color' bgIcon='ic:round-color-lens' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Notes to summary' bgIcon='material-symbols:note-alt-outline-rounded' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Recipe creator' bgIcon='mdi:cook' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Review creator' bgIcon='pajamas:review-list' />
                </div>
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name='Create study notes' bgIcon='uil:comment-notes' />
                </div>
            </div>
        </main>
    )
}