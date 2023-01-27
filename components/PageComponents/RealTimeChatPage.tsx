import React from 'react'
import Header from '../Components/Header'

export default function RealTimeChatPage() {
    return (
        <main className='mainBg relative min-h-screen px-4 sm:px-12 xl:px-24 py-6 sm:py-12 flex flex-col justify-between items-center'>
            <div className='bgPattern absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5' />
            <Header isExample isExamplePage />
        </main>
    )
}
