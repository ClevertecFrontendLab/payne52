import { useLocation } from 'react-router-dom';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

import './error-500.scss';

type Props = {
    message?: string;
    dataTestId?: string;
};

export const Error500 = ({ message, dataTestId }: Props) => {
    const location = useLocation();
    const email = location.state?.email;
    const back = location.state?.pathFrom;

    return (
        <Result
            className='result error-500'
            status='500'
            title='Что-то пошло не так'
            subTitle={message ? message : 'Произошла ошибка, попробуйте ещё раз.'}
            extra={
                <AntdButton
                    type='primary'
                    onClick={() => {
                        if (back) {
                            history.replace({ pathname: back }, { email: email, retry: true });
                        } else {
                            history.replace(Paths.MAIN);
                        }
                    }}
                    data-test-id={dataTestId}
                >
                    Назад
                </AntdButton>
            }
        />
    );
};
