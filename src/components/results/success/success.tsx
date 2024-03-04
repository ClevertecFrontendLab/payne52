import { Result } from 'antd';

type Props = {
    title?: string;
    subTitle?: string;
    extra?: JSX.Element | JSX.Element[];
};

export const Success = (props: Props) => {
    const { title, subTitle, extra } = props;

    return (
        <Result
            className='result'
            status='success'
            title={title}
            subTitle={subTitle}
            extra={extra}
        />
    );
};
