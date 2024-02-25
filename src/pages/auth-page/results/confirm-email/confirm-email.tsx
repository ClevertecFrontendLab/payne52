import { useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result, Space, Typography } from 'antd';
const { Paragraph } = Typography;
import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useConfirmEmailMutation, UserConfirmEmailData } from '@services/auth';
import { ResultStatusType } from 'antd/lib/result';

import './confirm-email.scss';

export const ConfirmEmail = () => {
    const location = useLocation();
    const email = location.state?.email;

    const [resultStatus, setResultStatus] = useState<ResultStatusType | undefined>(undefined);
    const [fieldStatus, setFieldStatus] = useState('');
    const [fieldValue, setFieldValue] = useState<string | undefined>(undefined);
    const [confirmUserEmail] = useConfirmEmailMutation();

    const handleChange = (fieldValue: string) => {
        setFieldStatus('');
        setFieldValue(fieldValue);
    };

    const confirmEmail = async (data: UserConfirmEmailData) => {
        try {
            await trackPromise(confirmUserEmail(data).unwrap());
            history.replace({ pathname: Paths.CHANGE_PASSWORD }, { access: true });
        } catch (err) {
            setResultStatus('error');
            setFieldStatus('ant-input-status-error');
            setFieldValue('');
        }
    };

    return (
        <Result
            status={resultStatus}
            className='result'
            title='Введите код для восстановления аккауанта'
            subTitle={
                <>
                    Мы отправили вам на e-mail <strong>{email}</strong> шестизначный код. Введите
                    его в поле ниже.
                </>
            }
            extra={
                <>
                    <Space className='verification'>
                        <VerificationInput
                            length={6}
                            value={fieldValue}
                            onChange={(value) => handleChange(value)}
                            placeholder=' '
                            onComplete={(value) => confirmEmail({ email: email, code: value })}
                            classNames={{
                                container: 'inputs',
                                character: `ant-input ${fieldStatus}`,
                                characterSelected: 'ant-input-focused',
                            }}
                        />
                    </Space>
                    <Paragraph type='secondary'>Не пришло письмо? Проверьте папку Спам.</Paragraph>
                </>
            }
        />
    );
};
