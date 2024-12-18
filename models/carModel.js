// Armazena a lista de carros
const cars = [];

let id = 1;

// Retorna todos os carros
exports.getAllCars = () => cars;

// Retorna um carro baseado no id
exports.getCarById = (id) => cars.find(car => car.id === id);

// Adiciona um carro ao array
exports.createCar = (car) => {
    const newCar = { id, ...car };
    cars.push(newCar);

    id++;

    return newCar;
};

// Atualiza um carro baseado em seu id
exports.updateCar = (id, updatedCar) => {
    const index = cars.findIndex(car => car.id === id);

    if (index === -1) {
        return null;
    }

    // Sobrescreve as chaves presentes em updatedCar
    cars[index] = { ...cars[index], ...updatedCar };

    return cars[index];
};

// Deleta um carro com base em seu id
exports.deleteCar = (id) => {
    const index = cars.findIndex(car => car.id === id);

    if (index === -1) {
        return null;
    }

    // Retorna o carro deletado e o remove do array
    return cars.splice(index, 1)[0];
};
