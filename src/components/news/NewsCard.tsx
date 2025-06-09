import React from "react";

type NewsCardProps = {
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
};

const NewsCard = ({ title, description, category, date, image }: NewsCardProps) => (
  <div className="news">
    <h3 className="heading_news">{title}</h3>
    <div className="text-block-20">{description}</div>
    <div className="w-layout-hflex flex-block-33">
      <div className="w-layout-hflex flex-block-32">
        <div className="div-block-13"></div>
        <div className="text-block-20">{category}</div>
      </div>
      <div className="w-layout-hflex flex-block-34">
        <div className="div-block-14"></div>
        <img src="/images/time-line.svg" loading="lazy" alt="" className="image-6" />
        <div className="text-block-20">{date}</div>
      </div>
    </div>
    <div className="div-block-15">
      <img src={image} loading="lazy" alt="" height="Auto" className="image-7" />
    </div>
  </div>
);

export default NewsCard; 