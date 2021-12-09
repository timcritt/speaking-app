import React, { useEffect, useState } from 'react';

var API_KEY = '23223405-36dcaee43cd71e0c06728312d';

const ImageSearch = ({ setImageSrc }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchURL, setSearchURL] = useState(
    'https://pixabay.com/api/?key=' +
      API_KEY +
      '&image_type=photo&orientation=horizontal&per_page=200' +
      '&q=' +
      encodeURIComponent(searchTerm)
  );

  const [images, setImages] = useState(null);

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setSearchURL(
      'https://pixabay.com/api/?key=' +
        API_KEY +
        '&image_type=photo&orientation=horizontal&per_page=200' +
        '&q=' +
        encodeURIComponent(searchTerm)
    );
  };

  const handleImagePick = async (hit) => {
    let response = await fetch(hit.largeImageURL);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg',
    };
    let file = new File([data], 'picked.jpg', metadata);
    var url = URL.createObjectURL(file);

    setImageSrc(url);
  };

  useEffect(() => {
    let isMounted = true;

    const asyncFetch = async () => {
      await fetch(searchURL)
        .then((response) => response.json())
        .then((data) => setImages(data));
    };
    if (isMounted) {
      asyncFetch();
    }

    return () => {
      isMounted = false;
    };
  }, [searchURL]);

  return (
    <div>
      <input onChange={changeSearchTerm} defaultValue={searchTerm} />
      <div className='image-search-results-container'>
        {images &&
          images.hits.map((hit) => (
            <div
              className='image-search-image-container'
              key={hit.id}
              hit={hit}
              onClick={() => handleImagePick(hit)}
            >
              <img alt='could not load' className='image-search-image' src={hit.previewURL} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageSearch;
