import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
`;
export const Title = styled.h1`
  color: ${({ theme }) => theme.appTitleColor};
  font-size: 2.2rem;
  font-weight: 100;
  letter-spacing: -2px;

  b {
    display: inline-block;
    letter-spacing: 0;
    margin-right: 20px;
  }
`;
export const GithubLink = styled.a`
  margin-left: 1rem;
  svg {
    fill: ${({ theme }) => theme.appTitleColor};
  }
  &:hover svg {
    fill: #20546a;
  }
`;
export const HeaderIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
