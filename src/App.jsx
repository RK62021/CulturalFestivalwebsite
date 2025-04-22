import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import sampleResponse from "./format.js";
import { ClipLoader } from "react-spinners";

function App() {
  const [states, setStates] = useState([]);
  const [isclicked, setIsClicked] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [events, setEvents] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "AIzaSyBwUDVwqzUmEzN43h6hrXvccpZnpm3MxQE";

  useEffect(() => {
    // Fetch states from Google API
    async function fetchStates() {
      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
            apiKey,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: "List all 28 states of India separated by commas.",
                    },
                  ],
                },
              ],
            }),
          }
        );
        const data = await response.json();

        // console.log(data.candidates[0].content.parts[0].text);
        // Parse the response to get the states
        const statesList = data.candidates[0].content.parts[0].text
          .split(",")
          .map((state) => state.trim())
          .map((state, index) => ({ id: index + 1, name: state }));

        setStates(statesList);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    }
    fetchStates();
  }, []);

  useEffect(() => {
    // Fetch events based on selected state
    async function fetchEvents() {
      if (selectedState) {
        try {
          // Fetch events from Google API
          // Replace with your actual API endpoint and logic to fetch events
          // For demonstration, we are using the same API as above
          const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
              apiKey,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: ` cultural events in ${selectedState} 
                        format: ${JSON.stringify(sampleResponse)}
                        response in json format`,
                      },
                    ],
                  },
                ],
              }),
            }
          );
          const data = await response.json();
          console.log(data);
          const responseText = data.candidates[0].content.parts[0].text;
          // Parse the response to get the events
          let cleanerResponse = responseText.replace(/```json/g, "").trim();
          cleanerResponse = cleanerResponse.replace(/```/g, "");

          // console.log(cleanerResponse);
          const parsedResponse = JSON.parse(cleanerResponse);
          console.log(parsedResponse);

          setEvents(parsedResponse);
          setLoading(false);

          // setEvents(cleanerResponse);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    }
    fetchEvents();
  }, [selectedState]);

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen pb-20">
        <section>
          <div className="flex flex-col items-center h-md bg-gray-100 pt-5">
            <p className="text-gray-700 mb-4 font-bold px-4 text-center">
              Discover the Rich Cultural Heritage of India. <br />
              This is a simple web application to track cultural events.
            </p>
            <div className="flex flex-col items-center w-full">
              <div className="flex space-x-4 mb-6">
                <select
                  className="p-2 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-300 hover:scale-105 font-bold"
                onClick={() => {
                  if (selectedState) {
                    setLoading(true);
                    setIsClicked(true);
                  } else {
                    alert("Please select a state");
                  }
                }}
              >
                View cultural Events
              </button>
            </div>
          </div>
        </section>
        <section className="mt-10 mx-auto p-5">
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader color="#4A90E2" loading={loading} size={50} />
            </div>
          ) : (
            isclicked &&
            events && (
              <div className="bg-gray-200 p-5 rounded-md shadow-md min-h-screen max-w-lg overflow-x-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                <h2 className="text-center text-2xl font-medium mb-4 font-bold">
                  Cultural Events
                </h2>
                <p className="text-start text-lg ">{events.description}</p>
                <h3 className="text-lg font-medium mt-4 font-bold">
                  Festivals:
                </h3>
                <ul className="list-disc list-inside">
                  {events.festivals.map((festival, index) => (
                    <li key={index} className="text-start text-md mb-2">
                      <span className="font-bold">{festival.name}</span>:{" "}
                      <span className="font-light">{festival.description}</span>
                      <span className="font-medium"> {festival.Date}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-medium mt-4 font-extrabold pt-4">
                  Dance and Music:
                </h3>
                <h4 className="text-md font-medium mt-2 font-bold">
                  Classical:
                </h4>
                <ul className="list-disc list-inside">
                  {events.danceAndMusic.classical?.map((dance, index) => (
                    <li key={index} className="text-start text-md mb-2">
                      <span className="font-bold">{dance.name}</span>:{" "}
                      <span className="font-light">{dance.description}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-md font-medium mt-2 font-bold">Folk:</h4>
                <ul className="list-disc list-inside">
                  {events.danceAndMusic.folkDances.map((dance, index) => (
                    <li key={index} className="text-start text-md mb-2">
                      <span className="font-bold">{dance.name}</span>:{" "}
                      <span className="font-light">{dance.description}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-md font-medium mt-2 font-bold">Music:</h4>
                <p className="">{events.danceAndMusic.music}</p>

                {/* Theater and Drama */}
                <h3 className="text-lg font-medium mt-4 font-bold">
                  Theater and Drama:
                </h3>
                <ul className="list-disc list-inside">
                  {events.theaterAndDrama.map((art, index) => (
                    <li key={index} className="text-start text-md mb-2">
                      <span className="font-bold">{art.name}</span>:{" "}
                      <span className="font-light">{art.description}</span>
                    </li>
                  ))}
                </ul>

                {/* Important places to visit */}
                <h4 className="text-md font-large mt-2 font-bold">
                  Important Places to Visit:
                </h4>
                <ul className="list-disc list-inside">
                  {events.importantPlaces.map((place, index) => (
                    <li key={index} className="text-start text-md mb-2">
                      <span className="">{place}</span>{" "}
                    </li>
                  ))}
                </ul>

                {/* tips for event */}
                <h3 className="text-lg font-bold  ">Tips</h3>
                <ul className="list-disc list-inside">
                  {events.tips.map((tip, index) => (
                    <li key={index} className="text-start text-md mb-2">
                      <span className="">{events.tips[index]}</span>:{" "}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
