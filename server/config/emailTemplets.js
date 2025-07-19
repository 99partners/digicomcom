export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 24 hours.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 15 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

export const SERVICE_FORM_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Service Application Confirmation</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .header {
      background: linear-gradient(135deg, #22D172 0%, #1ea565 100%);
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
    }

    .main-content {
      padding: 40px 30px;
      color: #333333;
    }

    .success-badge {
      background: #22D172;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 20px;
    }

    .service-details {
      background: #f8f9fa;
      border-left: 4px solid #22D172;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }

    .next-steps {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }

    .button {
      background: #22D172;
      color: #ffffff;
      text-decoration: none;
      display: inline-block;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      margin: 15px 0;
      text-align: center;
    }

    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666666;
      font-size: 14px;
      border-top: 1px solid #e9ecef;
    }

    .contact-info {
      margin: 15px 0;
    }

    .divider {
      height: 1px;
      background: #e9ecef;
      margin: 25px 0;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 95% !important;
        margin: 10px auto;
      }
      
      .main-content {
        padding: 20px 15px;
      }
      
      .header {
        padding: 20px 15px;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#E5E5E5">
    <tbody>
      <tr>
        <td valign="top" align="center" style="padding: 20px;">
          <table class="container" cellspacing="0" cellpadding="0" border="0">
            <!-- Header -->
            <tbody>
              <tr>
                <td class="header">
                  <h1>🎉 Application Received!</h1>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="main-content">
                  <div class="success-badge">✓ CONFIRMED</div>
                  
                  <h2 style="margin: 0 0 15px; color: #333; font-size: 20px;">
                    Hi {{userName}},
                  </h2>
                  
                  <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6;">
                    Thank you for your interest in our <strong>{{serviceType}}</strong> services! We have successfully received your application.
                  </p>

                  <div class="service-details">
                    <h3 style="margin: 0 0 15px; color: #22D172; font-size: 16px;">
                      📋 Application Details
                    </h3>
                    <p style="margin: 0 0 8px;"><strong>Service Type:</strong> {{serviceType}}</p>
                    <p style="margin: 0 0 8px;"><strong>Email:</strong> {{userEmail}}</p>
                    <p style="margin: 0 0 8px;"><strong>Application ID:</strong> {{applicationId}}</p>
                    <p style="margin: 0;"><strong>Submitted On:</strong> {{submissionDate}}</p>
                    {{serviceSpecificDetails}}
                  </div>

                  <div class="next-steps">
                    <h3 style="margin: 0 0 15px; color: #d68910; font-size: 16px;">
                      🚀 What Happens Next?
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                      <li>Our team will review your application within <strong>24-48 hours</strong></li>
                      <li>You'll receive a follow-up email with detailed next steps</li>
                      <li>A dedicated account manager will be assigned to your project</li>
                      <li>We'll schedule a consultation call to discuss your requirements</li>
                    </ul>
                  </div>

                  <div class="divider"></div>

                  <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #666;">
                    Meanwhile, feel free to explore our other services or reach out if you have any questions.
                  </p>

                  <div style="text-align: center;">
                    <a href="https://99digicom.com/dashboard" class="button">
                      📊 View Dashboard
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td class="footer">
                  <div class="contact-info">
                    <p style="margin: 0 0 10px; font-weight: 600;">Need Help?</p>
                    <p style="margin: 0 0 5px;">📧 Email: <a href="mailto:support@99digicom.com" style="color: #22D172;">support@99digicom.com</a></p>
                    <p style="margin: 0 0 5px;">🌐 Website: <a href="https://99digicom.com" style="color: #22D172;">99digicom.com</a></p>
                  </div>
                  
                  <div class="divider"></div>
                  
                  <p style="margin: 0; font-size: 12px; color: #999;">
                    © 2024 99DigiCom. All rights reserved.<br>
                    This email was sent to {{userEmail}}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

// Helper function for sending emails with better error handling
export const sendEmail = async (transporter, mailOptions) => {
    try {
        console.log('📧 Attempting to send email to:', mailOptions.to);
        console.log('📧 Email subject:', mailOptions.subject);
        
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response
        });
        
        return { success: true, info };
    } catch (error) {
        console.error('❌ Email sending failed:', {
            error: error.message,
            code: error.code,
            command: error.command,
            to: mailOptions.to,
            subject: mailOptions.subject
        });
        
        // Common Brevo error messages and solutions
        if (error.code === 'ECONNREFUSED') {
            console.error('🔧 Connection refused - Check SMTP host and port');
        } else if (error.code === 'EAUTH') {
            console.error('🔧 Authentication failed - Check SMTP_USER and SMTP_PASSWORD');
        } else if (error.responseCode === 535) {
            console.error('🔧 Invalid credentials - Check your Brevo SMTP credentials');
        } else if (error.responseCode === 550) {
            console.error('🔧 Sender email not verified in Brevo - Add your sender email to Brevo account');
        }
        
        return { success: false, error };
    }
};

