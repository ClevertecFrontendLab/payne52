import { useLocation } from 'react-router-dom';
import { AntdButton } from '@components/generic/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

type Props = {
    extra?: JSX.Element | JSX.Element[];
    dataTestId?: string;
};

export const SaveDataError = ({ extra, dataTestId }: Props) => {
    const location = useLocation();
    const fields = location.state?.fields;

    const extraDefault = (
        <AntdButton
            type='primary'
            onClick={() =>
                history.push(
                    { pathname: Paths.CHANGE_PASSWORD },
                    { fields: fields, retry: true, access: true },
                )
            }
            data-test-id={dataTestId}
        >
            Повторить
        </AntdButton>
    );

    return (
        <Result
            className='result'
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз'
            extra={extra ? extra : extraDefault}
        />
    );
};
