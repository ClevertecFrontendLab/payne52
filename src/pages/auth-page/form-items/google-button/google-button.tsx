import { GooglePlusOutlined } from '@ant-design/icons';
import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';

import './google-button.scss';

export const GoogleButton = ({ children }: { children: JSX.Element | string }) => {
    return (
        <AntdFormItem>
            <AntdButton
                type='default'
                className='button google-button'
                htmlType='button'
                onClick={() => history.push(Paths.AUTH)}
            >
                <GooglePlusOutlined />
                {children}
            </AntdButton>
        </AntdFormItem>
    );
};
