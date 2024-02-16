import { useNavigate } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';
import { Paths } from '@constants/paths';

export const LoginGoogleButton = () => {
    const navigate = useNavigate();

    return (
        <AntdFormItem>
            <AntdButton type='default' htmlType='button' onClick={() => navigate(Paths.HOME)}>
                <GooglePlusOutlined />
                Регистрация через Google
            </AntdButton>
        </AntdFormItem>
    );
};
