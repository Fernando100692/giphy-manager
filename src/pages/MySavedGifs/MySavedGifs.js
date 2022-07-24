// Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Assets
import logo from '../../assets/logo.webp';
import like from '../../assets/like.png';
import unlike from '../../assets/unlike.png';

const MySavedGifs = (
    {
        setOneFavorite,
        savedGifs
    }
) => {
    const navigate = useNavigate();

    // Add another gif to saved gifs
    const onAddGif = (itm) => {
        setOneFavorite(itm);
    };

    const onGoBack = () => navigate(-1);

    useEffect(() => {
        // onSearch();
    }, []);

    // console.log('LOS RESULTADOS', onGetRequestType(), dataResult , 'savedGifs', savedGifs);

    const validateInFav = (id) => savedGifs?.some(elm => elm?.id === id);

    return (
        <div className="flex justify-center">
            <nav className="navbar navbar-expand-lg shadow-md py-4 px-4 bg-white fixed flex items-center w-full justify-between">
                <button
                    onClick={onGoBack}
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-[#17bd96] text-[#17bd96] font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                        Go back
                </button>
                <div className="flex flex-row justify-center w-1/2">
                    <h6 className="text-[#17bd96] text-lg font-medium mb-2 -ml-[106px]">My Saved GIFs</h6>
                </div>
                <div/>
            </nav>
            <div className="pt-20 pb-10 max-w-5xl gap-2 flex flex-wrap">
                <div className="flex flex-row w-full items-end">
                    <h6 className="text-black text-3xl font-medium mr-2">Your favorite Gifs</h6>
                    <h6 className="text-[#17bd96] text-xs font-medium mb-[3px]">{(savedGifs?.length).toLocaleString('en-US')} GIFs</h6>
                </div>
                {savedGifs?.map((itm, idx) => {
                    return (
                        <div key={`${itm.id}-${idx}`} className="mt-2 rounded-lg shadow-lg bg-white max-w-[200px]">
                            <div className="flex flex-col">
                                <img className="rounded-t-lg h-[150px] object-cover" alt={itm?.title} src={itm?.images?.fixed_height?.url}/>
                            </div>
                            <div className="px-2 mt-2 flex flex-row justify-end">
                                <img onClick={() => onAddGif(itm)} className="cursor-pointer" src={validateInFav(itm?.id) ? like:unlike} alt="logo" width={20}/>
                            </div>
                            <div className="p-2">
                                <h6 className="text-gray-900 text-xs font-medium mb-2">{itm?.title}</h6>
                                <p className="text-gray-500 text-xs mb-4">
                                    {itm?.username}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

 MySavedGifs.propTypes = {
    setOneFavorite: PropTypes.func.isRequired,
    savedGifs: PropTypes.array.isRequired,
 };

 /**
  * Default props
  */
 MySavedGifs.defaultProps = {};

export default MySavedGifs;