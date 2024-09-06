<template>
  <div class="login-container">
    <q-card class="q-pa-lg q-mb-xl q-pa-sm q-card-responsive">
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="login" size="56px" class="q-mr-md" color="white" text-color="primary"/>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <q-input
          v-model="email"
          filled
          label="Nombre de Usuario"
          dense
          clearable
          hint="Ingrese su nombre de usuario"
          prefix-icon="person"
          :rules="[val => !!val || 'Este campo es requerido']"
        />
        <q-input
          v-model="password"
          filled
          label="Contraseña"
          type="password"
          dense
          class="q-mt-md"
          clearable
          hint="Ingrese su contraseña"
          prefix-icon="lock"
          :rules="[val => !!val || 'Este campo es requerido']"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-mt-md">
        <q-btn 
          :disable="loading"
          @click="login" 
          color="primary" 
          class="full-width"
        >
          <template v-if="loading">
            <q-spinner-dots color="white" size="20px" />
          </template>
          <template v-else>
            Iniciar Sesión
          </template>
        </q-btn>
      </q-card-actions>

      <q-card-section align="center" class="q-mt-sm">
        <q-btn flat @click="goToResetPassword" label="¿Olvidaste tu contraseña?" color="primary" class="q-pa-none" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuariosStore } from '../stores/usuarios.js';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false); // Indicador de carga
const useUsuarios = useUsuariosStore();

async function login() {
  if (loading.value) return; // Evita múltiples clics

  loading.value = true;
  try {
    let res = await useUsuarios.login(email.value, password.value);

    // Verificar si la respuesta es exitosa
    if (res && res.status === 200 && res.data.token) {
      router.replace('/home');
    } else {
      Notify.create({
        type: 'negative',
        message: 'Error al iniciar sesión. Por favor, verifique sus credenciales.',
      });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    Notify.create({
      type: 'negative',
      message: 'Error al iniciar sesión. Por favor, intente nuevamente.',
    });
  } finally {
    // Esperar 3 segundos antes de permitir que el botón se vuelva a habilitar
    setTimeout(() => {
      loading.value = false;
    }, 3000);
  }
}

function goToResetPassword() {
  router.push('/reset-password');
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 16px; /* Asegura que haya un espacio en los lados en pantallas pequeñas */
  background-color: #f5f5f5;
}

.q-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 400px; /* Mantiene el tamaño máximo en pantallas grandes */
}

.q-input__inner {
  border-radius: 8px;
}

.full-width {
  width: 100%;
}
</style>
