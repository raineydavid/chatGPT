import { useRouter } from 'next/router';
import { Inter, Kanit } from '@next/font/google'
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { FillButton, OutlineButton } from '../ButtonComponents';

const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({ subsets: ['latin'], weight: '700' })

interface HeaderProps {
    isExample: boolean
}

export default function Header({
    isExample
}: HeaderProps) {
    const router = useRouter();

    const goExamples = () => {
        router.push('/examples');
    }

    const goHome = () => {
        router.push('/');
    }

    return (
        <div className='max-w-8xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center h-16' onClick={() => goHome()}>
            <div className={`${kanit.className} flex items-center text-4xl xl:text-5xl text-slate-200 cursor-pointer z-10`}>
                I
                <Player
                    autoplay
                    loop
                    src="https://assets7.lottiefiles.com/packages/lf20_kdhv2a5f.json"
                    style={{ height: '60px', width: '60px' }}
                />
                ChatGPT
            </div>
            <div className={`${inter.className} flex items-center gap-5 self-end sm:self-center`}>
                {isExample ? <OutlineButton name='Home' action={() => goHome()} /> : <OutlineButton name='Examples' action={() => goExamples()} />}
                <FillButton name='Visit Creator' link="https://modernhealer.vercel.app" />
            </div>
        </div>
    )
}
