const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON
const filePath = path.join(__dirname, '../data/rental.json');

// Inicializa o arquivo JSON se não existir
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

// Carrega os usuários do arquivo JSON
const rentals = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let id = rentals.length > 0 ? Math.max(...rental.map(user => user.id)) + 1 : 1;

// Salva os dados no arquivo JSON
const saveToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(rentals, null, 2));
};

// Retorna todos os aluguéis
exports.getAllRentals = () => rentals;

// Retorna um aluguel baseado no id
exports.getRentalById = (id) => rentals.find(rental => rental.id === id);

// Adiciona um aluguel ao array
exports.createRental = (rental) => {
    const newRental = { id, ...rental };
    rentals.push(newRental);

    id++;
    saveToFile();

    return newRental;
};

// Atualiza um aluguel baseado em seu id
exports.updateRental = (id, updatedRental) => {
    const index = rentals.findIndex(rental => rental.id === id);

    if (index === -1) {
        return null;
    }

    // Sobrescreve as chaves presentes em updatedRental
    rentals[index] = { ...rentals[index], ...updatedRental };

    saveToFile();

    return rentals[index];
};

// Deleta um aluguel com base em seu id
exports.deleteRental = (id) => {
    const index = rentals.findIndex(rental => rental.id === id);

    if (index === -1) {
        return null;
    }

    const deletedRental = rentals.splice(index, 1)[0];
    saveToFile();

    // Retorna o aluguel deletado e o remove do array
    return deletedRental;
};
