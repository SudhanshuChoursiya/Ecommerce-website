const forgetPasswordEmailTemplate=(token)=>{
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>Reset Password Email</title>
    </head>
    <body>
      <h1>Password Reset</h1>
      <p>Reset your password by <a href="http://localhost:3000/reset-password/${token}">Click Here</a></p>
    </body>
  </html>`
  
}

module.exports=forgetPasswordEmailTemplate;