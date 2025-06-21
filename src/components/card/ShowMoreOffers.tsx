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
    <div className="w-layout-hflex show-more-offers">
      <button 
        onClick={onShowMore}
        className="button_strock w-button"
      >
        Показать еще предложения ({remainingCount})
      </button>
    </div>
  );
};

export default ShowMoreOffers; 