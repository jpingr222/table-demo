import styled from "styled-components";
import { TableHead, TableBody } from "../../types";
import { getPreviewQuestions, getPreviewResults } from "../../utils/dataTransformer";
import TableBodyRow from "./TableBodyRow";

const StyledTable = styled.table`
  display: table;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: 0;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
`;

const StyledTheadTh = styled.th`
  display: table-cell;
  vertical-align: middle;
  font-weight: bold;
  background-color: #ffc107;
  text-align: start;
  width: 150px;
  position: sticky;
  top: 0;
  border-top: 1px solid #495057;
  border-bottom: 1px solid #495057;
  border-right: 1px solid #495057;

  &:first-child {
    border-left: 1px solid #495057;
  }

  & > div {
    width: 100%;
    line-height: 21px;
    height: 84px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export interface TableProps {
  head: TableHead[];
  body: TableBody[];
  handleModalDisplay: (isVisible: boolean, dataId?: string) => void;
}

export default function Table({ head, body, handleModalDisplay }: TableProps) {
  const prevQue: TableHead[] = getPreviewQuestions(head);
  const prevRes: TableBody[] = getPreviewResults(body);

  const thead = (
    <tr>
      <StyledTheadTh scope="col" />
      {prevQue.map(({ id, name }) => {
        return (
          <StyledTheadTh key={id} scope="col">
            <div>{name}</div>
          </StyledTheadTh>
        );
      })}
      <StyledTheadTh>See More</StyledTheadTh>
    </tr>
  );

  const tbody = prevRes.map(result => {
    return (
      <TableBodyRow
        key={result.id}
        result={result}
        handleModalDisplay={handleModalDisplay} />
    );
  });

  return (
    <StyledTable>
      <thead>{thead}</thead>
      <tbody>{tbody}</tbody>
    </StyledTable>
  );
};
