import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
const { error } = Modal;

import classNames from 'classnames';

import './training-error.scss';

type Props = {
    retry?: () => void;
    title?: string;
    content?: string | React.ReactNode;
    className?: string;
    width?: number;
};

export const modalTrainingError = ({ retry, title, content, className, width }: Props) => {
    const classNameFromProps = className || '';
    const modalTrainingClassName = classNames({
        [classNameFromProps]: className,
        'modal-trainig-error': true,
    });

    error({
        width: width,
        title: title ? (
            <span data-test-id='modal-error-user-training-title'>{title}</span>
        ) : (
            <span data-test-id='modal-error-user-training-title'>
                При открытии данных произошла ошибка
            </span>
        ),
        icon: <CloseCircleOutlined />,
        closeIcon: (
            <span data-test-id='modal-error-user-training-button-close'>
                <CloseOutlined />
            </span>
        ),
        content: content ? (
            <span data-test-id='modal-error-user-training-subtitle'>{content}</span>
        ) : (
            <span data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</span>
        ),
        className: modalTrainingClassName,
        closable: retry ? true : false,
        centered: true,
        okText: (
            <span data-test-id='modal-error-user-training-button'>
                {retry ? 'Обновить' : 'Закрыть'}
            </span>
        ),
        onOk() {
            retry ? retry() : null;
        },
    });
};
