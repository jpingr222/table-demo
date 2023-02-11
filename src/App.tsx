import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Table from './components/Table';
import logo from './logo.svg';
import { TableBody, TableHead } from './types';
import { getSurveyQuestions, getSurveyResults } from './utils/api';
import {
  surveyQuestionsTransformer,
  surveyResultsTransformer
} from './utils/dataTransformer';

function App() {
  const [questions, setQuestions] = useState<TableHead[] | null>(null);
  const [results, setResults] = useState<TableBody[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const [q, r] = await Promise.all([
        getSurveyQuestions(),
        getSurveyResults()
      ]);
      setQuestions(surveyQuestionsTransformer(q));
      setResults(surveyResultsTransformer(r));
    })();
  }, []);

  const handleModalDisplay = (isVisible: boolean): void => {
    setShowModal(isVisible);
  };

  return questions && results ? (
    <div className="App container-fluid">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button onClick={() => handleModalDisplay(true)}>MODAL TEST</button>
      <div style={{overflowX: 'auto', width: '100%', height: 'calc(100vh - 1.5rem)'}}>
        <Table head={questions} body={results} />
      </div>
      <Modal
        id="modal"
        question={questions}
        result={results[7]}
        visible={showModal}
        handleVisibility={handleModalDisplay} />
    </div>
  ) : <div></div>;
}

export default App;
