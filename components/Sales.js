import Image from 'next/image'
import React from 'react'

export default function Sales() {
    return (
        <div style={{ background: '#3ACCE9' }}>
            <Image
                src={'/images/Rectangle.svg'}
                alt="uzor"
                width={1900}
                height={160}
                className="opacity-5 "

            />
        </div>
    )
}
