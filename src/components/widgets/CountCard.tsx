import React, { FC } from 'react'

interface CountCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
}

/**
 * CountCard component displays a card with a title, count, and icon.
 * It is used to show the total number of products or categories.
 */

const CountCard: FC<CountCardProps> = ({ title, count, icon }) => {
    return (
        <div className='widget-card'>
            <div className="flex h-full gap-2">
                <div className='w-24 bg-green-100 h-[100%] flex items-center justify-center text-2xl font-bold'>
                    {icon}
                </div>
                <div className='text-center flex flex-col justify-center items-start'>
                    <h3>
                        {title}
                    </h3>
                    <h1 className='text-6xl'>
                        {count}+
                    </h1>
                </div>

            </div>

        </div>
    )
}

export default CountCard

