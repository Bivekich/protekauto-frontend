import React from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaypalCheckout: React.FC = () => (
  <div className="w-commerce-commercepaypalcheckoutformcontainer">
    <div className="w-commerce-commercelayoutcontainer w-container">
      <div className="w-commerce-commercelayoutmain">
        {/* Shipping Method */}
        <form className="w-commerce-commercecheckoutshippingmethodswrapper">
          <div className="w-commerce-commercecheckoutblockheader">
            <h2>Shipping Method</h2>
          </div>
          <fieldset>
            <div className="w-commerce-commercecheckoutshippingmethodslist">
              <label className="w-commerce-commercecheckoutshippingmethoditem">
                <input required type="radio" name="shipping-method-choice" />
                <div className="w-commerce-commercecheckoutshippingmethoddescriptionblock">
                  <div className="w-commerce-commerceboldtextblock"></div>
                  <div></div>
                </div>
                <div></div>
              </label>
            </div>
            <div style={{display:'none'}} className="w-commerce-commercecheckoutshippingmethodsemptystate">
              <div>No shipping methods are available for the address given.</div>
            </div>
          </fieldset>
        </form>
        {/* Customer Info */}
        <div className="w-commerce-commercecheckoutcustomerinfosummarywrapper">
          <div className="w-commerce-commercecheckoutsummaryblockheader">
            <h2>Customer Information</h2>
          </div>
          <fieldset className="w-commerce-commercecheckoutblockcontent">
            <div className="w-commerce-commercecheckoutrow">
              <div className="w-commerce-commercecheckoutcolumn">
                <div className="w-commerce-commercecheckoutsummaryitem">
                  <label className="w-commerce-commercecheckoutsummarylabel">Email</label>
                  <div></div>
                </div>
              </div>
              <div className="w-commerce-commercecheckoutcolumn">
                <div className="w-commerce-commercecheckoutsummaryitem">
                  <label className="w-commerce-commercecheckoutsummarylabel">Shipping Address</label>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="w-commerce-commercecheckoutsummaryflexboxdiv">
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        {/* Payment Info */}
        <div className="w-commerce-commercecheckoutpaymentsummarywrapper">
          <div className="w-commerce-commercecheckoutsummaryblockheader">
            <h2>Payment Info</h2>
          </div>
          <fieldset className="w-commerce-commercecheckoutblockcontent">
            <div className="w-commerce-commercecheckoutrow">
              <div className="w-commerce-commercecheckoutcolumn">
                <div className="w-commerce-commercecheckoutsummaryitem">
                  <label className="w-commerce-commercecheckoutsummarylabel">Payment Info</label>
                  <div className="w-commerce-commercecheckoutsummaryflexboxdiv">
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                  </div>
                  <div className="w-commerce-commercecheckoutsummaryflexboxdiv">
                    <div></div>
                    <div> / </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="w-commerce-commercecheckoutcolumn">
                <div className="w-commerce-commercecheckoutsummaryitem">
                  <label className="w-commerce-commercecheckoutsummarylabel">Billing Address</label>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="w-commerce-commercecheckoutsummaryflexboxdiv">
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                    <div className="w-commerce-commercecheckoutsummarytextspacingondiv"></div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        {/* Items in Order */}
        <div className="w-commerce-commercecheckoutorderitemswrapper">
          <div className="w-commerce-commercecheckoutsummaryblockheader">
            <h2>Items in Order</h2>
          </div>
          <fieldset className="w-commerce-commercecheckoutblockcontent">
            <div role="list" className="w-commerce-commercecheckoutorderitemslist"></div>
          </fieldset>
        </div>
      </div>
      <div className="w-commerce-commercelayoutsidebar">
        <div className="w-commerce-commercecheckoutordersummarywrapper">
          <div className="w-commerce-commercecheckoutsummaryblockheader">
            <h2>Order Summary</h2>
          </div>
          <fieldset className="w-commerce-commercecheckoutblockcontent">
            <div className="w-commerce-commercecheckoutsummarylineitem">
              <div>Subtotal</div>
              <div></div>
            </div>
            <div className="w-commerce-commercecheckoutordersummaryextraitemslist">
              <div className="w-commerce-commercecheckoutordersummaryextraitemslistitem">
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="w-commerce-commercecheckoutsummarylineitem">
              <div>Total</div>
              <div className="w-commerce-commercecheckoutsummarytotal"></div>
            </div>
          </fieldset>
        </div>
        <button className="w-commerce-commercecheckoutplaceorderbutton">Place Order</button>
        <div style={{display:'none'}} className="w-commerce-commercepaypalcheckouterrorstate">
          <div aria-live="polite" className="w-checkout-error-msg">
            There was an error processing your customer info. Please try again, or contact us if you continue to have problems.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PaypalCheckout; 