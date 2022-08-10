import { ICar } from '@/types'

export const carMock: ICar = {
  alarme: 'tem',
  ano: 2017,
  cambio: 'automático',
  computadorDeBordo: 'tem',
  cor: 'preta',
  cv: 460,
  id: 'a-IfVws',
  marca: 'BMW',
  nome: 'Bmw-135',
  portas: 4,
  tetoSolar: 'tem',
}

export const carArrayMock: ICar[] = [
  { ...carMock },
  {
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
    id: 'ayTdGKx'
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
  }
]