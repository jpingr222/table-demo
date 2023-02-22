import { render, screen, within } from "@testing-library/react";
import { TableBody, TableHead } from "../../types";
import Table from "./Table";

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


describe('Table', () => {
  it('should have correct number of rows', () => {
    render(<Table head={expectQuestions} body={expectResults} />);

    const rows = screen.getAllByRole('row');
    const headAndBodyRows = expectResults.length + 1;

    expect(rows.length).toEqual(headAndBodyRows);
  });

  it('should have correct number of column headers', () => {
    render(<Table head={expectQuestions} body={expectResults} />);

    const colHeads = screen.getAllByRole('columnheader');
    const idAndHeaders = expectQuestions.length + 1;

    expect(colHeads.length).toEqual(idAndHeaders);
  });

  it('should have row headers for every row', () => {
    render(<Table head={expectQuestions} body={expectResults} />);

    const rowHeads = screen.getAllByRole('rowheader');

    expect(rowHeads.length).toEqual(expectResults.length);
  });

  it('should have correct number of cells in every row', () => {
    render(<Table head={expectQuestions} body={expectResults} />);

    const colNum = expectQuestions.length;
    const rows = screen.getAllByRole('row').slice(1);

    rows.forEach(row => {
      const cells = within(row).getAllByRole('cell');
      expect(cells.length).toEqual(colNum);
    });
  });
});
