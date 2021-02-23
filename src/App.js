import './App.scss';
import React, { useState } from 'react';


const App = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const getJoke = () => {
    setLoading(true);
    const url = 'https://official-joke-api.appspot.com/random_joke';
    fetch(url).then((res) => res.json())
      .then((data) => {
        setShowPunchline(false);
        setJoke(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  return (
    <div className="App">
      <div className="headerContainer">
        <button onClick={getJoke}>Get A New Random Joke</button>
        <a href="https://github.com/15Dkatz/official_joke_api" target="_blank" rel="noreferrer">View API Docs</a>
      </div>

      <div>

        {loading &&
          <div className="loadingContainer">
            <h2>Loading Your Joke...</h2>
          </div>
        }

        <div className="jokeContainer">
          {joke &&
            <div>
              <i className="fas fa-quote-left"></i>
              <p>{joke.setup}</p>
            </div>
          }
          {(!showPunchline && joke) &&
            <div className="flex-center">
              <button onClick={() => setShowPunchline(true)}>Show Punchline</button>
            </div>
          }

          {showPunchline &&
            <div className="punchline">
              <div className="flex-center">
                <button onClick={() => setShowPunchline(false)}>Hide Punchline</button>
              </div>
              <div className="punchlineText">
                <p>{joke && joke.punchline}</p>
                <i className="fas fa-quote-right"></i>
              </div>
            </div>
          }
        </div>

        {error &&
          <div className="errorContainer flex-center">
            <p>There was an Error loading your joke.</p>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
