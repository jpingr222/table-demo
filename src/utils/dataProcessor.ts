import { SurveyResult, SurveySchema, TableHead, TableBody } from "../types";

export const getPureQuestions = (questions: SurveySchema[]): TableHead[] => {
  const filterQuestion = questions.filter(q => !/S\d+|MetaInfo/.test(q.qname));
  return filterQuestion.map(q => {
    return {
      id: q.qname,
      name: q.question
    };
  });
}

export const getGeneralQuestions = (questions: SurveySchema[]): TableHead[] => {
  // const general = ['Age', 'Gender', 'Trans', 'Sexuality', 'Ethnicity', 'Accessibility', 'MentalHealth', 'WorkExp'];
  return getPureQuestions(questions).slice(0, 10);
}

export const getProcessedResults = (results: SurveyResult[]): TableBody[] => {
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
