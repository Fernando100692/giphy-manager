// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const BodyListLayout = ({ title, totalGifs, imagesList, onClickIcon, iconSrc, iconSize }) => {
  return (
    <div className="pt-20 pb-10 max-w-5xl gap-1 flex flex-wrap">
        <div className="flex flex-row w-full items-end">
            <h6 className="text-black text-3xl font-medium mr-2">{title}</h6>
            <h6 className="text-[#17bd96] text-xs font-medium mb-[3px]">{(totalGifs).toLocaleString('en-US')} GIFs</h6>
        </div>
        {imagesList?.map((itm, idx) => {
            return (
                <div key={`${itm.id}-${idx}`} className="mt-2 rounded-lg shadow-lg bg-white w-[200px]">
                    <div className="flex flex-col">
                        <img className="rounded-t-lg h-[150px] object-cover" alt={itm?.title} src={itm?.images?.fixed_height?.url}/>
                    </div>
                    <div className="px-2 mt-2 flex flex-row justify-end">
                        <img onClick={() => onClickIcon(itm)} className="cursor-pointer" src={iconSrc(itm)} alt="logo" width={iconSize}/>
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
  );
};

BodyListLayout.propTypes = {
    title: PropTypes.string,
    totalGifs: PropTypes.number,
    imagesList: PropTypes.array,
    onClickIcon: PropTypes.func,
    iconSrc: PropTypes.func,
    iconSize: PropTypes.number,
};

BodyListLayout.defaultProps = {
    title: '',
    totalGifs: 0,
    imagesList: [],
    iconSize: 17
};

export default BodyListLayout;