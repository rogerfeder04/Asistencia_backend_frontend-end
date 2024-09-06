<template>
  <div class="page-container">
    <!-- Header -->
    <div class="q-header">
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"></q-btn>
      <q-toolbar-title> REPFORA_Asistencias Aprendices</q-toolbar-title>
      <q-btn @click="Salir()" rounded icon="arrow_back_ios" color="white">Salir</q-btn>
    </div>

    <!-- Drawer -->
    <div v-if="leftDrawerOpen" class="drawer-overlay"  @click="toggleLeftDrawer"></div>
    <div v-show="leftDrawerOpen" class="drawer">
      <div class="drawer-logo">
        <!-- Logo -->
        <img src="/src/assets/image/sena2.jpg" alt="Logo" class="logo-img" />
      </div>
      <div class="drawer-content">
        <q-list padding>
          <q-item clickable @click="navigateTo('/usuario')" class="menu-item" v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Usuarios</q-item-section>
          </q-item>

          <q-item clickable @click="navigateTo('/bitacoras')" class="menu-item" v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Bitacoras</q-item-section>
          </q-item>

          <q-item clickable @click="navigateTo('/aprendiz')" class="menu-item" v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Aprendiz</q-item-section>
          </q-item>

          <q-item clickable @click="navigateTo('/fichas')" class="menu-item" v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Fichas</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Main Content Area -->
    <div :class="['main-content', { 'main-content--expanded': !leftDrawerOpen }]">
      <router-view />
    </div>

    <!-- Footer -->
    <div class="q-footer">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <span class="text-bold">Soporte</span><span> - {{ new Date().getFullYear() }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUsuariosStore } from "../stores/usuarios.js";

const leftDrawerOpen = ref(true);
const router = useRouter();
const useUsuarios = useUsuariosStore();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateTo = (path) => {
  router.push(path);
};

onMounted(() => {
  router.afterEach(() => {
    leftDrawerOpen.value = true; // Mantener el drawer siempre visible después de cada navegación
  });
});

const Salir = async () => {
  await useUsuarios.logout();
  router.replace("/");
};
</script>

<style scoped>
/* General container styles */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header styling */
.q-header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #3a9a42; /* Verde del encabezado */
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}

/* Drawer styling */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.drawer {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  background-color: #f1f1f1; /* Fondo gris claro */
  color: white;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.drawer-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
}

.logo-img {
  max-width: 80%;
  max-height: 80px;
  margin-top: 100px;
}

/* Drawer content */
.drawer-content {
  padding-top: 44px;
  border-right: 1px solid #ddd;
}

.drawer .menu-item {
  background-color: #3a9a42; /* Fondo verde para los ítems */
  color: white;
  margin: 8px 0;
  border-radius: 10px; /* Bordes redondeados */
  padding: 12px 16px; /* Espaciado interno */
  display: flex;
  align-items: center;
  text-transform: uppercase;
}

.menu-item:hover {
  background-color: #2e7d32; /* Verde más oscuro en hover */
}

/* Main content area */
.main-content {
  flex: 1;
  background-color: #f1f1f1; /* Fondo gris claro */
  margin-left: 250px;
  padding: 16px;
  transition: margin-left 0.3s ease;
}

.main-content--expanded {
  margin-left: 0;
}

/* Footer styling */
.q-footer {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #3a9a42; /* Verde del pie de página */
  color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.26);
  text-align: center;
  justify-content: center;
}

/* Button styling */
.q-btn {
  background-color: #3a9a42; /* Verde para los botones */
  color: white;
  border-radius: 4px;
  padding: 8px 16px;
  text-transform: uppercase;
}

.q-btn:hover {
  background-color: #2e7d32; /* Verde más oscuro en hover */
}
</style>
