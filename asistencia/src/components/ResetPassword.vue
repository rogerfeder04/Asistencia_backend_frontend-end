<template>
    <div class="flex flex-center bg-soft-green">
        <q-card class="q-pa-lg q-mb-xl q-pa-sm q-card-responsive">
            <q-card-section class="row items-center q-pb-none">
                <q-avatar icon="lock_open" size="56px" class="q-mr-md" color="white" text-color="primary" />
                <div class="text-h6">Restablecer Contraseña</div>
            </q-card-section>

            <q-card-section class="q-mt-md">
                <q-input
                    v-model="email"
                    filled
                    label="Correo Electrónico"
                    dense
                    clearable
                    hint="Ingrese su correo electrónico"
                    prefix-icon="email"
                    :rules="[val => !!val || 'Este campo es requerido']"
                />
            </q-card-section>

            <q-card-actions align="right" class="q-mt-md">
                <q-btn @click="sendResetLink" label="Enviar enlace" color="primary" class="full-width" />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsuariosStore } from '../stores/usuarios.js';

const email = ref('');
const useUsuarios = useUsuariosStore();

async function sendResetLink() {
    try {
        let res = await useUsuarios.sendPasswordResetLink(email.value);
        if (res?.response?.data?.errors) {
            console.error('Error al enviar el enlace de restablecimiento:', res.message);
        } else {
            Notify.create({
                message: 'Enlace de restablecimiento enviado con éxito',
                color: 'green',
                position: 'top-right'
            });
        }
    } catch (error) {
        console.error('Error al enviar el enlace de restablecimiento:', error.message);
        Notify.create({
            message: 'Hubo un problema al enviar el enlace',
            color: 'red',
            position: 'top-right'
        });
    }
}
</script>