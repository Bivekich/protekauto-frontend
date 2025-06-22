import React from "react";

interface ShowMoreOffersProps {
  hasMoreOffers?: boolean;
  onShowMore?: () => void;
  remainingCount?: number;
}

const ShowMoreOffers = ({ hasMoreOffers = false, onShowMore, remainingCount = 0 }: ShowMoreOffersProps) => {
  if (!hasMoreOffers || remainingCount <= 0) {
    return null;
  }

  return (
    <div className="w-layout-hflex show-more-search">
      <button 
        onClick={onShowMore}
        className="text-block-27"
      >
        Показать еще предложения ({remainingCount})
      </button>
      <img src="images/arrow_drop_down.svg" loading="lazy" alt="" />
    </div>
  );
};

export default ShowMoreOffers; 