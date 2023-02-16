import styled from "styled-components";
import { TableBody } from "../../../types";

const StyledTbodyTr = styled.tr`
  &:nth-of-type(odd) {
    background-color: #ffeeba;
  }

  &:hover {
    background-color: #ffe9a8;
  }
`;

const StyledTbodyTh = styled.th`
  display: table-cell;
  vertical-align: middle;
  font-weight: bold;
  background-color: #ffc107;
  text-align: center;
  border-bottom: 1px solid #495057;
  border-left: 1px solid #495057;
  border-right: 1px solid #495057;
`;

const StyledTd = styled.td`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 1px solid #495057;
  border-right: 1px solid #495057;
  word-wrap: break-word;

  &.see-more:hover {
    cursor: pointer;
  }
`;

export interface TableBodyRowProps {
  result: TableBody;
  handleModalDisplay: (isVisible: boolean, dataId?: string) => void;
}

export default function TableBodyRow({
  result,
  handleModalDisplay
}: TableBodyRowProps) {
  const handleOnClick = (): void => {
    handleModalDisplay(true, result.id);
  }

  return (
    <StyledTbodyTr key={result.id}>
      <StyledTbodyTh scope="row">{result.id}</StyledTbodyTh>
      {result.content.map(({headId, data}) => {
        return <StyledTd key={headId}>{data}</StyledTd>
      })}
      <StyledTd className="see-more" onClick={handleOnClick}>...</StyledTd>
    </StyledTbodyTr>
  );
}
