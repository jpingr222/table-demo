import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
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
  const [modalId, setModalId] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleModalDisplay = (isVisible: boolean, dataId?: string): void => {
    setShowModal(isVisible);
    setModalId(dataId);
  };

  const handlePagination = (newPage: number): void => {
    setCurrentPage(newPage);
  }

  return questions && results ? (
    <div className="App container-fluid">
      <Pagination
        currentPage={currentPage}
        totalPage={10}
        onClick={handlePagination} />
      <div style={{overflowX: 'auto', width: '100%', height: 'calc(100vh - 1.5rem)'}}>
        <Table
          head={questions}
          body={results.slice(10*currentPage-10, 10*currentPage)}
          handleModalDisplay={handleModalDisplay} />
      </div>
      {modalId && (
        <Modal
          id="modal"
          question={questions}
          result={results.filter(r => r.id === modalId)[0]}
          visible={showModal}
          handleVisibility={handleModalDisplay} />
      )}
    </div>
  ) : <div></div>;
}

export default App;
