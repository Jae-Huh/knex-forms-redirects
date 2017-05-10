module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser,
  editUser,
  deleteUser
}

function getUsers(connection) {
  return connection('users').select()
}

function getUser(id, connection) {
  return connection('users').where('id', id)
}

function addUser(name, email, connection) {
  return connection('users')
    .insert({
      name: name,
      email: email
    })
}

function editUser(id, edited, connection) {
  return connection('users')
    .where('id', id)
    .update(edited)
}

function deleteUser(id, connection) {
  return connection('users')
    .where('id', id)
    .del()
}
