import styled from "styled-components";
import { TableBody, TableHead } from "../../types";
import Button from "../Button";

interface StyledModalProps {
  readonly visible: boolean;
}

const StyledModal = styled.div.attrs<StyledModalProps>(props => ({
  tabIndex: -1,
  visible: props.visible || false
}))<StyledModalProps>`
  display: ${props => props.visible ? 'block' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 1.5rem auto;
  width: 75%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;

const ModalHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 1rem;

  & h2 {
    margin: 0;
    font-size: 1.25rem;
  }
`;

export interface ModalProps {
  id: string;
  question: TableHead[];
  result: TableBody;
  visible: boolean;
  handleVisibility: (newVisibility: boolean) => void;
}

export default function Modal({
  id,
  question,
  result,
  visible,
  handleVisibility
}: ModalProps) {
  if (visible) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '17px';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  const handleClose = (): void => {
    handleVisibility(false);
  }

  return (
    <StyledModal id={id} visible={visible} onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHead>
          <ModalTitle>Modal Title</ModalTitle>
          <Button theme="close" onClick={handleClose}>&times;</Button>
        </ModalHead>
        <ModalBody>
          {question.map((q, id) => {
            return (
              <div key={id}>
                <h2>{q.name}</h2>
                <p>{result.content[id].data}</p>
              </div>
            );
          })}
        </ModalBody>
      </ModalContent>
    </StyledModal>
  );
}
