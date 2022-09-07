import { ICar } from '@/types'


export const postFakecar: ICar = {
  nome: 'Tesla',
  marca: 'Tesla',
  cor: 'branco',
  ano: 2023,
  portas: 4,
  cv: 200,
  alarme: 'tem',
  cambio: 'manual',
  tetoSolar: 'tem',
  computadorDeBordo: 'tem',
  id: "W-test"
}


export const carMock: ICar = {
  nome: 'Fusca',
  marca: 'volks',
  cor: 'branco',
  ano: 1999,
  portas: 2,
  cv: 70,
  alarme: 'não tem',
  cambio: 'manual',
  tetoSolar: 'não tem',
  computadorDeBordo: 'não tem',
  id: "ayTdGKx"
}

export const carArrayMock: ICar[] = [
  { ...carMock },
  {
    nome: "Bmw-135",
    marca: "BMW",
    cor: "preta",
    ano: 2017,
    portas: 4,
    cv: 460,
    alarme: "tem",
    cambio: "automático",
    tetoSolar: "tem",
    computadorDeBordo: "tem",
    id: "a-IfVws"
  },
  {
    nome: "Palio",
    marca: "Fiat",
    cor: "rosa",
    ano: 2003,
    portas: 2,
    cv: 65,
    alarme: "não",
    cambio: "manual",
    tetoSolar: "não",
    computadorDeBordo: "não",
    id: "aJsAerr"
  },
  {
    nome: "Mercedes c180",
    marca: "Mercedes",
    cor: "amarela",
    ano: 2022,
    portas: 4,
    cv: 140,
    alarme: "tem",
    cambio: "automático",
    tetoSolar: "tem",
    computadorDeBordo: "tem",
    id: "Xy8htry"
  },
]