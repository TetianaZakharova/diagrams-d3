import React from 'react'
import nodata from './no-data-img.svg';

export const Nodata = () => {
    return (
        <div className='d-flex flex-column align-items-center'>
           <img src={nodata} alt="No data found" />
           <h3>No data found</h3>
        </div>
    )
}
