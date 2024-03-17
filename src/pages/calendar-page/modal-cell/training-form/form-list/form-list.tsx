import { useEffect, useRef, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { AntdButton, AntdFormItem } from '@components/index';
import { UserExercise } from '@services/training';
import { Checkbox, Form, FormInstance, Input, InputNumber, Space } from 'antd';

import './from-list.scss';

export const TrainingFormList = ({ edit, form }: { edit?: boolean; form: FormInstance<any> }) => {
    const exercisesRef = useRef<null | HTMLDivElement>(null);
    const exercisesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        exercisesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [exercisesRef.current?.clientHeight]);

    const SuffixCheckbox = (fieldName: number, index: number) => {
        if (edit) {
            return (
                <AntdFormItem name={[fieldName, 'isImplementation']} valuePropName='checked'>
                    <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${index}`} />
                </AntdFormItem>
            );
        } else {
            return null;
        }
    };

    const exercises = Form.useWatch('exercises', form);
    const [exerciseToRemove, setExercisesToRemove] = useState([]);

    useEffect(() => {
        setExercisesToRemove(
            exercises
                ?.map((item: UserExercise, index: number) => (item.isImplementation ? index : null))
                .filter((item: number) => item != null),
        );
    }, [exercises]);

    return (
        <div className='form-list'>
            <Form.List name='exercises'>
                {(fields, { add, remove }) => (
                    <>
                        <div className='exercises scrolled'>
                            <div className='exercises-list' ref={exercisesRef}>
                                {fields.map((field, index) => (
                                    <div key={field.key} className='exercise'>
                                        <AntdFormItem shouldUpdate className='name'>
                                            {() => (
                                                <AntdFormItem
                                                    {...field}
                                                    name={[field.name, 'name']}
                                                >
                                                    <Input
                                                        placeholder='Упражнение'
                                                        addonAfter={SuffixCheckbox(
                                                            field.name,
                                                            index,
                                                        )}
                                                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                                                    ></Input>
                                                </AntdFormItem>
                                            )}
                                        </AntdFormItem>

                                        <Space size={0} className='numbers'>
                                            <AntdFormItem shouldUpdate className='replays'>
                                                {() => (
                                                    <AntdFormItem
                                                        {...field}
                                                        name={[field.name, 'replays']}
                                                        label='Подходы'
                                                    >
                                                        <InputNumber
                                                            addonBefore='+'
                                                            min={1}
                                                            placeholder='1'
                                                            data-test-id={`modal-drawer-right-input-approach${index}`}
                                                        />
                                                    </AntdFormItem>
                                                )}
                                            </AntdFormItem>
                                            <AntdFormItem shouldUpdate>
                                                {() => (
                                                    <AntdFormItem
                                                        {...field}
                                                        name={[field.name, 'weight']}
                                                        label='Вес, кг'
                                                    >
                                                        <InputNumber
                                                            min={0}
                                                            placeholder='0'
                                                            data-test-id={`modal-drawer-right-input-weight${index}`}
                                                        />
                                                    </AntdFormItem>
                                                )}
                                            </AntdFormItem>
                                            <span className='multiply'>X</span>
                                            <AntdFormItem shouldUpdate>
                                                {() => (
                                                    <AntdFormItem
                                                        {...field}
                                                        name={[field.name, 'approaches']}
                                                        label='Количество'
                                                    >
                                                        <InputNumber
                                                            min={1}
                                                            placeholder='3'
                                                            data-test-id={`modal-drawer-right-input-quantity${index}`}
                                                        />
                                                    </AntdFormItem>
                                                )}
                                            </AntdFormItem>
                                        </Space>
                                    </div>
                                ))}
                            </div>
                            <div ref={exercisesEndRef} />
                        </div>

                        <Space className='form-list-nav'>
                            <AntdButton
                                type='link'
                                onClick={() => add({ isImplementation: false })}
                                block
                                icon={<PlusOutlined />}
                                className='add-more'
                            >
                                Добавить ещё
                            </AntdButton>
                            {edit && (
                                <AntdButton
                                    type='text'
                                    onClick={() => remove(exerciseToRemove)}
                                    block
                                    icon={<MinusOutlined />}
                                    className='remove'
                                    disabled={!exerciseToRemove?.length}
                                >
                                    Удалить
                                </AntdButton>
                            )}
                        </Space>
                    </>
                )}
            </Form.List>
        </div>
    );
};
