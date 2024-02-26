import Lottie from 'lottie-react';

import loader from './loader.json';

import './loading.scss';

export const Loading = ({ children, status }: { children: JSX.Element; status: boolean }) => {
    const style = {
        height: 150,
        with: 150,
    };

    if (status) {
        return (
            <>
                {children}
                <div className='loading' data-test-id='loader'>
                    <Lottie animationData={loader} className='loader' style={style} />
                </div>
            </>
        );
    } else {
        return children;
    }
};
