import React from "react";
import NewsCard from "@/components/news/NewsCard";
import Link from "next/link";

const NewsAndPromos = () => (
  <section>
    <div className="w-layout-blockcontainer container w-container">
      <div className="w-layout-vflex news-index-block">
        <div className="w-layout-hflex flex-block-31">
          <h2 className="heading-4">Новости и акции</h2>
          <div className="w-layout-hflex flex-block-29">
            <Link href="/news" className="text-block-18" style={{display: 'flex', alignItems: 'center'}}>
              Ко всем новостям
              <img src="/images/Arrow_right.svg" loading="lazy" alt="" style={{marginLeft: 8}} />
            </Link>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-6-copy-copy">
          <NewsCard
            title="Kia Syros будет выделяться необычным стилем"
            description="Компания Kia готова представить новый кроссовер Syros"
            category="Новости компании"
            date="17.12.2024"
            image="/images/news_img.png"
          />
          <NewsCard
            title="Kia Syros будет выделяться необычным стилем"
            description="Компания Kia готова представить новый кроссовер Syros"
            category="Новости компании"
            date="17.12.2024"
            image="/images/news_img.png"
          />
          <NewsCard
            title="Kia Syros будет выделяться необычным стилем"
            description="Компания Kia готова представить новый кроссовер Syros"
            category="Новости компании"
            date="17.12.2024"
            image="/images/news_img.png"
          />
          <NewsCard
            title="Kia Syros будет выделяться необычным стилем"
            description="Компания Kia готова представить новый кроссовер Syros"
            category="Новости компании"
            date="17.12.2024"
            image="/images/news_img.png"
          />
        </div>
      </div>
    </div>
  </section>
);

export default NewsAndPromos; 