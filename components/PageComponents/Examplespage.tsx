import React from 'react'
import { UltraExtraButton } from '../ButtonComponents'
import { ExampleList } from '../Constants/ExamplePage'

export default function Examplespage() {
    return (
        <div className='grid grid-cols-4 relative max-w-8xl w-full py-12 gap-8'>
            {ExampleList.map((example) => (
                <div className='flex justify-center items-center' key={example.name}>
                    <UltraExtraButton name={example.name} bgIcon={example.icon} action={example.link} />
                </div>
            ))}
        </div>
    )
}