import { useLocation } from 'react-router-dom';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const ChangePasswordError = () => {
    const location = useLocation();
    const fields = location.state?.fields;

    return (
        <Result
            className='result'
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз'
            extra={
                <AntdButton
                    type='primary'
                    onClick={() =>
                        history.push(
                            { pathname: Paths.CHANGE_PASSWORD },
                            { fields: fields, retry: true, access: true },
                        )
                    }
                    data-test-id='change-retry-button'
                >
                    Повторить
                </AntdButton>
            }
        />
    );
};
