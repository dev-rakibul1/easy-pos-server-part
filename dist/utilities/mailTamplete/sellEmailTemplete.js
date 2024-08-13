"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSalesEmailContent = void 0;
function generateSalesEmailContent(sales) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const customerPurchaseProducts = (sales === null || sales === void 0 ? void 0 : sales.customerPurchaseProducts) || [];
    const invoiceDate = new Date((_a = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _a === void 0 ? void 0 : _a.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    });
    let productRows = '';
    const totals = customerPurchaseProducts.reduce((acc, product) => {
        product.variants.forEach((variant) => {
            const sell = product.sell;
            const totalAmountWithQty = sell.sellingPrice * sell.quantity;
            const discountAmount = (totalAmountWithQty * sell.discounts) / 100;
            const vatAmount = (totalAmountWithQty * sell.vats) / 100;
            const productNetTotal = totalAmountWithQty - discountAmount + vatAmount;
            productRows = `
          <tr>
            <td>${product.productName}</td>
            <td>${variant.ram} GB / ${variant.rom} GB / ${variant.color} [${variant.imeiNumber}]</td>
            <td>${sell.quantity}</td>
            <td>${sell.sellingPrice.toFixed(2)}</td>
            <td>${totalAmountWithQty.toFixed(2)}</td>
            <td>${sell.discounts}%</td>
            <td>${discountAmount.toFixed(2)}</td>
            <td>${sell.vats}%</td>
            <td>${vatAmount.toFixed(2)}</td>
            <td>${productNetTotal.toFixed(2)}</td>
          </tr>
        `;
            acc.totalQuantity = sell.quantity;
            acc.totalAmount = totalAmountWithQty;
            acc.totalDiscount = discountAmount;
            acc.totalVat = vatAmount;
            acc.netTotal = productNetTotal;
        });
        return acc;
    }, {
        totalQuantity: 0,
        totalAmount: 0,
        totalDiscount: 0,
        totalVat: 0,
        netTotal: 0,
    });
    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
          }
          .invoice-container {
            width: 960px;
            max-width: 100%;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
          }
          .header, .footer {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h2 {
            margin: 0;
          }
          .info-section {
            display: flex;
            justify-content: space-between !important;
            margin-bottom: 20px;
            width: 100%;
            max-width: 100%;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h2>Track For Creativity LLC</h2>
            <p>Email: admin@gmail.com<br>
            Phone: +9689403010<br>
            Address: Sur Souq Sultanate of Oman</p>
          </div>
          <div class="info-section">
            <div style="width: 50%; max-width: 100%;">
              <p><strong>Customer Information</strong></p>
              <span>Name: ${(_c = (_b = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _b === void 0 ? void 0 : _b.customer) === null || _c === void 0 ? void 0 : _c.firstName} ${((_e = (_d = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _d === void 0 ? void 0 : _d.customer) === null || _e === void 0 ? void 0 : _e.middleName) ? (_g = (_f = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _f === void 0 ? void 0 : _f.customer) === null || _g === void 0 ? void 0 : _g.middleName : ''} ${(_j = (_h = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _h === void 0 ? void 0 : _h.customer) === null || _j === void 0 ? void 0 : _j.lastName}</span><br/>
              <span>Phone: ${(_l = (_k = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _k === void 0 ? void 0 : _k.customer) === null || _l === void 0 ? void 0 : _l.phoneNo}</span><br/>
              <span>Email: ${(_o = (_m = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _m === void 0 ? void 0 : _m.customer) === null || _o === void 0 ? void 0 : _o.email}</span><br/>
              <span>Address: ${(_q = (_p = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _p === void 0 ? void 0 : _p.customer) === null || _q === void 0 ? void 0 : _q.presentAddress}</span><br/>
            </div>
            <div style="width: 50%; max-width: 100%;">
              <p><strong>Invoice Information</strong></p>
              <span>Invoice Date: ${invoiceDate}</span><br/>
              <span>Invoice No: ${sales === null || sales === void 0 ? void 0 : sales.uniqueId}</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Variant</th>
                <th>Quantity</th>
                <th>P. Price</th>
                <th>Amount</th>
                <th>Discount (%)</th>
                <th>Discount A.</th>
                <th>VAT (%)</th>
                <th>VAT A.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
              <tr>
                <td colspan="2" style="text-align:right;">Total</td>
                <td>${totals.totalQuantity}</td>
                <td></td>
                <td>${totals.totalAmount.toFixed(2)}</td>
                <td></td>
                <td>${totals.totalDiscount.toFixed(2)}</td>
                <td></td>
                <td>${totals.totalVat.toFixed(2)}</td>
                <td>${totals.netTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="9" style="text-align:right;">Pay</td>
                <td>${(_r = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _r === void 0 ? void 0 : _r.totalPay.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="9" style="text-align:right;">Due</td>
                <td>${(_s = sales === null || sales === void 0 ? void 0 : sales.customerPurchase) === null || _s === void 0 ? void 0 : _s.totalDue.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </body>
      </html>
    `;
    return emailContent;
}
exports.generateSalesEmailContent = generateSalesEmailContent;
