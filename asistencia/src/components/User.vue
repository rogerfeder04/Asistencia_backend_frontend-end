<template>
  <div style="background-color: white;"> <!-- Fondo blanco como en la imagen -->
    <div style="margin: 10px;">
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <h2 style="color: #3a9a42; margin: 0;">Usuarios</h2>
        <q-btn 
          @click="fixed = true" 
          color="green" 
          icon="add" 
          label="CREAR" 
          text-color="white" 
        />
      </div>
      <q-table
        title=""
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        bordered
        :dense="true"
      >
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" align="center">
            <q-btn @click="traerDatos(props.row)" color="green" icon="edit" size="sm"></q-btn>
            <q-btn @click="activar(props.row._id)" v-if="props.row.estado==0" class="q-ml-sm" color="red" icon="cancel" size="sm"></q-btn>
            <q-btn @click="activar(props.row._id)" v-else class="q-ml-sm" color="red" icon="cancel" size="sm"></q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-estado1="props">
          <q-td :props="props" align="center">
            <q-chip
              :color="props.row.estado === 1 ? 'green' : 'red'"
              text-color="white"
              square
              label="Activo"
              v-if="props.row.estado === 1"
            />
            <q-chip
              :color="props.row.estado === 0 ? 'red' : 'green'"
              text-color="white"
              square
              label="Inactivo"
              v-if="props.row.estado === 0"
            />
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="fixed" :backdrop-filter="'blur(4px) saturate(150%)'" transition-show="rotate" transition-hide="rotate" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ b==true?"Editar Usuario":"Guardar Usuario" }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input filled v-model="ema" label="Email usuario" :dense="dense" />
            <q-input filled v-model="nom" label="Nombre usuario" :dense="dense" />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="red" v-close-popup @click="cerrar()" />
            <q-btn flat label="Guardar" color="primary" @click="crearFicha()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="confirm" persistent :backdrop-filter="'blur(4px) saturate(150%)'" transition-show="rotate" transition-hide="rotate">
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Seguro Quieres Eliminar el usuario</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn @click="eliminarFicha()" flat label="Aceptar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-toggle v-model="isDark" label="Modo Oscuro" />
    </div>
  </div>
</template>


<script setup>
import axios from "axios"
import { onBeforeMount, ref, watch } from "vue";
import { Notify } from 'quasar'
import { useQuasar } from 'quasar'
import {useUsuariosStore} from "../stores/usuarios.js"
import { Dark } from 'quasar'

const useUsuario = useUsuariosStore()

const $q = useQuasar()
let confirm = ref(false)
let r = ref("")
let fixed = ref(false)
let ema = ref("")
let nom = ref("")
let error =ref("")
let b = ref(false)
let id = ref("")

const isDark = ref(Dark.isActive);
watch(isDark, (val) => {
  Dark.set(val);
});

const rows = ref([])

onBeforeMount(()=>{
  traer()
})

function ides (ids){
  id.value = ids
  confirm.value = true
}

async function traer(){
  let res = await useUsuario.listarUsuarios()
  rows.value = res.data
}

function traerDatos (datos){
  id.value = datos._id
  fixed.value = true
  b.value=true
  ema.value = datos.email
  nom.value = datos.nombre
}

function cerrar (){
  b.value=false
  ema.value = ""
  nom.value = ""
}

async function activar(id){
  let res = await useUsuario.activarDesactivarUsuarios(id)
   await traer()
}

async function crearFicha(){
 if (b.value==true){
   const res = await editarFicha(id)
   if(res?.response?.data?.errors){
     fixed.value=true
   }else{
     await traer()
     fixed.value=false
   }
 }else{

   let res = await useUsuario.guardarFicha(ema.value, nom.value)
   if(res?.response?.data?.errors){
     fixed.value=true
   }else{
     await traer()
    fixed.value=false
   
   } 
 }
}

async function editarFicha(){
  let res = await useUsuario.editarUsuario(id.value,  ema.value, nom.value)
  await traer()
  return res
}

const columns = ref([
  {
    name: 'nombre1', required: true, label: 'Nombre usuario',
    align: 'center',
    field: "nombre",
    sortable: true
  },
  { name: 'codigo1', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'estado1', align: 'center', label: 'Estado', field: 'estado', sortable: true },
  { name: 'opciones', label: 'Opciones', align: 'center' },
])
</script>

<style scoped>
/* Estilos para la tabla y botones */
.q-btn {
  border-radius: 5px;
  font-size: 14px;
}

.q-table {
  border: 1px solid #ddd;
  background-color: white;
}

.q-td {
  padding: 8px;
}

.q-th, .q-td {
  text-align: center;
}

.q-chip {
  font-size: 12px;
  text-transform: uppercase;
}

.q-toolbar-title {
  font-size: 24px;
  font-weight: bold;
}

h2 {
  font-size: 24px;
  color: #3a9a42;
}
</style>
