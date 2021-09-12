import styled from 'styled-components';
import { ThemeType } from '../../theme';

export const Container = styled.div`
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.forecastPanelBgColor};
  border-radius: 0 0 30px 30px;
  padding: 1.5rem 2rem;
  overflow: hidden;
  box-shadow: 0px -75px 75px -75px #0000004d;
  border-top: 2px solid #00000012;
  margin-top: -5px;
`;
export const SectionTitle = styled.h6`
  font-weight: 500;
  font-size: 1.125rem;
  color: ${({ theme }: { theme: ThemeType }) => theme.panelTitleColor};
  display: block;
  width: 100%;
  text-align: center;
  border-bottom: 2px solid
    ${({ theme }: { theme: ThemeType }) => theme.titleBorderColor};
  padding: 5px 0 10px;
  margin: -10px 0 15px;
`;
export const List = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;

  > :last-child {
    margin-right: 0;
  }
`;
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  h6 {
    font-weight: 600;
    font-size: 0.95rem;
    color: #4581c5;
    padding-right: 30px;
    display: block;
    margin-bottom: 20px;
    text-align: right;
  }
  svg {
    width: 4rem;
    height: 4rem;
    margin: 0.7rem 0;
  }
  p {
    font-weight: 600;
    font-size: 0.85rem;
    color: #4a6fa1;
    display: block;
    padding: 0 20% 0px;
    min-height: 55px;
    text-align: center;
    text-transform: capitalize;
    border-bottom: 1px solid #4b4b4b29;
    margin-bottom: 15px;
  }
  span {
    font-size: 1.125rem;
    color: #4a6fa1;
    width: 5rem;
    text-align: center;
  }
`;
