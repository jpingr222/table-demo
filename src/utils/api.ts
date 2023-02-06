import questions from '../data/survey_results_schema.json';
import results from '../data/survey_results_data_part.json';
import { SurveyResult, SurveySchema } from "../types";

export const getSurveyQuestions = (): Promise<SurveySchema[]> => {
  return Promise.resolve(questions);
};

export const getSurveyResults = (): Promise<SurveyResult[]> => {
  return Promise.resolve(results);
};
