import {
  surveyQuestionsTransformer,
  surveyResultsTransformer,
  getPreviewQuestions
} from "./dataTransformer";
import { SurveyResult, SurveySchema, TableBody, TableHead } from "../types";
import originalReult from './../data/survey_results_data_part.json';

const testQuestions: SurveySchema[] = [
  {
    qid: 'QID16',
    qname: 'S0',
    question: '<div><span style="font-size:19px;"><strong>Hello world! </strong></span></div>\n\n<div> </div>\n\n<div>Thank you for taking the 2022 Stack Overflow Developer Survey, the longest running survey of software developers (and anyone else who codes!) on Earth. </div>\n\n<div> </div>\n\n<div>As in previous years, anonymized results of the survey will be made publicly available under the Open Database License, where anyone can download and analyze the data. On that note, throughout the survey, certain answers you and your peers give will be treated as personally identifiable information, and therefore kept out of the anonymized results file. We\'ll call out each of those in the survey with a note saying "This information will be kept private." </div>\n\n<div> </div>\n\n<div>There are seven sections in this survey. The 2nd, 3rd, and 4th sections will appear in a random order.</div><div><br></div>\n\n<div>   1. Basic Information</div>\n\n<div>   2. Education, Work, and Career</div>\n\n<div>   3. Technology and Tech Culture</div>\n\n<div>   4. Stack Overflow Usage + Community</div>\n\n<div>   5. Demographic Information </div>\n\n<div>   6. Professional Developer Series (Optional)</div><div>   7. Final Questions</div>\n\n<div> \n<div>Most questions in this survey are optional. Required questions are marked with *. This anonymous survey will take about 10 minutes to complete. We encourage you to complete it in one sitting.</div><div><br></div>\n</div>\n\n<div><strong>If you use security or ad-blocking plugins, you may see error messages</strong></div>\n\n<div>Our third-party software provider, Qualtrics, does not work well with certain ad blockers and security software. To avoid error messages that prevent you from taking the survey, please try specifically unblocking Qualtrics in your plugin or pausing the plugin while you take the survey. </div>\n\n<div> </div>\n\n<div>To begin, click <strong>Next.</strong></div>',
    force_resp: 'FALSE',
    type: 'DB',
    selector: 'TB'
  },
  {
    qid: 'QID12',
    qname: 'MetaInfo',
    question: 'Browser Meta Info',
    force_resp: 'FALSE',
    type: 'Meta',
    selector: 'Browser'
  },
  {
    qid: 'QID2',
    qname: 'MainBranch',
    question: 'Which of the following options best describes you today? Here, by "developer" we mean "someone who writes code." <b>*</b>',
    force_resp: 'TRUE',
    type: 'MC',
    selector: 'SAVR'
  },
  {
    qid: 'QID296',
    qname: 'Employment',
    question: 'Which of the following best describes your current employment status?',
    force_resp: 'FALSE',
    type: 'MC',
    selector: 'MAVR'
  },
  {
    qid: 'QID308',
    qname: 'RemoteWork',
    question: 'Which best describes your current work situation?',
    force_resp: 'FALSE',
    type: 'MC',
    selector: 'SAVR'
  }
];

const testResults = [
  { ResponseId: '7', MainBranch: 'I code primarily as a hobby', Employment: 'Student, part-time', RemoteWork: 'NA' },
  { ResponseId: '8', MainBranch: 'I am a developer by profession', Employment: 'Not employed, but looking for work', RemoteWork: 'NA' },
  { ResponseId: '12', MainBranch: 'I am not primarily a developer, but I write code sometimes as part of my work', Employment: 'Employed, full-time;Independent contractor, freelancer, or self-employed', RemoteWork: 'Fully remote' },
  { ResponseId: '20', MainBranch: 'I am learning to code', Employment: 'Student, full-time', RemoteWork: 'NA' },
  { ResponseId: '31', MainBranch: 'None of these', Employment: 'NA', RemoteWork: 'NA' },
] as SurveyResult[];

const expectQuestions: TableHead[] = [
  {
    id: 'MainBranch',
    name: 'Which of the following options best describes you today? Here, by "developer" we mean "someone who writes code." <b>*</b>',
  },
  {
    id: 'Employment',
    name: 'Which of the following best describes your current employment status?',
  },
  {
    id: 'RemoteWork',
    name: 'Which best describes your current work situation?',
  }
];

const expectResults: TableBody[] = [
  { id: '7', content: [{ headId: 'MainBranch', data: 'I code primarily as a hobby' }, { headId: 'Employment', data: 'Student, part-time' }, { headId: 'RemoteWork', data: 'NA' }] },
  { id: '8', content: [{ headId: 'MainBranch', data: 'I am a developer by profession' }, { headId: 'Employment', data: 'Not employed, but looking for work' }, { headId: 'RemoteWork', data: 'NA' }] },
  { id: '12', content: [{ headId: 'MainBranch', data: 'I am not primarily a developer, but I write code sometimes as part of my work' }, { headId: 'Employment', data: 'Employed, full-time;Independent contractor, freelancer, or self-employed' }, { headId: 'RemoteWork', data: 'Fully remote' }] },
  { id: '20', content: [{ headId: 'MainBranch', data: 'I am learning to code' }, { headId: 'Employment', data: 'Student, full-time' }, { headId: 'RemoteWork', data: 'NA' }] },
  { id: '31', content: [{ headId: 'MainBranch', data: 'None of these' }, { headId: 'Employment', data: 'NA' }, { headId: 'RemoteWork', data: 'NA' }] }
];

