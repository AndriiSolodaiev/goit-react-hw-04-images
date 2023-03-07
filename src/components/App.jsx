import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');

  const handleFormSubmit = searchRequest => {
    setSearchRequest(searchRequest);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      <ImageGallery searchRequestApp={searchRequest} />
    </Container>
  );
};
