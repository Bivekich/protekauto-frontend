import React from "react";

const Help = () => (
  <div className="div-block-11">
    <div className="w-layout-vflex flex-block-30">
      <h3 className="heading-6">Мы будем рады помочь вам с оформлением заказа!</h3>
      <div className="text-block-19">Если у вас возникли вопросы, пожалуйста, оставьте свой номер телефона. Наш менеджер свяжется с вами и поможет оформить заказ, или решить любой вопрос!</div>
    </div>
    <div className="form-block-3 w-form">
      <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-3-copy" data-wf-page-id="6836cad8b1a5806f12459deb" data-wf-element-id="112346f5-b373-dbe0-71b5-88818a3c0556">
        <input className="text-field-3 w-input" maxLength={256} name="name-6" data-name="Name 6" placeholder="+7 (999) 999-99-99" type="text" id="name-6" />
        <input type="submit" data-wait="Please wait..." className="submit-button w-button" value="Отправить номер" />
      </form>
      <div className="w-form-done">
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div className="w-form-fail">
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
  </div>
);

export default Help; 