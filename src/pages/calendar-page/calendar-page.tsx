import { useLayoutEffect, useRef, useState } from 'react';
import { AntdContent, modalTrainingError, TrainingListItem } from '@components/index';
import { Calendar } from 'antd';
import { Grid } from 'antd';
import { Moment } from 'moment';
const { useBreakpoint } = Grid;

import { trackPromise } from 'react-promise-tracker';
import { BadgeType } from '@constants/badge-classes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { RootState } from '@redux/configure-store';
import {
    ResponceTrainingList,
    ResponceTrainingTypeList,
    useGetTrainingTypeListMutation,
} from '@services/training';
import { formatDate } from '@utils/format-date';
import { calendarLocale } from '@utils/locale';
import { position } from '@utils/modal-cell-position';
import classNames from 'classnames';

import { ModalCell } from './modal-cell';

import './calendar-page.scss';

const getTrainingList = (data: ResponceTrainingList, value: Moment) => {
    const trainings = data?.filter(
        (training) => formatDate(training.date) === value.format('DD.MM.YYYY'),
    );
    return trainings || [];
};

export const CalendarPage = () => {
    const firstMount = useRef(false);
    useLayoutEffect(() => {
        if (!firstMount.current) {
            firstMount.current = true;
            getTrainingTypeList();
        }
    }, []);

    const trainingData = useAppSelector(
        (state: RootState) => state.splitApi.mutations?.['training-mutation']?.data,
    ) as ResponceTrainingList;

    const screens = useBreakpoint();
    const [trainingTypeData, setTrainingTypeData] = useState<ResponceTrainingTypeList>([]);

    const [getFullTrainingList] = useGetTrainingTypeListMutation();
    const getTrainingTypeList = async () => {
        try {
            await trackPromise(
                getFullTrainingList()
                    .unwrap()
                    .then((resp) => setTrainingTypeData(resp)),
            );
        } catch (err) {
            modalTrainingError({ retry: getTrainingTypeList, width: 384 });
        }
    };

    const dateFullCellRender = (value: Moment) => {
        const trainingDataList = getTrainingList(trainingData, value);
        const cellClass = classNames({
            cell: true,
            'has-training': trainingDataList?.[0],
        });

        return (
            <div onClick={(e) => stopPropagation(e)} className={cellClass}>
                <div
                    className='ant-picker-cell-inner ant-picker-calendar-date'
                    id={`cell-${value.format('DD-MM-YYYY')}`}
                    onClick={(e) => openMC(e, value)}
                >
                    <div className='ant-picker-calendar-date-value'>{value.date()}</div>
                    <div className='ant-picker-calendar-date-content'>
                        <ul className='training-list'>
                            {trainingDataList.map((item, index) => (
                                <TrainingListItem
                                    text={item.name}
                                    key={index}
                                    badgeType={item.name as BadgeType}
                                    disabled={item.isImplementation}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
                <ModalCell
                    currentCellId={currentCellId}
                    style={positionMC}
                    dataId={`cell-${value.format('DD-MM-YYYY')}`}
                    date={date}
                    dateUTC={dateUTC}
                    close={() => closeModalCell()}
                    trainingTypeData={trainingTypeData}
                    trainingDataList={trainingDataList}
                />
            </div>
        );
    };

    const [currentCellId, setCurrentCellId] = useState('');
    const [dateUTC, setDateUTC] = useState('');
    const [date, setDate] = useState('');
    const [positionMC, setPositionMC] = useState({});

    const openMC = (e: React.MouseEvent<HTMLElement>, value: Moment) => {
        setDate(`${value.format('DD.MM.YYYY')}`);
        setDateUTC(`${value.utc().format()}`);
        setPositionMC(position(e));
        setCurrentCellId(e.currentTarget.id);
    };

    const stopPropagation = (e: React.MouseEvent<HTMLElement>) => {
        if (screens.md) {
            e.stopPropagation();
        }
    };

    const closeModalCell = () => {
        setCurrentCellId('');
    };

    return (
        <AntdContent className='calendar-page-content'>
            <Calendar
                locale={calendarLocale}
                dateFullCellRender={trainingTypeData?.[0] ? dateFullCellRender : undefined}
                fullscreen={screens.md}
                onPanelChange={closeModalCell}
            />
        </AntdContent>
    );
};
