require('dotenv').config();
const userService = require('../services/userService');

//Criação de administradores
exports.createAdmin = (req, res) => {
    const { username, password, email, nome, idade } = req.body;

    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Apenas administradores podem criar outros administradores.' });
    }

    const admin = userService.createUser({ username, password, email, nome, idade, isAdmin: true });
    res.status(201).json({ message: 'Administrador criado com sucesso!', admin });
};

//Login para a conta
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Verificar se os campos username e password estão presentes
    if (!username || !password) {
        return res.status(400).json({ message: 'Os campos username e password são obrigatórios.' });
    }

    const token = userService.login(username, password);

    if (!token) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    res.status(200).json({ message: 'Login realizado com sucesso!', token });
};

//Criação de usuário e administrador padrão
exports.install = (req, res) => {
    const existingAdmin = userService.getAllUsers().find(u => u.username === 'admin');
    if (existingAdmin) {
        return res.status(200).json({ message: 'Administrador padrão já existe.' });
    }

    userService.createUser({ 
        username: process.env.USER_USERNAME, 
        password: process.env.USER_PASSWORD, 
        email: process.env.USER_EMAIL, 
        nome: process.env.USER_NOME, 
        idade: parseInt(process.env.USER_IDADE, 10)
    });

    userService.createUser({
        username: process.env.ADMIN_USERNAME, 
        password: process.env.ADMIN_PASSWORD, 
        email: process.env.ADMIN_EMAIL, 
        nome: process.env.ADMIN_NOME, 
        idade: parseInt(process.env.ADMIN_IDADE, 10), 
        isAdmin: true
    });

    res.status(201).json({ message: 'Usuários padrão criados com sucesso!' });
};

//Consultar todos os usuários
exports.getAllUsers = (req, res) => {
    const { limite = 10, pagina = 1 } = req.query;

    // Valida os valores permitidos para 'limite'
    const limitePermitido = [5, 10, 30];
    const limiteNumero = parseInt(limite, 10);
    const paginaNumero = parseInt(pagina, 10);

    if (!limitePermitido.includes(limiteNumero)) {
        return res.status(400).json({ 
            message: `O limite deve ser um dos seguintes valores: ${limitePermitido.join(', ')}` 
        });
    }

    if (paginaNumero < 1) {
        return res.status(400).json({ 
            message: 'A página deve ser um número inteiro maior ou igual a 1.' 
        });
    }

    // Recupera os usuários e aplica a paginação
    const allUsers = userService.getAllUsers();
    const inicio = (paginaNumero - 1) * limiteNumero;
    const usuariosPaginados = allUsers.slice(inicio, inicio + limiteNumero);

    res.status(200).json({ 
        message: 'Usuários listados com sucesso!', 
        pagina: paginaNumero, 
        limite: limiteNumero, 
        total: allUsers.length, 
        usuarios: usuariosPaginados 
    });
};
//Consultar usuário por id
exports.getUserById = (req, res) => {
    const user = userService.getUserById(parseInt(req.params.id, 10));

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário encontrado com sucesso!', user });
};

//Criar usuário
exports.createUser = (req, res) => {
    const { username, password, email, nome, idade } = req.body;

    if (!username || !password || !email || !nome || !idade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newUser = userService.createUser({ username, password, email, nome, idade });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', newUser });
};

//Atualizar usuário
exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = userService.getUserById(userId);
    const updatedData = req.body;

     // Verifica se há algum campo para atualização
     if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: 'Nenhuma alteração fornecida. Por favor, adicione dados para atualização.' });
    }

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (!req.user.isAdmin && req.user.id !== userId) {
        return res.status(403).json({ message: 'Você não tem permissão para alterar este usuário.' });
    }

    const updatedUser = userService.updateUser(userId, req.body);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!', updatedUser });
};

//Deletar usuário
exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = userService.getUserById(userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (!req.user.isAdmin && req.user.id !== userId) {
        return res.status(403).json({ message: 'Você não tem permissão para excluir este usuário.' });
    }

    userService.deleteUser(userId);
    res.status(200).json({ message: 'Usuário excluído com sucesso!' });
};
