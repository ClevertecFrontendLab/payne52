import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { AntdButton, TrainingListItem } from '@components/index';
import { BadgeType } from '@constants/badge-classes';
import { ResponceTrainingList, ResponceTrainingTypeList, TrainingType } from '@services/training';
import { Empty } from 'antd';

import { TrainingForm } from './training-form';

import './modal-cell.scss';

type ModalCellType = {
    currentCellId?: string;
    style?: object;
    dataId?: string;
    date?: string;
    dateUTC?: string;
    close?: () => void;
    trainingTypeData?: ResponceTrainingTypeList;
    trainingDataList?: ResponceTrainingList | [];
};

export const ModalCell = ({
    currentCellId,
    style,
    dataId,
    date,
    dateUTC,
    close,
    trainingTypeData,
    trainingDataList,
}: ModalCellType) => {
    const isPast = Date.parse(dateUTC as string) < new Date().setDate(new Date().getDate());

    const [form, setForm] = useState(false);
    const [currentTrainingName, setCurrentTrainingName] = useState<string | undefined>(undefined);

    const existingTrainingNamesList = trainingDataList?.map((item) => item.name);
    const editableTrainingNamesList = trainingDataList?.map((item) =>
        !item.isImplementation ? item.name : null,
    );
    const restToAddTrainingNames = trainingTypeData?.filter(
        (item) => !existingTrainingNamesList?.includes(item.name),
    );
    const editableTrainingNames = trainingTypeData?.filter((item) =>
        editableTrainingNamesList?.includes(item.name),
    );
    const restToAddAndEditableTrainingNames = [
        ...(restToAddTrainingNames as TrainingType[]),
        ...(editableTrainingNames as TrainingType[]),
    ];

    const addTrainingList = restToAddTrainingNames?.map((item) => ({
        value: item.name,
        label: item.name,
    }));
    const editTrainingList = restToAddAndEditableTrainingNames?.map((item) => ({
        value: item.name,
        label: item.name,
    }));

    const [selectData, setSelectData] = useState(addTrainingList);

    const openForm = () => {
        setForm(true);
        setSelectData(addTrainingList);
    };

    const openEditForm = (trainingName?: string) => {
        setForm(true);
        setSelectData(editTrainingList);
        setCurrentTrainingName(trainingName);
    };

    const closeForm = () => {
        setForm(false);
    };
    const closeModalCell = () => {
        close ? close() : null;
    };

    const show = currentCellId == dataId;

    useEffect(() => {
        if (!show) {
            setForm(false);
        }
    }, [show]);

    return show ? (
        <div className='ant-modal modal-cell' style={style} data-test-id='modal-create-training'>
            <div className='ant-modal-content'>
                {!form ? (
                    <>
                        <button
                            type='button'
                            className='ant-modal-close'
                            onClick={closeModalCell}
                            data-test-id='modal-create-training-button-close'
                        >
                            <CloseOutlined />
                        </button>
                        <div className='ant-modal-header'>
                            <div className='ant-modal-title'>Тренировка на {date}</div>
                        </div>
                        <div className='ant-modal-body'>
                            {trainingDataList?.[0] ? (
                                <ul className='training-list'>
                                    {trainingDataList.map((item, index) => (
                                        <TrainingListItem
                                            text={item.name}
                                            key={item.name}
                                            badgeType={item.name as BadgeType}
                                            edit={() => openEditForm(item.name)}
                                            disabled={item.isImplementation}
                                            dataTestId={`modal-update-training-edit-button${index}`}
                                        />
                                    ))}{' '}
                                </ul>
                            ) : (
                                <div className='no-content'>
                                    <div className='no-content-message'>
                                        Нет активных тренировок
                                    </div>
                                    <Empty
                                        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                        description=''
                                    ></Empty>
                                </div>
                            )}
                        </div>
                        <div className='ant-modal-footer'>
                            <AntdButton
                                type='primary'
                                onClick={() => openForm()}
                                disabled={(restToAddTrainingNames?.length as number) == 0 || isPast}
                            >
                                Создать тренировку
                            </AntdButton>
                        </div>
                    </>
                ) : (
                    <TrainingForm
                        date={date}
                        dateUTC={dateUTC}
                        trainingList={trainingDataList}
                        selectedTrainingName={currentTrainingName}
                        selectData={selectData}
                        closeForm={closeForm}
                        closeModalCell={closeModalCell}
                        isPast={isPast}
                    />
                )}
            </div>
        </div>
    ) : null;
};
