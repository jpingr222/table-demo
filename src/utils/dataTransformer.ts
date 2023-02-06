import { SurveyResult, SurveySchema, TableHead, TableBody } from "../types";

const PREVIEW_COLUMN_NUMBER: number = 10;

/**
 * Remove non-question contents from survey schema
 * @param questions SurveySchema[]
 * @returns TableHead[]
 */
export const surveyQuestionsTransformer = (questions: SurveySchema[]): TableHead[] => {
  const filterQuestion = questions.filter(q => !/S\d+|MetaInfo/.test(q.qname));
  return filterQuestion.map(q => {
    return {
      id: q.qname,
      name: q.question
    };
  });
}

export const getPreviewQuestions = (questions: SurveySchema[]): TableHead[] => {
  return surveyQuestionsTransformer(questions).slice(0, PREVIEW_COLUMN_NUMBER);
}

export const surveyResultsTransformer = (results: SurveyResult[]): TableBody[] => {
  return results.map(r => {
    const {ResponseId, ...result} = r;
    const resultKeyValue = Object.entries(result).map(([key, value]) => {
      return {
        headId: key,
        data: value
      };
    });
    return { id: ResponseId, content: resultKeyValue };
  });
}
