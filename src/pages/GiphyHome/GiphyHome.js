// Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Assets
import logo from '../../assets/logo.webp';
import like from '../../assets/like.png';
import unlike from '../../assets/unlike.png';

const GiphyHome = (
    {
        getAllBySearch,
        getAllByTrendig,
        getOneByRandom,
        setOneFavorite,
        allByMultiple,
        oneBySingle,
        loading,
        savedGifs
    }
) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let text = searchParams.get("text");

    const [searchText, setSearchText] = useState(text || '');
    const [dataResult, setDataResult] = useState([]);
    const [isRandom, setIsRandom] = useState(false);
    const navigate = useNavigate();

    const onGetRequestType = () => {
        if (isRandom) { // if random option is active
            return 'random';
        } else if (!isRandom && !!searchText) { // if random option is not active and search input has text
            return 'search';
        } else { // if random option is not active and search input hasn't text
            return 'trending';
        }
    };

    // Set result data after every request
    const onSetResult = () => {
        switch (onGetRequestType()) {
            case 'random':
                setDataResult([{data: oneBySingle.data}]);
                break;
            default:
                setDataResult(allByMultiple);
                break;
        }
    };

    // Call the respective endpoint for each case
    const onSearch = () => {
        const currentType = onGetRequestType();
        switch (currentType) {
            case 'random':  
                getOneByRandom({tag: searchText});
                break;
            case 'trending':
                getAllByTrendig({rating: 'g'});
                break;
            default:
                getAllBySearch({q: searchText});
                break;
        }
        setSearchParams({type: currentType, text: searchText});
    };

    // Add another gif to saved gifs
    const onAddGif = (itm) => {
        setOneFavorite(itm);
        toast("✅ New saved GIF!");
    };

    // Is watching when the data and loading are changing
    useEffect(() => {
        onSetResult();
        console.log('ALL BY SEARCH USEFFECT', searchParams.toString(), loading, allByMultiple);
    }, [allByMultiple, loading, oneBySingle, savedGifs]);

    // Check if there is previous search params
    useEffect(() => {
        onSearch();
    }, []);

    console.log('LOS RESULTADOS', onGetRequestType(), dataResult , 'savedGifs', savedGifs);

    const validateInFav = (id) => savedGifs?.some(elm => elm?.id === id);

    return (
        <div className="flex justify-center">
            <nav className="navbar navbar-expand-lg shadow-md py-4 pr-4 bg-white fixed flex items-center w-full justify-between">
                <img src={logo} alt="logo" width={150}/>
                <div className="flex flex-row justify-center w-1/2">
                    <input
                        onChange={(evt) => setSearchText(evt.target.value) }
                        value={searchText}
                        type="text"
                        className="focus:text-gray-700 focus:bg-white focus:border-[#23b997] focus:outline-none px-3 mr-2 h-10 w-3/5 max-h-[400] border border-solid border-[#c3c5c9] rounded-full"
                        placeholder="Type to search for all the gifs" />
                    <button
                        onClick={onSearch}
                        type="button"
                        className="inline-block px-3 py-2.5 bg-[#23b997] text-white font-bold text-sm leading-tight rounded shadow-md hover:bg-[#1c9b7d] hover:shadow-lg focus:bg-[#1c9b7d] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#17bd96] active:shadow-lg transition duration-150 ease-in-out"
                        >
                            Search for GIF
                    </button>
                </div>
                <button
                    onClick={() => navigate("/favorites")}
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-[#17bd96] text-[#17bd96] font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                        My saved GIFs
                </button>
            </nav>
            <div className="pt-20 pb-10 max-w-5xl gap-1 flex justify-between flex-wrap">
                <div className="flex flex-row w-full items-end">
                    <h6 className="text-black text-3xl font-medium mr-2">{text || 'Trending'}</h6>
                    <h6 className="text-[#17bd96] text-xs font-medium mb-[3px]">{dataResult?.pagination?.total_count?.toLocaleString('en-US')} GIFs</h6>
                </div>
                {dataResult?.data?.map((itm, idx) => {
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
            <ToastContainer hideProgressBar={true} autoClose={1000} />
        </div>
    );
}

 GiphyHome.propTypes = {
    getAllBySearch: PropTypes.func.isRequired,
    getAllByTrendig: PropTypes.func.isRequired,
    getOneByRandom: PropTypes.func.isRequired,
    getOneByTranslate: PropTypes.func.isRequired,
    setOneFavorite: PropTypes.func.isRequired,
    allByMultiple: PropTypes.object.isRequired,
    oneBySingle: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    savedGifs: PropTypes.array.isRequired,
 };

 /**
  * Default props
  */
 GiphyHome.defaultProps = {};

export default GiphyHome;