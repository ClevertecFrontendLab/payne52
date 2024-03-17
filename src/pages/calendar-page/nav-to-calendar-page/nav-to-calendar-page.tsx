import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom';
import { CalendarTwoTone } from '@ant-design/icons';
import { ModalError500 } from '@components/modals';
import { Paths } from '@constants/paths';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { selectTrainingUpdate } from '@redux/trainingSlice';
import { useGetTrainingMutation } from '@services/training';
import { Button } from 'antd';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

type Props = {
    type?: 'button' | undefined;
};

export const NavToCalendarPage = ({ type }: Props) => {
    const screens = useBreakpoint();

    const [error500, setError500] = useState(false);
    const closeError500 = () => {
        setError500(false);
    };

    const [getUserTraining] = useGetTrainingMutation({
        fixedCacheKey: 'training-mutation',
    });
    const getTraining = async () => {
        try {
            await trackPromise(getUserTraining().unwrap());
            history.push(Paths.CALENDAR);
        } catch (err) {
            setError500(true);
        }
    };

    const click = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        getTraining();
    };

    const update = useAppSelector((state) => selectTrainingUpdate(state));
    useEffect(() => {
        if (update) {
            getTraining();
        }
    }, [update]);

    return (
        <>
            {type == 'button' ? (
                <Button type='text' onClick={(e) => click(e)} data-test-id='menu-button-calendar'>
                    <CalendarTwoTone />
                    Календарь
                </Button>
            ) : (
                <Link to={Paths.CALENDAR} onClick={(e) => click(e)}>
                    Календарь
                </Link>
            )}

            <ModalError500
                open={error500}
                desktopSize={screens.md}
                close={closeError500}
                dataTestId='modal-no-review'
            />
        </>
    );
};
