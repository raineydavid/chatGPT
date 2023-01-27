import React from 'react'
import { UltraExtraButton } from '../ButtonComponents'
import Header from '../Components/Header'
import { ExampleList } from '../Constants/ExamplePage'

export default function Examplespage() {
    return (
        <div className='descSection grid grid-cols-4 relative max-w-8xl w-full py-12'>
            {ExampleList.map((example) => (
                <div className='flex justify-center items-center'>
                    <UltraExtraButton name={example.name} bgIcon={example.icon} action={example.link} />
                </div>
            ))}
        </div>
    )
}