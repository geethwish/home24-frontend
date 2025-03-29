import { Avatar, Tag } from 'antd';
import React, { FC } from 'react'
import { Link } from 'react-router-dom';

interface LastModifiedProductWidgetProps {
    productName: string | null;
    title: string
}

const LastModifiedProduct: FC<LastModifiedProductWidgetProps> = ({ productName, title }) => {
    if (!productName) {
        return null;
    }

    return (
        <div title="Last Modified Product" className="widget-card">


            <div className="flex gap-2">

                <Avatar shape="square" size={120} />

                <div className='flex flex-col gap-1'>


                    <Link to={"/product/:id"}>
                        <p className='text-primary font-bold text-lg'>
                            Lorem Ipsum
                        </p>
                    </Link>

                    <div className='flex gap-2'>
                        <Tag color='#cac5fe'>
                            <a
                                href="/category/:id"
                            >
                                Category
                            </a>
                        </Tag>

                    </div>
                    <small className='text-gray-500 text-md font-semibold'>
                        20/20/2025
                    </small>
                    <small className='text-sm font-semibold text-gray-500'>
                        {title}
                    </small>
                </div>

            </div>


        </div>
    );
}

export default LastModifiedProduct