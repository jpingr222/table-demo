import styled from "styled-components";
import { TableBody, TableHead } from "../../types";

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
  background-color: #fff;
  margin: 1.5rem auto;
  width: 75%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
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
        <div className="modal-head">
          <h1 className="modal-title">Modal Title</h1>
          <button className="close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <h2>What is the first question?</h2>
          <p>The first answer.</p>
        </div>
      </ModalContent>
    </StyledModal>
  );
}