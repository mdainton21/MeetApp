import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within, screen, getByTestId } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from "../components/NumberOfEvents";

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

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {


    test('Display Thirty-Two events by default.', ({ given, when, then }) => {

        let AppComponent
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the app displays the event list', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        then('Thirty-Two events should be displayed', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can change the number of events shown.', ({ given, when, then }) => {

        let AppComponent;
        given('the main page is open', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('the user inputs a number of events', async () => {
            const numberbox = screen.getByTestId("numberOfEventsInput");
            await userEvent.type(numberbox, '{backspace}{backspace}10');
            expect(numberbox.value).toBe('10');
        });

        then('the app should display the amount of events the user specified', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);

            });

        });
    });
});