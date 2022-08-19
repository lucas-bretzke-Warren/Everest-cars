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
export interface IReturnUpdateCar {
    id: string;
    car: ICar;
}

export interface IPropsConfirmarionModal {
    id: string,
    loadingProp: boolean
}
export interface IPropsModalForm {
    isCreateProp: boolean,
    carIdProp: string,
    carProp: ICar,
}