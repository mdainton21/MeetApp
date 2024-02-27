Feature: Show/Hide an event details
    Scenario: An event element is collapsed by default.
        Given the main page is open
        When the app displays the event list
        Then event element details will be hidden

    Scenario: User can expand an event to see details.
        Given the event details are hidden
        When user clicks on the event details button
        Then the app should display that event's details

    Scenario: User can collapse an event to hide details.
        Given an event's details are being displayed
        When the user clicks on the hide details button
        Then the app should hide that event's details