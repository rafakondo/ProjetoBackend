const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON
const filePath = path.join(__dirname, '../data/cars.json');

// Inicializa o arquivo JSON se não existir
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

// Carrega os usuários do arquivo JSON
const cars = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let id = cars.length > 0 ? Math.max(...cars.map(user => user.id)) + 1 : 1;

// Salva os dados no arquivo JSON
const saveToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
};

// Retorna todos os carros
exports.getAllCars = () => cars;

// Retorna um carro baseado no id
exports.getCarById = (id) => cars.find(car => car.id === id);

// Adiciona um carro ao array
exports.createCar = (car) => {
    const newCar = { id, ...car };
    cars.push(newCar);

    id++;
    saveToFile();

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

    saveToFile();

    return cars[index];
};

// Deleta um carro com base em seu id
exports.deleteCar = (id) => {
    const index = cars.findIndex(car => car.id === id);

    if (index === -1) {
        return null;
    }

    const deletedCar = cars.splice(index, 1)[0];
    saveToFile();

    // Retorna o carro deletado e o remove do array
    return deletedCar;
};
