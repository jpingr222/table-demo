import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe('Button test', () => {
  it('should render an empty button correctly', () => {
    render(<Button></Button>);

    const button: HTMLButtonElement = screen.getByRole('button');

    expect(button).toMatchSnapshot();
  });

  it('should render a button with correct style', () => {
    render(<Button theme="close"></Button>);

    const button: HTMLButtonElement = screen.getByRole('button');

    expect(button).toMatchSnapshot();
  });

  it('should render a button with text', () => {
    render(<Button>Button</Button>);

    const button: HTMLButtonElement = screen.getByRole('button');

    expect(button).toHaveTextContent('Button');
  });

  it('should render a button with text', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Button</Button>);

    const button: HTMLButtonElement = screen.getByRole('button');
    userEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });

});
