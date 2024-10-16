import nodemailer from 'nodemailer'
import config from '../../config/config'

// Generalized mail send function
export const Mail = async (
  recipient: string,
  subject: string,
  htmlContent: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for other ports
      auth: {
        user: config.email,
        pass: config.appKey,
      },
    })

    // Send mail with defined transport object
    await transporter.sendMail({
      from: config.email,
      to: recipient,
      subject,
      text: 'This is a fallback plain text message.',
      html: htmlContent,
    })

    console.log(`Email sent to ${recipient} with subject: ${subject}`)
  } catch (error) {
    console.error(`Failed to send email: ${error}`)
  }
}
