const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON
const filePath = path.join(__dirname, '../data/users.json');

// Inicializa o arquivo JSON se não existir
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

// Carrega os usuários do arquivo JSON
const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

// Salva os dados no arquivo JSON
const saveToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// Retorna todos os usuários
exports.getAllUsers = () => users;

// Retorna um usuário baseado no id
exports.getUserById = (id) => users.find(user => user.id === id);

// Adiciona um usuário ao array
exports.createUser = (user) => {
    const newUser = { id, isAdmin: user.isAdmin || false, ...user };
    users.push(newUser);
    id++;
    saveToFile(); // Salva no arquivo
    return newUser;
};

// Atualiza um usuário baseado em seu id
exports.updateUser = (id, updatedUser) => {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    users[index] = { ...users[index], ...updatedUser };
    saveToFile(); // Salva no arquivo
    return users[index];
};

// Deleta um usuário com base em seu id
exports.deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const deletedUser = users.splice(index, 1)[0];
    saveToFile(); // Salva no arquivo
    return deletedUser;
};
