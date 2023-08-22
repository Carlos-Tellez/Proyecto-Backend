const uploadForm = document.getElementById('uploadForm');
const messageDiv = document.getElementById('message');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(uploadForm);

    const uid = '64a5c2a50297203c53da86f0'; 
    try {
        const response = await fetch('/usuarios/upload/'+uid+'/documents', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            messageDiv.textContent = 'Archivos subidos exitosamente';
        } else {
            messageDiv.textContent = 'Error al subir los archivos';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'Ocurrió un error en el servidor';
    }
});