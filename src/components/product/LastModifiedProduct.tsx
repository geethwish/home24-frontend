import { Avatar } from 'antd';
import { FC } from 'react'
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import moment from 'moment';

interface LastModifiedProductWidgetProps extends Product {
    title: string
}

const LastModifiedProduct: FC<LastModifiedProductWidgetProps> = ({ name, title, updated_at, imageUrl, id }) => {
    if (!name) {
        return null;
    }

    return (
        <div title="Last Modified Product" className="widget-card">


            <div className="flex gap-2">

                <Avatar shape="square" size={120} src={imageUrl} />

                <div className='flex flex-col gap-1'>


                    <Link to={`/product/${id}`}>
                        <p className='text-primary font-bold text-lg'>
                            {name}
                        </p>
                    </Link>

                    <small className='text-gray-500 text-md font-semibold'>
                        {
                            moment(updated_at).format('MMMM Do YYYY, h:mm:ss a')
                        }
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