import { AntdButton, Success } from '@components/index';
import { Modal } from 'antd';
import { ModalProps } from 'src/types';

export const ModalSendFeedbackSuccess = ({ desktopSize, open, callback }: ModalProps) => {
    return (
        <Modal
            centered
            className='content-block'
            closable={false}
            footer={null}
            width={desktopSize ? 540 : 330}
            open={open}
        >
            <Success
                title='Отзыв успешно опубликован'
                extra={
                    <AntdButton type='primary' onClick={callback}>
                        Отлично
                    </AntdButton>
                }
            />
        </Modal>
    );
};
