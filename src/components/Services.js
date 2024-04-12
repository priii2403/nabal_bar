import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

function Services() {
  return (
    <div className='w-screen mt-2 p-2 md:p-5 grid gap-5 md:grid-cols-3'>
      <div className='flex md:flex-col items-center'>
        <FontAwesomeIcon
          className='text-4xl md:text-8xl text-yellow-900 '
          icon={faShippingFast}
        />
        <p className='ml-6 md:ml-0 md:text-center mt-4'>
          <strong className='text-yellow-900 '>Free fast shipping</strong> and
          same-day delivery with orders over $40
        </p>
      </div>
      <div className='flex md:flex-col items-center'>
        <FontAwesomeIcon
          className='text-4xl md:text-8xl text-yellow-900 '
          icon={faHandHoldingHeart}
        />
        <p className='ml-6 md:ml-0 md:text-center mt-4'>
          <strong className='text-yellow-900 '>Carefully handcrafted</strong>{' '}
          with high quality artisan ingredients and absolutely no animal fats
          used
        </p>
      </div>
      <div className='flex md:flex-col items-center'>
        <FontAwesomeIcon
          className='text-4xl md:text-8xl text-yellow-900 '
          icon={faHeadset}
        />
        <p className='ml-6 md:ml-0 md:text-center mt-4'>
          <strong className='text-yellow-900 '>
            Support staff on standby 24/7
          </strong>{' '}
          to help you with any questions you have
        </p>
      </div>
    </div>
  );
}

export default Services;
