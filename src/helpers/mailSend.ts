import nodemailer from 'nodemailer'
import config from '../config/config'
import { generateSalesEmailContent } from '../utilities/mailTamplete/sellEmailTemplete'
const subject: string =
  'Your Recent Purchase Invoice from Track For Creativity LLC'

export const mailSend = async (sales: any) => {
  const customerEmail = sales?.customerPurchase?.customer?.email
  console.log('email from mail send file', customerEmail)

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.email,
      pass: config.appKey,
    },
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: config.email, // sender address
    to: customerEmail, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: generateSalesEmailContent(sales), // html body
  })
}
