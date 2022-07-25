// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Components
import NavLayout from '../../components/NavLayout';
import BodyListLayout from '../../components/BodyListLayout';

// Assets
import trash from '../../assets/trash.png';

const MySavedGifs = (
    {
        savedGifs,
        removeOneFavorite
    }
) => {
    const navigate = useNavigate();

    // Remove gif from saved gifs
    const onRemoveGif = (itm) => {
        removeOneFavorite(itm);
        toast("❌ GIF Removed!");
    };

    // Navigate to previous page
    const onGoBack = () => navigate(-1);

    return (
        <div className="flex justify-center">
            <NavLayout 
                left={
                    <button
                        onClick={onGoBack}
                        type="button"
                        className="inline-block px-6 py-2 border-2 border-[#17bd96] text-[#17bd96] font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        >
                            Go back
                    </button>
                }
                center={
                    <div className="flex flex-row justify-center w-1/2">
                        <h6 className="text-[#17bd96] text-lg font-medium mb-2 -ml-[106px]">My Saved GIFs</h6>
                    </div>
                }
            />
            <BodyListLayout 
                title={"Your favorite Gifs"}
                totalGifs={savedGifs?.length}
                imagesList={savedGifs}
                onClickIcon={onRemoveGif}
                iconSrc={() => trash}
                iconSize={17}
            />
            <ToastContainer hideProgressBar={true} autoClose={1000} />
        </div>
    );
}

 MySavedGifs.propTypes = {
    removeOneFavorite: PropTypes.func.isRequired,
    savedGifs: PropTypes.array.isRequired,
 };

 MySavedGifs.defaultProps = {};

export default MySavedGifs;