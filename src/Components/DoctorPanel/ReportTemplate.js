
function ReportTemplate() {
        return (
        <>
    <div className="other-1"   id="pdfContent">
  <table className="order-details">
    <thead>
      <tr>
        <th width="50%" colSpan={2}>
          <h2 className="text-start">Funda Ecommerce</h2>
        </th>
        <th width="50%" colSpan={2} className="text-end company-data">
          <span>Invoice Id: ${'{'}inputInvoice{'}'}</span> <br />
          <span>Date: 24 / 09 / 2022</span> <br />
          <span>Zip code : 560077</span> <br />
          <span>Address: #555, Main road, shivaji nagar, Bangalore, India</span> <br />
        </th>
      </tr>
      <tr className="bg-blue">
        <th width="50%" colSpan={2}>Order Details</th>
        <th width="50%" colSpan={2}>User Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Order Id:</td>
        <td>6</td>
        <td>Full Name:</td>
        <td> ${'{'}inputName{'}'}</td>
      </tr>
      <tr>
        <td>Tracking Id/No.:</td>
        <td>funda-CRheOqspbA</td>
        <td>Email Id:</td>
        <td>ved@gmail.com</td>
      </tr>
      <tr>
        <td>Ordered Date:</td>
        <td>22-09-2022 10:54 AM</td>
        <td>Phone:</td>
        <td>8889997775</td>
      </tr>
      <tr>
        <td>Payment Mode:</td>
        <td>Cash on Delivery</td>
        <td>Address:</td>
        <td> ${'{'}inputAdd{'}'}</td>
      </tr>
      <tr>
        <td>Order Status:</td>
        <td>completed</td>
        <td>Pin code:</td>
        <td>566999</td>
      </tr>
    </tbody>
  </table>
  <table>
    <thead>
      <tr>
        <th className="no-border text-start heading" colSpan={5}>
          Order Items
        </th>
      </tr>
      <tr className="bg-blue">
        <th>ID</th>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td width="10%">16</td>
        <td>
          ${'{'}inputRate{'}'}
        </td>
        <td width="10%"> ${'{'}inputAmount{'}'}</td>
        <td width="10%"> ${'{'}inputQty{'}'}</td>
        <td width="15%" className="fw-bold"> ${'{'}inputTotal{'}'}</td>
      </tr>
      <tr>
        <td width="10%">17</td>
        <td>
          Vivo V19
        </td>
        <td width="10%">${'{'}inputAmount{'}'}</td>
        <td width="10%">${'{'}inputQty{'}'}</td>
        <td width="15%" className="fw-bold">${'{'}inputAmount{'}'}</td>
      </tr>
      <tr>
        <td colSpan={4} className="total-heading">Total Amount - <small>Inc. all vat/tax</small> :</td>
        <td colSpan={1} className="total-heading">${'{'}inputTotal{'}'}</td>
      </tr>
    </tbody>
  </table>
  <br />
  <p className="text-center">
    Thank your for shopping with Funda of Web IT
  </p>
</div>

        </>
    );
};

export default ReportTemplate;