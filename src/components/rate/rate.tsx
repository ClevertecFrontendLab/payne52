import { StarTwoTone } from '@ant-design/icons';
import { Rate, RateProps } from 'antd';

import './rate.scss';

export const AntdRate = (props: RateProps) => <Rate {...props} character={<StarTwoTone />} />;
