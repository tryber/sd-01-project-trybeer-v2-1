exports.getTitle = (path, idExist) => {
  if (idExist) return 'Detalhes de Pedido';
  const titles = {
    '/orders': 'Meus Pedidos',
    '/profile': 'Meu perfil',
    '/checkout': 'Finalizar',
    '/products': 'Trybeer',
  };
  return titles[path];
};

exports.validateLocalUser = (data) => {
  if (!data) return false;
  if (!data.name || !data.token || !data.email) return false;
  return data;
}

exports.saveUser = (user) => {
  const itemJson = JSON.stringify(user);
  localStorage.setItem('user', itemJson);
}

exports.getUser = () => JSON.parse(localStorage.getItem('user'));

exports.clearUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('car');
}

exports.verifyUser = (user) => user ? user.token : '';
