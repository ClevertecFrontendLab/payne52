import { GooglePlusOutlined } from '@ant-design/icons';
import { AntdButton } from '@components/generic/button';
import { AntdFormItem } from '@components/generic/form-item/form-item';

import './google-button.scss';

export const GoogleButton = ({ children }: { children: JSX.Element | string }) => {
    const loginWithGoogle = () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    };

    return (
        <AntdFormItem>
            <AntdButton
                type='default'
                className='google-button'
                htmlType='button'
                onClick={loginWithGoogle}
            >
                <GooglePlusOutlined />
                {children}
            </AntdButton>
        </AntdFormItem>
    );
};
