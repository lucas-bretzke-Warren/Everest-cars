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
export interface IPropsModalForm {
    isCreateProp: boolean,
    carProp: ICar,
}
export interface IState {
    dataCars: ICar[],
    car: object,
    checkAction: boolean,
    isModalForm: boolean,
    isLoading: boolean,
    msgRequiredError: boolean,
    carId: "",
}