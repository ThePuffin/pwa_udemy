fetch("https://reqres.in/api/users")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    const users = res.data;
    users.forEach((user) => {
      renderContacts(user, user.id);
    });
  });
