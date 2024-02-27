/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';

const mockConsoleMethod = (realConsoleMethod) => {
    const ignoredMessages = [
        'test was not wrapped in act(...)',
    ]

    return (message, ...args) => {
        const containsIgnoredMessage = ignoredMessages.some(ignoredMessage => message.includes(ignoredMessage))

        if (!containsIgnoredMessage) {
            realConsoleMethod(message, ...args)
        }
    }
}

console.warn = jest.fn(mockConsoleMethod(console.warn))
console.error = jest.fn(mockConsoleMethod(console.error))

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        
        let AppComponent
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the app displays the event list', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        then('event element details will be hidden', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('.details')
            expect(details).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        
        let EventComponent;
        let allEvents;
        given('the event details are hidden', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        });

        when('user clicks on the event details button', async () => {
            const showDetails = EventComponent.queryByText('Show Details');
            const user = userEvent.setup();
            await user.click(showDetails);
            
        });

        then('the app should display that event\'s details', () => {
            const details = EventComponent.container.querySelector('.details')
            expect(details).toBeInTheDocument();
            
        });
    });

    test('User can collapse an event to hide details.', ({ given, when, then }) => {

        let EventComponent;
        let allEvents;
        given('an event\'s details are being displayed', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            const showDetails = EventComponent.queryByText('Show Details');
            const user = userEvent.setup();
            await user.click(showDetails);
            const details = EventComponent.container.querySelector('.details')
            expect(details).toBeInTheDocument();
        });

        when('the user clicks on the hide details button', async () => {
            const hideDetails = EventComponent.queryByText('Hide Details');
            const user = userEvent.setup();
            await user.click(hideDetails);
        });

        then('the app should hide that event\'s details', () => {
            const details = EventComponent.container.querySelector('.details')
            expect(details).not.toBeInTheDocument();
        });
    });
});