const testQuestionsMore: TableHead[] = [
  { id: 'MainBranch', name: 'Which of the following options best describes you today? Here, by \"developer\" we mean \"someone who writes code.\" <b>*</b>' },
  { id: 'Employment', name: 'Which of the following best describes your current employment status?' },
  { id: 'RemoteWork', name: 'Which best describes your current work situation?' },
  { id: 'CodingActivities', name: 'Which of the following best describes the code you write outside of work? Select all that apply.' },
  { id: 'EdLevel', name: 'Which of the following best describes the highest level of formal education that you’ve completed? *' },
  { id: 'LearnCode', name: 'How did you learn to code? Select all that apply.' },
  { id: 'LearnCodeOnline', name: 'What online resources do you use to learn to code? Select all that apply.' },
  { id: 'LearnCodeCoursesCert', name: 'What online courses or certifications do you use to learn to code? Select all that apply.' },
  { id: 'YearsCode', name: 'Including any education, how many years have you been coding in total?' },
  { id: 'YearsCodePro', name: 'NOT including education, how many years have you coded professionally (as a part of your work)?' },
  { id: 'DevType', name: 'Which of the following describes your current job? Please select all that apply.' }
];

const expectQuestionsMore: TableHead[] = [
  { id: 'MainBranch', name: 'Which of the following options best describes you today? Here, by \"developer\" we mean \"someone who writes code.\" <b>*</b>' },
  { id: 'Employment', name: 'Which of the following best describes your current employment status?' },
  { id: 'RemoteWork', name: 'Which best describes your current work situation?' },
  { id: 'CodingActivities', name: 'Which of the following best describes the code you write outside of work? Select all that apply.' },
  { id: 'EdLevel', name: 'Which of the following best describes the highest level of formal education that you’ve completed? *' },
  { id: 'LearnCode', name: 'How did you learn to code? Select all that apply.' },
  { id: 'LearnCodeOnline', name: 'What online resources do you use to learn to code? Select all that apply.' },
  { id: 'LearnCodeCoursesCert', name: 'What online courses or certifications do you use to learn to code? Select all that apply.' },
  { id: 'YearsCode', name: 'Including any education, how many years have you been coding in total?' },
  { id: 'YearsCodePro', name: 'NOT including education, how many years have you coded professionally (as a part of your work)?' }
];

const expectPreviewResults: TableBody[] = [
  { id: '7', content: [{ headId: 'MainBranch', data: 'I code primarily as a hobby' }, { headId: 'Employment', data: 'Student, part-time' }, { headId: 'RemoteWork', data: 'NA' }] },
  { id: '8', content: [{ headId: 'MainBranch', data: 'I am a developer by profession' }, { headId: 'Employment', data: 'Not employed, but looking for work' }, { headId: 'RemoteWork', data: 'NA' }] },
  { id: '12', content: [{ headId: 'MainBranch', data: 'I am not primarily a developer, but I write code sometimes as part of my work' }, { headId: 'Employment', data: 'Employed, full-time;Independent contractor, freelancer, or self-employed' }, { headId: 'RemoteWork', data: 'Fully remote' }] },
  { id: '20', content: [{ headId: 'MainBranch', data: 'I am learning to code' }, { headId: 'Employment', data: 'Student, full-time' }, { headId: 'RemoteWork', data: 'NA' }] },
  { id: '31', content: [{ headId: 'MainBranch', data: 'None of these' }, { headId: 'Employment', data: 'NA' }, { headId: 'RemoteWork', data: 'NA' }] }
];

describe('dataProcessor', () => {
  describe('surveyQuestionsTransformer', () => {
    it('should filter out non-question contents from survey schema', () => {
      const actual = surveyQuestionsTransformer(testQuestions);

      expect(actual.length).toEqual(3);
    });

    it('should transform survey questions correctly', () => {
      const actual = surveyQuestionsTransformer(testQuestions);

      expect(actual).toEqual(expectQuestions);
    });
  });

  describe('surveyResultsTransformer', () => {
    it('should transform survey results correctly', () => {
      const actual = surveyResultsTransformer(testResults);

      expect(actual).toEqual(expectResults);
    });

    it('should combine some fields to one field as they are same question', () => {
      const actual = surveyResultsTransformer(originalReult);
      expect(actual[0].content.length).toEqual(57);
    });
  });

  describe('getPreviewQuestions', () => {
    it('should return first 10 questions', () => {
      const actual = getPreviewQuestions(testQuestionsMore);

      expect(actual.length).toEqual(10);
      expect(actual).toEqual(expectQuestionsMore);
    });

    it('should return all questions when less than 10 questions', () => {
      const actual = getPreviewQuestions(expectQuestions);

      expect(actual.length).toEqual(3);
      expect(actual).toEqual(expectQuestions);
    });
  });

  describe('getPreviewResults', () => {
    it('', () => {});
  });
});
