import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./TermsofUse.css";
import HeaderNew from "./HeaderNew";
import FooterNew from "./FooterNew";

function RefundandReturn() {
  return (
    <div className="refund_return">
      <HeaderNew />
      <div className="container">
        <div className="refund_return_container">
          <div className="refund_return_wrapper">
            <div className="refund_return_policy ">
              <h4>Return & Refund Policy</h4>
              <p>Updated at August 29th 2023</p>
              <p>
                To help explain things as clearly as possible in this Return &
                Refund Policy, every time any of these terms are referenced, are
                strictly defined as:
              </p>
              <ul>
                <li>
                  <p>
                    Company : when this policy mentions “Company”, it refers to
                    ‘Ethi’ And its content creators, who are responsible for
                    your information under this Return & Refund Policy.
                  </p>
                </li>
                <li>
                  <p>
                    Customer : “Customer” refers to the company, organization or
                    person that signs up and makes payment for use certain
                    services provided by the Company.
                  </p>
                </li>
                <li>
                  <p>
                    Service : refers to the service provided by the Company and
                    for which the Customer has made payment. The exact
                    description of the service shall be made available to the
                    Customer as per the needs and requirements of the Customer
                    before making payment by the customer.
                  </p>
                </li>
                <li>
                  <p>
                    Website : site, which can be accessed via this URL:
                    www.ethi.ai
                  </p>
                </li>
              </ul>
            </div>

            <div className="refund_return_policy">
              <h4>Refund Policy</h4>
              <p>
                Thanks for using Ethi . We appreciate your association with us.
              </p>
              <p>
                As with any consultation experience, there are terms and
                conditions that apply to transactions at Ethi . The main thing
                to remember is that by placing an order or making a purchase at
                Ethi, you agree to the terms set forth below along with Policy.
              </p>
              <p>
                We do not offer any refund once a package is purchased from us.
                The purchase from us is non-refundable and non-transferable.
                Only the person in whose name the purchase is made can avail our
                services.
              </p>
              <p>
                The appointments booked and paid for through this website must
                be rescheduled at least 24 hours in advance. No change in
                appointment can be made after the said time limit. Rescheduling
                can also be done only as per the available slots.
              </p>
            </div>

            <div className="refund_return_policy">
              <h4>Refund</h4>
              <p>
                By using our website, registering an account, or making a
                purchase, you hereby consent to our Refund Policy and agree to
                its terms.
              </p>
              <p>Changes To Our Refund Policy</p>
              <p>
                Should we update, amend or make any changes to this document so
                that they accurately reflect our Service and policies. Unless
                otherwise required by law, those changes will be prominently
                posted here. Then, if you continue to use the Service, you will
                be bound by the updated Refund Policy. If you do not want to
                agree to this or any updated Refund Policy, you are suggested to
                not use our services and this website.
              </p>
            </div>

            <div className="refund_return_policy">
              <h4>Contact Us</h4>
              <p>
                If, for any reason, You are not completely satisfied with our
                services, don't hesitate to contact us and we will discuss any
                of the issues you are going through with our product.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterNew />
    </div>
  );
}

export default RefundandReturn;
