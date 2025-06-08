import React from "react";

const CarPartsSelectionForm = () => (
  <div className="w-layout-vflex flex-block-28">
    <h3 className="heading-5">Подбор по автомобилю</h3>
    <div className="form-block-4 w-form">
      <form id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-page-id="6800f7e35fcfd4ca3b3232bc" data-wf-element-id="035eb944-3f18-512d-416f-afd9dcaf7b45">
        {[7, 5, 4, 3].map((field) => (
          <select id={`field-${field}`} name={`field-${field}`} data-name={`Field ${field}`} className="select w-select" key={field}>
            <option value="">Год выпуска</option>
            <option value="First">First choice</option>
            <option value="Second">Second choice</option>
            <option value="Third">Third choice</option>
          </select>
        ))}
        <div className="div-block-10">
          <input type="submit" data-wait="Please wait..." className="submit-button w-button" value="Подобрать автозапчасть" />
        </div>
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

export default CarPartsSelectionForm; 