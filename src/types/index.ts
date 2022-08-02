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
}
export interface IReturnUpdateCar {
    id: number;
    car: ICar;
}

export interface IPropsConfirmarionModal {
    id: number,
    loadingProp: boolean
}
export interface IPropsModalForm {
    isCreateProp: boolean,
    carIdProp: number,
    carProp: ICar,
}