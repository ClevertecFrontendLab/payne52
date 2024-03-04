import { useEffect, useRef, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import {
    AntdButton,
    AntdContent,
    FeedbacksAddFirstMessage,
    FeedbacksItem,
} from '@components/index';
import { ModalError500, ModalFeedbackForm } from '@components/modals';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectFeedbacksUpdate } from '@redux/feedbackSlice';
import { useGetFeedbacksMutation } from '@services/feedback';
import { Grid, List } from 'antd';
import classNames from 'classnames';

import './feedbacks-page.scss';

const { useBreakpoint } = Grid;

export const FeedbacksPage = () => {
    const [showFeedback, { data }] = useGetFeedbacksMutation({
        fixedCacheKey: 'feedbacks-mutation',
    });
    const sortedFeedbacks = data
        ?.slice()
        .sort((a, b) => (Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1));

    useEffect(() => {
        if (!data?.[0]) {
            getFeedback();
        }
    }, []);

    const update = useAppSelector((state) => selectFeedbacksUpdate(state));
    useEffect(() => {
        if (update) {
            getFeedback();
        }
    }, [update]);

    const [showAll, setShowAll] = useState(false);

    const [btnValue, setBtnValue] = useState('Развернуть');
    const togglePanel = () => {
        setBtnValue((prev) => (prev == 'Развернуть' ? 'Свернуть' : 'Развернуть'));
        setShowAll((prev) => !prev);
    };

    const feedbacksListRef = useRef<HTMLInputElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (feedbacksListRef.current) {
            setHeight(feedbacksListRef.current.clientHeight);
        }
    }, [data]);

    const [error500, setError500] = useState(false);
    const getFeedback = async () => {
        try {
            await trackPromise(showFeedback('').unwrap());
        } catch (err) {
            setError500(true);
        }
    };

    const screens = useBreakpoint();

    const pageContentClass = classNames({
        'feedbacks-page-content': true,
        center: !data?.[0],
    });

    const feedbacksAllItemsClass = classNames({
        'feedbacks-all-items': true,
        active: showAll,
    });

    const feedbacksNavigationClass = classNames({
        'feedbacks-navigation': true,
        center: !data?.[0],
    });

    return (
        <AntdContent className={pageContentClass}>
            {data?.[0] ? (
                <div
                    className='feedbacks-list'
                    ref={feedbacksListRef}
                    style={{ height: height ? height + 60 : '' }}
                >
                    <List className='feedbacks-first-items'>
                        {sortedFeedbacks?.slice(0, 4).map((feedback) => (
                            <li key={feedback.id} id={feedback.id}>
                                <FeedbacksItem itemData={feedback} />
                            </li>
                        ))}
                    </List>

                    <List className={feedbacksAllItemsClass}>
                        {sortedFeedbacks?.slice(4).map((feedback) => (
                            <li key={feedback.id} id={feedback.id}>
                                <FeedbacksItem itemData={feedback} />
                            </li>
                        ))}
                    </List>
                </div>
            ) : (
                <FeedbacksAddFirstMessage />
            )}

            <div className={feedbacksNavigationClass}>
                <ModalFeedbackForm desktopSize={screens.md} />

                {data?.[0] && (
                    <AntdButton
                        type='link'
                        className='toggle-button button'
                        onClick={togglePanel}
                        data-test-id='all-reviews-button'
                    >
                        {btnValue} все отзывы
                    </AntdButton>
                )}
            </div>

            <ModalError500 open={error500} desktopSize={screens.md} />
        </AntdContent>
    );
};
