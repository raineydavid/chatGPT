import Head from 'next/head'
import React from 'react'
import { PythonToNaturalPage } from '@/components/PageComponents'

export default function PythonToNatural() {
    return (
        <>
            <Head>
                <title>ChatGPT | Python to natural language</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PythonToNaturalPage />
        </>
    )
}
