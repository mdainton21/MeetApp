import {useState} from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

  const [query, setQuery] = useState("32");
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "The number must be at least 1."
    } else {
      errorText = ""
      setCurrentNOE(value);
    }
    setErrorAlert(errorText);
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