export interface Items {
    nome: string;
    marca: string;
    cor: string;
    ano: number | null;
    portas: number | null;
    cv: number | null;
    cambio: string;
    alarme: string;
    tetoSolar: string
    computadorDeBordo: string;
}

export interface IReturnUpdateCar{
    id: number;
    car: Items;
}