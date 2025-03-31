import { FC } from 'react';
import { Spin } from 'antd';

const PageLoader: FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-50 flex justify-center items-center z-50">
            <Spin size="large" />
        </div>
    );
};

export default PageLoader;