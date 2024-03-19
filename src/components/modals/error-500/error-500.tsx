import { ReactNode } from 'react';
import { Error500 } from '@components/results';
import { Modal } from 'antd';
import { ModalProps } from 'src/types';

export const ModalError500 = ({ open, desktopSize, close, dataTestId }: ModalProps) => (
    <Modal
        className='content-block'
        width={desktopSize ? 540 : 330}
        centered
        closable={false}
        footer={null}
        open={open}
        maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0.5)' }}
        modalRender={(node: ReactNode) => <div data-test-id={dataTestId}>{node}</div>}
    >
        <Error500 close={close} />
    </Modal>
);
