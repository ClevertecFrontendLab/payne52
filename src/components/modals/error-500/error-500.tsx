import { Error500 } from '@components/results';
import { Modal } from 'antd';
import { ModalProps } from 'src/types';

export const ModalError500 = ({ open, desktopSize }: ModalProps) => (
    <Modal
        className='content-block'
        width={desktopSize ? 540 : 330}
        centered
        closable={false}
        footer={null}
        open={open}
    >
        <Error500 />
    </Modal>
);
