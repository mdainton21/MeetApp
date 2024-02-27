Feature: Specify Number of Events
    Scenario: Display Thirty-Two events by default.
        Given the main page is open
        When the app displays the event list
        Then Thirty-Two events should be displayed

    Scenario: User can change the number of events shown.
        Given the main page is open
        When the user inputs a number of events
        Then the app should display the amount of events the user specified