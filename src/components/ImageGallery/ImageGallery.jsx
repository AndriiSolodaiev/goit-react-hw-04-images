import { ImageGalleryItem } from './ImageGalleryItem';
import { useState, useEffect } from 'react';
import { List } from './ImageGallery.styled';
import { Modal } from '../Modal';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from '../Button';
import { toast } from 'react-toastify';
import { fetchImages } from 'api';
import PropTypes from 'prop-types';

export const ImageGallery = ({ searchRequestApp }) => {
  const [images, setImages] = useState([]);
  const [activImage, setActivImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  // useEffect(() => {
  //   if (searchRequestApp) {
  //     setLoading(true);
  //     setPage(1);
  //     setImages([]);
  //     setDisableButton(false);

  //     fetchImages(searchRequestApp, 1)
  //       .then(({ hits, totalHits }) => {
  //         if (hits.length) {
  //           toast.info(`We found ${totalHits} results`);
  //           setImages([...hits]);
  //         } else {
  //           toast.error('Sorry, there are no results');
  //         }
  //       })
  //       .catch(err => alert(err.message))
  //       .finally(() => setLoading(false));
  //   }
  // }, [searchRequestApp]);

  // useEffect(() => {
  //   if (page !== 1) {
  //     setLoading(true);
  //     fetchImages(searchRequestApp, page)
  //       .then(({ hits }) => {
  //         if (hits.length) {
  //           setImages(i => [...i, ...hits]);
  //         } else {
  //           setDisableButton(true);
  //           toast.error('Sorry, there are no results');
  //         }
  //       })
  //       .catch(err => alert(err.message))
  //       .finally(() => setLoading(false));
  //   }
  // }, [page]);
  useEffect(() => {
    if (searchRequestApp) {
      setPage(1);
      setImages([]);
      console.log('Clear state');
    }
  }, [searchRequestApp]);
  useEffect(() => {
    if (searchRequestApp) {
      console.log(page);
      setLoading(true);
      fetchImages(searchRequestApp, page)
        .then(({ hits, totalHits }) => {
          if (hits.length) {
            if (page === 1) {
              toast.info(`We found ${totalHits} results`);
              setImages([...hits]);
              console.log('1 Виконання');
            } else {
              setImages(i => [...i, ...hits]);

              console.log('2 Виконання');
            }
          } else {
            setDisableButton(true);
            toast.error('Sorry, there are no results');
          }
        })
        .catch(err => alert(err.message))
        .finally(() => setLoading(false));
    }
  }, [searchRequestApp, page]);

  const handleClickMore = () => {
    setPage(prevState => prevState + 1);
  };

  const togleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = index => {
    setActivImage(index);
    togleModal();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={images[activImage].largeImageURL} alt=""></img>
        </Modal>
      )}
      {images.length > 0 && (
        <List>
          {images.map(({ id, webformatURL }, index) => (
            <ImageGalleryItem
              key={id}
              onClick={() => onImageClick(index)}
              webformatURL={webformatURL}
            />
          ))}
        </List>
      )}
      {loading && (
        <ThreeCircles
          height="100"
          width="100"
          color="#4d80a9"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      )}
      {images.length > 0 && !loading && (
        <Button onClick={handleClickMore} disableButton={disableButton} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  searchRequestApp: PropTypes.string.isRequired,
};
