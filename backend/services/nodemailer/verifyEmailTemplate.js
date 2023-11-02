const verifyEmailTemplate=(id)=>{
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>Verify Email</title>
    </head>
    <body>
      <h1>Email Verification</h1>
      <p>Please verify your Email by <a href="http://localhost:5000/verify-email/${id}">Click Here</a></p>
    </body>
  </html>`
  
}

module.exports=verifyEmailTemplate;