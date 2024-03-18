import { useEffect, useState } from 'react';
import {
    ArrowLeftOutlined,
    CloseOutlined,
    EditOutlined,
    LoadingOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {
    AntdBadge,
    AntdButton,
    AntdFormItem,
    modalTrainingError,
    TrainingListItem,
} from '@components/index';
import { BadgeType } from '@constants/badge-classes';
import {
    ResponceExercise,
    ResponceTraining,
    ResponceTrainingList,
    useEditTrainingMutation,
    UserEditTraining,
    UserExercise,
    UserTraining,
    useSendTrainingMutation,
} from '@services/training';
import { Drawer, Empty, Form, Select, Space } from 'antd';
import { Grid } from 'antd';

import { TrainingFormList } from './form-list';
const { useBreakpoint } = Grid;

import './training-form.scss';

type Props = {
    closeForm: () => void;
    closeModalCell?: () => void;
    dateUTC?: string;
    trainingList?: ResponceTrainingList;
    selectedTrainingName?: string;
    selectData?: { value: string; label: string }[];
    date?: string;
    isPast?: boolean;
};

export const TrainingForm = ({
    dateUTC,
    closeForm,
    closeModalCell,
    trainingList,
    selectedTrainingName,
    selectData,
    date,
    isPast,
}: Props) => {
    const screens = useBreakpoint();

    const [form] = Form.useForm();
    const currentTrainingName = Form.useWatch('name', form);

    const selectTraining = (trainingName: string | undefined) => {
        setCurrentTraining(
            trainingName ? trainingList?.filter((item) => item.name == trainingName)[0] : undefined,
        );
    };

    const [currentTraining, setCurrentTraining] = useState<ResponceTraining | undefined>();
    const [currentTrainingId, setCurrentTrainingId] = useState<string>();
    const [exercises, setExercises] = useState<ResponceExercise[] | undefined>();

    useEffect(() => {
        form.setFieldValue('name', selectedTrainingName);
        selectTraining(selectedTrainingName);
    }, []);

    useEffect(() => {
        selectTraining(currentTrainingName);
    }, [currentTrainingName]);

    useEffect(() => {
        setCurrentTrainingId(currentTraining?._id);
        setExercises(currentTraining?.exercises);

        if (!currentTraining?._id) {
            setDrawerTitle(
                <>
                    <PlusOutlined className='plus' />
                    Добавление упражнений
                </>,
            );
            form.setFieldsValue({ exercises: [''] });
        } else {
            setDrawerTitle(
                <>
                    <EditOutlined className='plus' />
                    Редактирование
                </>,
            );
            form.setFieldsValue({ exercises: currentTraining?.exercises });
        }
    }, [currentTraining]);

    const [loading, setLoading] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState(
        <>
            <PlusOutlined className='plus' />
            Добавление упражнений
        </>,
    );

    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const hideDrawer = () => {
        setOpenDrawer(false);

        const realExercises = form
            .getFieldValue('exercises')
            .filter((item: UserExercise) => item?.name);

        setExercises(realExercises);

        const realExercisesData = realExercises?.[0] ? realExercises : [''];
        form.setFieldsValue({ exercises: realExercisesData });
    };

    const [sendUserTraining, sendOptions] = useSendTrainingMutation();
    const sendLoading = sendOptions.isLoading;
    const sendTrainig = async (data: UserTraining) => {
        try {
            await sendUserTraining(data).unwrap();
            closeForm();
        } catch (err) {
            modalTrainingError({
                title: 'При сохранении данных произошла ошибка',
                content: 'Придётся попробовать ещё раз',
                className: 'send-trainig-error',
            });
            closeModalCell ? closeModalCell() : null;
        }
    };

    const [editUserTraining, editOptions] = useEditTrainingMutation();
    const editLoading = editOptions.isLoading;
    const editTrainig = async (data: UserEditTraining) => {
        try {
            await editUserTraining(data).unwrap();
            closeForm();
        } catch (err) {
            modalTrainingError({
                title: 'При сохранении данных произошла ошибка',
                content: 'Придётся попробовать ещё раз',
                className: 'send-trainig-error',
            });
            closeModalCell ? closeModalCell() : null;
        }
    };

    const saveTraining = () => {
        if (currentTrainingId) {
            setLoading(editLoading);
            editTrainig({ trainingId: currentTrainingId, trainingData: form.getFieldsValue() });
        } else {
            setLoading(sendLoading);
            sendTrainig(form.getFieldsValue());
        }
    };

    return (
        <div data-test-id='modal-create-exercise'>
            <Form form={form} name='training' className='modal-cell-form' onFinish={saveTraining}>
                <AntdFormItem name={'isImplementation'} initialValue={isPast} hidden />
                <AntdFormItem name={'date'} initialValue={dateUTC} hidden />
                <div className='ant-modal-header'>
                    <button
                        type='button'
                        className='ant-modal-close button-back'
                        onClick={closeForm}
                        data-test-id='modal-exercise-training-button-close'
                    >
                        <ArrowLeftOutlined />
                    </button>
                    <AntdFormItem name='name'>
                        <Select
                            options={selectData}
                            placeholder='Выбор типа тренировки'
                            data-test-id='modal-create-exercise-select'
                        />
                    </AntdFormItem>
                </div>

                <div className='ant-modal-body scrolled'>
                    {exercises?.[0] ? (
                        <ul className='training-list'>
                            {exercises.map((item: UserExercise, index) => (
                                <TrainingListItem
                                    text={item.name}
                                    key={index}
                                    edit={showDrawer}
                                    disabled={item.isImplementation}
                                    dataTestId={`modal-update-training-edit-button${index}`}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className='no-content'>
                            <Empty
                                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                description=''
                            ></Empty>
                        </div>
                    )}
                </div>

                <div className='ant-modal-footer'>
                    <AntdButton type='default' onClick={showDrawer} disabled={!currentTrainingName}>
                        Добавить упражнения
                    </AntdButton>
                    <AntdFormItem>
                        <AntdButton
                            type='link'
                            className='save-button'
                            htmlType='submit'
                            disabled={!exercises?.[0]}
                        >
                            {loading && <LoadingOutlined />}
                            {currentTrainingId ? 'Сохранить изменения' : 'Сохранить'}
                        </AntdButton>
                    </AntdFormItem>
                </div>
                <Drawer
                    title={drawerTitle}
                    onClose={hideDrawer}
                    open={openDrawer}
                    mask={false}
                    className='drawer training-form-drawer'
                    width={408}
                    placement={screens.md ? 'right' : 'bottom'}
                    height={screens.md ? '' : '85vh'}
                    data-test-id='modal-drawer-right'
                    closeIcon={
                        <span data-test-id='modal-drawer-right-button-close'>
                            <CloseOutlined />
                        </span>
                    }
                >
                    <Space className='training-info'>
                        <AntdBadge
                            type={currentTrainingName as BadgeType}
                            text={currentTrainingName}
                        />
                        <span>{date}</span>
                    </Space>
                    <TrainingFormList edit={Boolean(currentTrainingId)} form={form} />
                </Drawer>
            </Form>
        </div>
    );
};
