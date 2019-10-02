$.ajax({
    method: 'POST',
    url: 'api/session',
    data: {user:{ email: 'user1@user.com',
           password: 'password'
          }}
})