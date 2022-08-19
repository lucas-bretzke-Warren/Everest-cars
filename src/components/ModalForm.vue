<template>
  <section class="modal" v-show="isOpen">
    <nav>
      <h4>{{ getModalTitle }}</h4>
      <button @click="closeModal">X</button>
    </nav>
    <form class="form_new_car">
      <div class="content">
        <label for="">Nome do carro</label>
        <input
          aria-label="inputName"
          type="text"
          placeholder="nome?"
          v-model="car.nome"
        />
      </div>
      <div class="content">
        <label for="">Marca</label>
        <input
          aria-label="inputMarca"
          type="text"
          v-model="car.marca"
          placeholder="Reno,Fiat,Volvo..."
        />
      </div>
      <div class="content">
        <label for="">Cor</label>
        <input
          aria-label="inputCor"
          type="text"
          v-model="car.cor"
          placeholder="branco,cinza,rosa..."
        />
      </div>
      <div class="content">
        <label for="">Ano de fabricação</label>
        <input
          aria-label="inputAno"
          type="text"
          v-model="car.ano"
          placeholder="##/##/####"
        />
      </div>
      <div class="content">
        <label for=""> Quantidade de portas</label>
        <input
          aria-label="inputPortas"
          type="text"
          v-model="car.portas"
          placeholder="digite um numero"
        />
      </div>
      <div class="content">
        <label for="">CV</label>
        <input
          aria-label="inputCV"
          type="text"
          v-model="car.cv"
          placeholder="quantos CV ?"
        />
      </div>
      <div class="content">
        <label for="">Câmbio</label>
        <input
          aria-label="inputCâmbio"
          type="text"
          v-model="car.cambio"
          placeholder="automático / manual"
        />
      </div>
      <div class="content">
        <label for="">Alarme</label>
        <input
          aria-label="inputAlarme"
          type="text"
          v-model="car.alarme"
          placeholder="tem / não tem ?"
        />
      </div>
      <div class="content">
        <label for="">Teto solar</label>
        <input
          aria-label="inputTetoSolar"
          type="text"
          v-model="car.tetoSolar"
          placeholder="tem / não tem ?"
        />
      </div>
      <div class="content">
        <label for="">Computador de bordo</label>
        <input
          aria-label="inputComputadorDeBordo"
          type="text"
          v-model="car.computadorDeBordo"
          placeholder="tem / não tem ?"
        />
      </div>
    </form>
    <footer>
      <button @click="validateForm">CONCLUIR</button>
    </footer>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { ICar, IReturnUpdateCar } from "@/types";

@Component
export default class Modalform extends Vue {
  public car: ICar = {
    nome: "",
    marca: "",
    cor: "",
    ano: null,
    portas: null,
    cv: null,
    alarme: "",
    cambio: "",
    tetoSolar: "",
    computadorDeBordo: "",
    id: "",
  };

  get getModalTitle() {
    return this.isCreateProp ? "Cadastrar novo carro" : "Atualizar carro";
  }

  @Prop({
    type: Boolean,
    required: true,
  })
  readonly isCreateProp!: boolean;

  @Prop({ type: String, required: false, default: null })
  readonly carIdProp!: string;

  @Prop({
    type: Object,
    required: true,
  })
  readonly carProp!: ICar;

  @Prop({ type: Boolean, required: true, default: false })
  isOpen!: boolean;

  @Watch("carProp")
  onPropertyChanged() {
    this.car = this.carProp;
  }

  @Emit("close-modal")
  public closeModal() {
    return;
  }

  @Emit("create-new-car")
  private emitCreateNewCar(): ICar {
    return this.car;
  }

  @Emit("update-car")
  private emitUpdateCar(): IReturnUpdateCar {
    return { id: this.carIdProp, car: this.car };
  }

  public validateForm() {
    if (
      this.car.nome &&
      this.car.marca &&
      this.car.cor &&
      this.car.ano &&
      this.car.portas &&
      this.car.cv &&
      this.car.alarme &&
      this.car.cambio &&
      this.car.tetoSolar &&
      this.car.computadorDeBordo
    ) {
      if (this.isCreateProp == true) {
        this.emitCreateNewCar();
      } else {
        this.emitUpdateCar();
      }
    } else {
      alert("Algum campo não está preenchido");
    }
  }
}
</script>

<style  lang="less" scoped>
@bg-color: {
  background-color: #cddcdc;
  background-image: radial-gradient(
      at 50% 100%,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
  background-blend-mode: screen, overlay;
};

.modal {
  @bg-color();
  width: 550px;
  height: 394px;
  padding: 20px;
  flex-direction: column;

  border: none;
  border-radius: 5px;

  box-shadow: 0px 0px 1px 1100px rgba(0, 0, 0, 0.53);
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  position: absolute;
  top: 50%;
  left: 50%;
  right: -50%;
  transform: translate(-50%, -50%);
  nav {
    width: 100%;
    padding-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid #444;

    button {
      position: absolute;
      text-align: center;

      top: -15px;
      right: -15px;
      font-size: 25px;
      color: red;
      background-color: rgb(82, 82, 82);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .form_new_car {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px 15px;
    margin: 10px;

    .content {
      display: flex;
      flex-direction: column;

      label {
        font-size: 13px;
      }
      input {
        padding: 5px;
        font-size: 13px;
        border-radius: 3px;

        border: 1px solid lightgrey;
        outline: none;
      }
    }
  }
  footer {
    padding-top: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 1px solid #444;

    input,
    button {
      padding: 10px 20px;
      margin: 0px 3px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      color: white;
      background-color: #02343fbd;
    }
    input:hover,
    button:hover {
      transform: translateZ(5px) scale(1.1);
      background-color: #02343f;
      border-radius: 3px;
    }
  }
}
</style>