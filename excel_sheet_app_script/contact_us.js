function doPost(e) {

    var sheet = SpreadsheetApp
        .openById("1KVEwzed7sCkpoh5LAZZi5YOj1fq0lFfHunYbuMGxW4E")
        .getSheetByName("Sheet1");

    var data = JSON.parse(e.postData.contents);

    var timestamp = new Date();

    // Save form data
    sheet.appendRow([
        data.fullName,
        data.email,
        data.organization,
        data.industry,
        data.subject,
        data.message,
        timestamp
    ]);

    // Email recipients
    var emailList = [
        "liferootsciences@gmail.com",
        "patilvikrant.r@gmail.com",
        "ap24597@gmail.com",
        "ajinkyaspatil99@gmail.com"
    ];

    var subject = "New Contact Inquiry: " + data.subject;

    var htmlBody = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e4e8; border-radius: 8px; overflow: hidden; color: #24292e;">
    <div style="background-color: #f6f8fa; padding: 24px; border-bottom: 1px solid #e1e4e8;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #1b1f23;">Contact Form Submission</h2>
      <p style="margin: 8px 0 0; font-size: 14px; color: #586069;">Received on ${timestamp.toLocaleString()}</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #586069; width: 140px; vertical-align: top;">Full Name</td>
          <td style="padding: 8px 0; font-size: 14px; color: #24292e; vertical-align: top;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #586069; vertical-align: top;">Email Address</td>
          <td style="padding: 8px 0; font-size: 14px; color: #0366d6; vertical-align: top;">
            <a href="mailto:${data.email}" style="color: #0366d6; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #586069; vertical-align: top;">Organization</td>
          <td style="padding: 8px 0; font-size: 14px; color: #24292e; vertical-align: top;">${data.organization || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #586069; vertical-align: top;">Industry</td>
          <td style="padding: 8px 0; font-size: 14px; color: #24292e; vertical-align: top;">${data.industry}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #586069; vertical-align: top;">Subject</td>
          <td style="padding: 8px 0; font-size: 14px; color: #24292e; vertical-align: top;">${data.subject}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; border-top: 1px solid #e1e4e8; padding-top: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #1b1f23;">Message Content</h3>
        <div style="font-size: 14px; line-height: 1.6; color: #24292e; background-color: #fcfcfc; border: 1px solid #eeeeee; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${data.message}</div>
      </div>
    </div>
    
    <div style="background-color: #fafbfc; padding: 16px 24px; border-top: 1px solid #e1e4e8; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #6a737d;">
        This is an automated notification from the LifeRoot Sciences website contact system.
      </p>
    </div>
  </div>
  `;

    MailApp.sendEmail({
        to: emailList.join(","),
        subject: subject,
        htmlBody: htmlBody
    });

    return ContentService.createTextOutput(
        JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
}