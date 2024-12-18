// Armazena a lista de aluguéis
const rentals = [];

let id = 1;

// Retorna todos os aluguéis
exports.getAllRentals = () => rentals;

// Retorna um aluguel baseado no id
exports.getRentalById = (id) => rentals.find(rental => rental.id === id);

// Adiciona um aluguel ao array
exports.createRental = (rental) => {
    const newRental = { id, ...rental };
    rentals.push(newRental);

    id++;

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

    return rentals[index];
};

// Deleta um aluguel com base em seu id
exports.deleteRental = (id) => {
    const index = rentals.findIndex(rental => rental.id === id);

    if (index === -1) {
        return null;
    }

    // Retorna o aluguel deletado e o remove do array
    return rentals.splice(index, 1)[0];
};
