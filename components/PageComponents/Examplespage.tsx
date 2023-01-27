import React from 'react'
import { UltraExtraButton } from '../ButtonComponents'
import Header from '../Components/Header'
import { ExampleList } from '../Constants/ExamplePage'

export default function Examplespage() {
    return (
        <main className='mainBg relative min-h-screen px-4 sm:px-12 xl:px-24 py-6 sm:py-12 flex flex-col justify-between items-center'>
            <div className='bgPattern absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5' />
            <Header isExample />
            <div className='descSection grid grid-cols-4 relative max-w-8xl w-full py-12'>
                {ExampleList.map((example) => (
                    <div className='flex justify-center items-center'>
                        <UltraExtraButton name={example.name} bgIcon={example.icon} action={example.link} />
                    </div>
                ))}
            </div>
        </main>
    )
}