export function generateSalesEmailContent(sales: any) {
  const customerPurchaseProducts = sales?.customerPurchaseProducts || []

  const invoiceDate = new Date(
    sales?.customerPurchase?.createdAt,
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  })

  let productRows = ''

  const totals = customerPurchaseProducts.reduce(
    (acc: any, product: any) => {
      product.variants.forEach((variant: any) => {
        const sell = product.sell

        const totalAmountWithQty = sell.sellingPrice * sell.quantity
        const discountAmount = (totalAmountWithQty * sell.discounts) / 100
        const vatAmount = (totalAmountWithQty * sell.vats) / 100
        const productNetTotal = totalAmountWithQty - discountAmount + vatAmount

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
        `

        acc.totalQuantity = sell.quantity
        acc.totalAmount = totalAmountWithQty
        acc.totalDiscount = discountAmount
        acc.totalVat = vatAmount
        acc.netTotal = productNetTotal
      })
      return acc
    },
    {
      totalQuantity: 0,
      totalAmount: 0,
      totalDiscount: 0,
      totalVat: 0,
      netTotal: 0,
    },
  )

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
              <span>Name: ${sales?.customerPurchase?.customer?.firstName} ${sales?.customerPurchase?.customer?.middleName ? sales?.customerPurchase?.customer?.middleName : ''} ${sales?.customerPurchase?.customer?.lastName}</span><br/>
              <span>Phone: ${sales?.customerPurchase?.customer?.phoneNo}</span><br/>
              <span>Email: ${sales?.customerPurchase?.customer?.email}</span><br/>
              <span>Address: ${sales?.customerPurchase?.customer?.presentAddress}</span><br/>
            </div>
            <div style="width: 50%; max-width: 100%;">
              <p><strong>Invoice Information</strong></p>
              <span>Invoice Date: ${invoiceDate}</span><br/>
              <span>Invoice No: ${sales?.uniqueId}</span>
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
                <td>${sales?.customerPurchase?.totalPay.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="9" style="text-align:right;">Due</td>
                <td>${sales?.customerPurchase?.totalDue.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            <p>Thank you for your purchase!</p>
          </div>
        </div>
      </body>
      </html>
    `

  return emailContent
}
