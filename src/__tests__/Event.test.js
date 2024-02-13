import { render } from "@testing-library/react";
import { getEvents } from "../api";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  })
  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  })

  test('renders event title', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  });

  test("shows event details when user clicks 'show details' button", async () => {
    const user = userEvent.setup();
    const showDetails = EventComponent.queryByText("show details");
    await user.click(showDetails);
    const details = EventComponent.container.querySelector('.details')
    expect(details).toBeInTheDocument();
  });

  test("hides event details when user clicks 'hide details' button", async () => {
    const user = userEvent.setup();
    const hideDetails = EventComponent.queryByText("hide details");
    await user.click(hideDetails);
    const details = EventComponent.container.querySelector('.details')
    expect(details).not.toBeInTheDocument();
  });

});
