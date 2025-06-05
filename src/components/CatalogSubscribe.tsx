import React from "react";

const CatalogSubscribe: React.FC = () => (
  <div className="w-layout-blockcontainer container subscribe w-container">
    <div className="w-layout-hflex flex-block-18">
      <div className="div-block-9">
        <h3 className="heading-3 sub">Подпишитесь на новостную рассылку</h3>
        <div className="text-block-14">Оставайтесь в курсе акций, <br />новинок и специальных предложений</div>
      </div>
      <div className="form-block-3 w-form">
        <form className="form-3" onSubmit={e => e.preventDefault()}>
          <input className="text-field-3 w-input" maxLength={256} name="name-6" placeholder="Введите E-mail" type="text" id="name-6" />
          <input type="submit" className="submit-button w-button" value="Подписаться" />
        </form>
      </div>
    </div>
  </div>
);

export default CatalogSubscribe; 