import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import {
    AntdButton,
    AntdFormItem,
    AntdRate,
    ModalSendFeedbackSuccess,
    SaveDataError,
} from '@components/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { newFeedback } from '@redux/feedbackSlice';
import { UserFeedbackData, useSendFeedbackMutation } from '@services/feedback';
import { Form, Input, Modal, Space } from 'antd';
import { ModalProps } from 'src/types';

import './feedback-form.scss';

export const ModalFeedbackForm = ({ desktopSize }: ModalProps) => {
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(true);
    const handleChangeFields = () => {
        setDisabled(Boolean(!form.getFieldValue('rating')));
    };

    const dispatch = useAppDispatch();

    const [sendUserFeedback] = useSendFeedbackMutation();
    const sendFeedback = async (feedbackData: UserFeedbackData) => {
        handleOk();
        try {
            await trackPromise(sendUserFeedback(feedbackData).unwrap());
            showModalSuccess();
        } catch (err) {
            showModalError();
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const showModalError = () => {
        setIsModalErrorOpen(true);
    };
    const handleOkError = () => {
        setIsModalErrorOpen(false);
        showModal();
    };
    const handleCancelError = () => {
        setIsModalErrorOpen(false);
        form.resetFields();
    };

    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const showModalSuccess = () => {
        setIsModalSuccessOpen(true);
        form.resetFields();
        setDisabled(true);
    };
    const handleOkSuccess = () => {
        setIsModalSuccessOpen(false);
        dispatch(newFeedback());
    };

    const extra = (
        <Space>
            <AntdButton
                type='primary'
                onClick={handleOkError}
                data-test-id='write-review-not-saved-modal'
            >
                Написать отзыв
            </AntdButton>
            <AntdButton type='default' onClick={handleCancelError}>
                Закрыть
            </AntdButton>
        </Space>
    );

    return (
        <>
            <AntdButton type='primary' onClick={showModal} data-test-id='write-review'>
                Написать отзыв
            </AntdButton>
            <Modal
                centered
                title='Ваш отзыв'
                open={isModalOpen}
                width={desktopSize ? 540 : 330}
                onCancel={handleCancel}
                className='feedback-modal'
                footer={[
                    <AntdButton
                        key='submit'
                        type='primary'
                        onClick={() => sendFeedback(form.getFieldsValue())}
                        disabled={disabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </AntdButton>,
                ]}
            >
                <Form
                    form={form}
                    name='feedback'
                    initialValues={{ rating: 0 }}
                    onFieldsChange={handleChangeFields}
                    className='feedback-form'
                >
                    <AntdFormItem
                        name='rating'
                        className='rating-form-item'
                        rules={[{ required: true, message: '' }]}
                    >
                        <AntdRate />
                    </AntdFormItem>
                    <AntdFormItem name='message' rules={[{ message: '' }]}>
                        <Input.TextArea
                            autoSize={{ minRows: 2 }}
                            placeholder='Расскажите, почему Вам понравилсоь наше приложение'
                        />
                    </AntdFormItem>
                </Form>
            </Modal>

            <Modal
                centered
                className='content-block'
                open={isModalErrorOpen}
                closable={false}
                footer={null}
                width={desktopSize ? 540 : 330}
            >
                <SaveDataError extra={extra} />
            </Modal>

            <ModalSendFeedbackSuccess
                desktopSize={desktopSize}
                open={isModalSuccessOpen}
                close={handleOkSuccess}
            />
        </>
    );
};
