/* eslint-disable */
// Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

// Components
import NavLayout from '../../components/NavLayout';
import BodyListLayout from '../../components/BodyListLayout';

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
        savedGifs,
        removeOneFavorite
    }
) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let text = searchParams.get("text");

    const [searchText, setSearchText] = useState(text || '');
    const [dataResult, setDataResult] = useState([]);
    const [activePage, setActivePage] = useState(0)
    const [isRandom] = useState(false);
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
    const onSearch = (offset = 0) => {
        const currentType = onGetRequestType();
        switch (currentType) {
            case 'random':  
                getOneByRandom({tag: searchText});
                break;
            case 'trending':
                getAllByTrendig({rating: 'g', offset});
                break;
            default:
                getAllBySearch({q: searchText, offset});
                break;
        }
        setActivePage(0);
        setSearchParams({type: currentType, text: searchText});
    };

    // Add another gif to saved gifs
    const onAddGif = (itm) => {
        setOneFavorite(itm);
        toast("✅ New saved GIF!");
    };

    // Remove gif from saved gifs
    const onRemoveGif = (itm) => {
        removeOneFavorite(itm);
    };

    // Is watching when data and loading are changing
    useEffect(() => {
        onSetResult();
    }, [allByMultiple, loading, oneBySingle, savedGifs]);

    // Check if there is previous search params
    useEffect(() => {
        onSearch();
    }, []);

    const handlePageClick = (event) => {
        const newOffset = (25 * event.selected);
        setActivePage(event.selected, onSearch(newOffset));
    };

    const validateInFav = (id) => savedGifs?.some(elm => elm?.id === id); // Validate if element exists in favorites

    const totalElements = dataResult?.pagination?.total_count;
    const totalPagesNumber = !(totalElements % 25) ? (totalElements / 25):(Math.ceil(totalElements / 25)); //total of pages for paginator

    return (
        <div className="flex flex-col items-center justify-center">
            <NavLayout 
                left={
                    <div />
                }
                center={
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
                }
                right={
                    <button
                        onClick={() => navigate("/favorites")}
                        type="button"
                        className="inline-block px-6 py-2 border-2 border-[#17bd96] text-[#17bd96] font-medium text-sm leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        >
                            My saved GIFs
                    </button>
                }
            />
            <BodyListLayout 
                title={text || 'Trending'}
                totalGifs={totalElements}
                imagesList={dataResult?.data}
                onClickIcon={(itm) => !validateInFav(itm?.id) ? onAddGif(itm):onRemoveGif(itm)}
                iconSrc={(itm) => validateInFav(itm?.id) ? like:unlike}
                iconSize={20}
            />
            <div className="w-full flex justify-center mb-10">
                <ReactPaginate
                    forcePage={activePage}
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPagesNumber}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
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
    removeOneFavorite: PropTypes.func.isRequired,
 };

 /**
  * Default props
  */
 GiphyHome.defaultProps = {};

export default GiphyHome;