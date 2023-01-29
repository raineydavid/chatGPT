import { MovieToEmojipage } from '@/components/PageComponents'
import Head from 'next/head'
import React from 'react'

export default function MovieToEmoji() {
    return (
        <>
            <Head>
                <title>ChatGPT | English to other languages</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MovieToEmojipage />
        </>
    )
}
