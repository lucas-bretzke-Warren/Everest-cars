export interface ICar {
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
    id: string;
}
export interface IState {
    dataCars: ICar[],
    car: ICar,
    checkAction: boolean,
    isModalForm: boolean,
    isCreateAction: boolean | null,
    isLoading: boolean,
    msgRequiredError: boolean,
    carId: "",
}