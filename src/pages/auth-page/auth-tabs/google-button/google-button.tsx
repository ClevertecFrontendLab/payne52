import { GooglePlusOutlined } from '@ant-design/icons';
import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';

export const GoogleButton = () => {
    return (
        <AntdFormItem>
            <AntdButton type='default' htmlType='button' onClick={() => history.push(Paths.AUTH)}>
                <GooglePlusOutlined />
                Регистрация через Google
            </AntdButton>
        </AntdFormItem>
    );
};
