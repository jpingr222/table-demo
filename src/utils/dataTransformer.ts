import { SurveyResult, SurveySchema, TableHead, TableBody, TableData } from "../types";

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

export const surveyResultsTransformer = (results: SurveyResult[]): TableBody[] => {
  return results.map(r => {
    const {ResponseId, ...result} = r;
    const twoAnswersToOneQuestion: TableData[] = [];

    Object.entries(result).forEach(([key, value]) => {
      const re = /HaveWorkedWith|WantToWorkWith|Professional use|Personal use/;
      const questionId = key.replace(re, '');

      if (twoAnswersToOneQuestion.length > 0 && twoAnswersToOneQuestion.slice(-1)[0].headId === questionId) {
        twoAnswersToOneQuestion.slice(-1)[0].data = [twoAnswersToOneQuestion.slice(-1)[0].data, value] as string[];
      } else {
        twoAnswersToOneQuestion.push({ headId: questionId, data: value });
      }
    });

    return { id: ResponseId, content: twoAnswersToOneQuestion };
  });
}

export const getPreviewQuestions = (questions: TableHead[]): TableHead[] => {
  return questions.slice(0, PREVIEW_COLUMN_NUMBER);
}

export const getPreviewResults = (results: TableBody[]): TableBody[] => {
  return results.map(row => {
    return {
      id: row.id,
      content: row.content.slice(0, 10)
    };
  });
}
