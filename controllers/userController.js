const userService = require('../services/userService');

exports.createAdmin = (req, res) => {
    const { username, password, email, nome, idade } = req.body;

    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Apenas administradores podem criar outros administradores.' });
    }

    const admin = userService.createUser({ username, password, email, nome, idade, isAdmin: true });
    res.status(201).json(admin);
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const token = userService.login(username, password);

    if (!token) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    res.status(200).json({ token });
};

exports.install = (req, res) => {
    const defaultAdmin = { username: 'admin', password: 'admin123', email: 'admin@example.com', nome: 'Administrador', idade: 30, isAdmin: true};
    const existingAdmin = userService.getAllUsers().find(u => u.username === 'admin');

    if (existingAdmin) {
        return res.status(200).json({ message: 'Administrador padrão já existe.' });
    }

    userService.createUser(defaultAdmin);
    res.status(201).json({ message: 'Administrador padrão criado.' });
};

// TODAS as rotas aqui chamam a função equivalente na camada de serviço, verifica se o resultado é o esperado e retorna status de sucesso (2XX) ou error (4XX)
exports.getAllUsers = (req, res) => {
    const users = userService.getAllUsers();

    res.status(200).json(users);
}

exports.getUserById = (req, res) => {
    const user = userService.getUserById(parseInt(req.params.id, 10));

    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
}

exports.createUser = (req, res) => {
    const { username, password, email, nome, idade } = req.body;

    if (!username || !password || !email || !nome || !idade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newUser = userService.createUser({ username, password, email, nome, idade });
    res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
    const updatedUser = "";
    
    if(req.user.isAdmin || req.user.id == req.params.id) {
        updatedUser = userService.updateUser(parseInt(req.params.id, 10), req.body);
    } else {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(updatedUser);
};

exports.deleteUser = (req, res) => {
    const deletedUser = "";

    if(req.user.isAdmin || req.user.id == req.params.id) {
        deletedUser = deleteduserService.deleteUser(parseInt(req.params.id, 10));
    } else {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(deletedUser);
}