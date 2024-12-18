// armazena a lista de usuários
const users = [];

let id = 1;

// retorna todos os usuários
exports.getAllUsers = () => users;

// retorna um usuário baseado no id
exports.getUserById = (id) => users.find(user => user.id === id);

// adiciona um usuário ao array
exports.createUser = (user) => {
    const newUser = { id, isAdmin: user.isAdmin || id, ...user };
    users.push(newUser);

    id++;

    return newUser;
};


// atualiza um usuário baseado em seu id
exports.updateUser = (id, updatedUser) => {
    const index = users.findIndex(user => user.id === id);

    if(index === -1){
        return null;
    }

    // desestructuring: sobrescreve as chaves presentes em updatedUser
    users[index] = { ...users[index], ...updatedUser };

    return users[index];
};


// deleta um usuário com base em seu id
exports.deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if(index === -1){
        return null;
    }

    // retorna o usuário deletado e o remove do array
    return users.splice(index,1)[0];
};