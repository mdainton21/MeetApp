import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from "../components/NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
  })

  test("contains element with role 'textbox'", () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
  });

  test('32 events are rendered as default', () => {
    expect(NumberOfEventsComponent.queryByRole('textbox')).toHaveValue('32');
  });

  test('value of number of events updates correctly when user types in textbox', async () => {
    const numberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
    await userEvent.type(numberOfEvents, '{backspace}{backspace}10');
    expect(numberOfEvents.value).toBe('10');
  });

})