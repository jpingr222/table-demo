import styled, { ThemeProvider } from "styled-components"

const StyledButton = styled.button`
  font-size: ${({theme}) => theme.fontSize};
  line-height: ${({theme}) => theme.lineHeight};
  color: ${({theme}) => theme.color};
  display: inline-block;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${({theme}) => theme.backgroundColor};
  margin: 0;
  padding: ${({theme}) => theme.padding};
  border: ${({theme}) => theme.border};
  border-radius: 0.25rem;

  &:hover {
    color: ${({theme}) => theme.hoverColor};
    background-color: ${({theme}) => theme.hoverBackgroundColor};
  }
`;

const buttonTheme = {
  normal: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#2d3339',
    backgroundColor: '#fff',
    padding: '0.25rem 0.75rem',
    border: '1px solid #2d3339',
    hoverColor: '#fff',
    hoverBackgroundColor: '#2d3339'
  },
  close: {
    fontSize: '2.5rem',
    lineHeight: '1.5rem',
    color: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'transparent',
    padding: '0.25rem',
    border: '0',
    hoverColor: 'rgba(0, 0, 0, 0.6)',
    hoverBackgroundColor: 'transparent'
  }
};

export interface ButtonProps {
  theme?: 'normal' | 'close';
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  theme = 'normal',
  children,
  onClick
}: ButtonProps) {
  return (
    <ThemeProvider theme={buttonTheme[theme]}>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </ThemeProvider>
  );
}
