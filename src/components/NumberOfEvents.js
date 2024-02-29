import {useState} from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {

  const [query, setQuery] = useState("32");
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    setCurrentNOE(value);
  }

  return (
    <div id="number-of-events">
      <input
        data-testid="numberOfEventsInput"
        type="text"
        className="textboxNumber"
        value={query}
        onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;