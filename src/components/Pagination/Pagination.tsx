import styled, { ThemeProvider } from "styled-components";

const Ul = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
`;

const PageLink = styled.a`
  padding: 0.25rem 0.637rem;
  font-size: 1rem;
  color: ${({theme}) => theme.color};
  background-color: ${({theme}) => theme.backgroundColor};
  border-radius: 50%;
  text-decoration: none;

  &:hover {
    color: ${({theme}) => theme.hoverColor};
    cursor: ${({theme}) => theme.cursor};
  }
`;

const PageText = styled.span`
  padding: 0.25rem 0.637rem;
  font-size: 1rem;
  color: #332600;
  background-color: #fff;
  border-radius: 50%;
`;

interface PageTheme {
  color: string,
  backgroundColor: string,
  hoverColor: string,
  cursor: string
}

const paginationTheme: {
  link: PageTheme;
  active: PageTheme;
  disable: PageTheme;
} = {
  link: {
    color: '#332600',
    backgroundColor: '#fff',
    hoverColor: '#997300',
    cursor: 'pointer'
  },
  active: {
    color: '#fff',
    backgroundColor: '#332600',
    hoverColor: '#fff',
    cursor: 'default'
  },
  disable: {
    color: 'rgba(51, 38, 0, 0.5)',
    backgroundColor: '#fff',
    hoverColor: 'rgba(51, 38, 0, 0.5)',
    cursor: 'default'
  },
};

interface PaginationLinkProps {
  text?: string;
  href?: string;
  onClick?: (href: string) => void;
  theme?: PageTheme;
}

const PaginationLink = ({
  text,
  href,
  onClick,
  theme = paginationTheme.link
}: PaginationLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (href !== undefined && onClick !== undefined) {
      onClick(href);
    }
  };

  return (
    <li>
      <ThemeProvider theme={theme}>
        <PageLink
          href={href}
          onClick={handleClick}>
          {text}
        </PageLink>
      </ThemeProvider>
    </li>
  );
}

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onClick: (newPage: number) => void
}

export default function Pagination({
  currentPage,
  totalPage,
  onClick
}: PaginationProps) {
  const handleClick = (href: string): void => {
    if (!Number.isNaN(Number(href))) {
      onClick(Number(href));
    }
  };

  return (
    <nav>
      <Ul>
        {currentPage - 1 > 0
          ? <PaginationLink
              text="&#60;"
              href={`${currentPage - 1}`}
              onClick={handleClick} />
          : <PaginationLink
              text="&#60;"
              theme={paginationTheme.disable} />
        }
        {currentPage === 1
          ? <PaginationLink
              text="1"
              theme={paginationTheme.active} />
          : <PaginationLink
              text="1"
              href="1"
              onClick={handleClick} />
        }
        {currentPage - 2 > 2 &&
          <li><PageText>&#8230;</PageText></li>
        }
        {[...Array(5)].map((_, index) => {
          const page = currentPage + index - 2;
          if (page > 1 && page < totalPage) {
            if (page == currentPage) {
              return (
                <PaginationLink
                  text={`${page}`}
                  theme={paginationTheme.active} />
              );
            } else {
              return (
                <PaginationLink
                  text={`${page}`}
                  href={`${page}`}
                  onClick={handleClick} />
              );
            }
          }
        })}
        {currentPage + 3 < totalPage &&
          <li><PageText>&#8230;</PageText></li>
        }
        {currentPage === totalPage
          ? <PaginationLink
              text={`${totalPage}`}
              theme={paginationTheme.active} />
          : <PaginationLink
              text={`${totalPage}`}
              href={`${totalPage}`}
              onClick={handleClick} />
        }
        {currentPage + 1 <= totalPage
          ? <PaginationLink
              text="&#62;"
              href={`${currentPage + 1}`}
              onClick={handleClick} />
          : <PaginationLink
              text="&#62;"
              theme={paginationTheme.disable} />
        }
      </Ul>
    </nav>
  );
}
