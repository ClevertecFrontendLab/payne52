import { useLocation } from 'react-router-dom';
import { AntdButton } from '@components/generic/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const RegisterError = () => {
    const location = useLocation();
    const fields = location.state?.fields;

    const extra = (
        <AntdButton
            type='primary'
            onClick={() =>
                history.push({ pathname: Paths.REGISTER }, { fields: fields, retry: true })
            }
            data-test-id='registration-retry-button'
        >
            Повторить
        </AntdButton>
    );

    return (
        <Result
            className='result'
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
            extra={extra}
        />
    );
};
