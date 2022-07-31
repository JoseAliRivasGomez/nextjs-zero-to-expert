
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Estudiar para el examen de Probabilidad y Estadistica',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Ir a Walmart a comprar un Funko de Eagly',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Hacer la tarea de Programacion en Ambiente Web II',
            status: 'finished',
            createdAt: Date.now() - 2000000,
        }
    ]
}