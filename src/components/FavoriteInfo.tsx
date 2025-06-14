export default function FavoriteInfo() {
  return (
    <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        <div className="w-layout-hflex flex-block-7">
          <a href="/" className="link-block w-inline-block">
            <div>Главная</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="/catalog" className="link-block w-inline-block">
            <div>Каталог</div>
          </a>
          <div className="text-block-3">→</div>
          <a href="/favorite" className="link-block-2 w-inline-block">
            <div>Избранное</div>
          </a>
        </div>
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">Избранное</h1>
            <div className="text-block-4">Вы добавили 34 товара в избранное</div>
          </div>
          <div className="w-layout-hflex flex-block-11">
            <img src="/images/qwestions.svg" alt="" className="image-4" />
            <div className="text-block-5">Как пользоваться избранным?</div>
          </div>
        </div>
      </div>
    </div>
  );
} 