import React from 'react';
import { useSelector } from 'react-redux';
import { haftalikHavaDurumu } from '../../store/reducers/havaDurumu';
import { AppStore } from '../../store/store';
import Item from './item';
import { Container, List, SectionTitle } from './styled';

const HaftalikHavaDurumu: React.FC = () => {
  const { data, loading, recieved } = useSelector(haftalikHavaDurumu);
    
  if (loading || !recieved) return null;

  return (
    <Container>
      <SectionTitle>Haftalık Tahmin</SectionTitle>
      <List>
        {data.map((item, i) => {
          return (
            <Item
              key={i}
              day={item.day}
              high={item.temp.temp_max}
              low={item.temp.temp_min}
              weatherCode={item.weather.id}
              description={item.weather.description}
            />
          );
        })}
      </List>
    </Container>
  );
};

export default React.memo(HaftalikHavaDurumu);
