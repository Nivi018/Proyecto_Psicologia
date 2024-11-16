export const updateExpediente = async (id, expedienteData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expediente/expedienteUpdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expedienteData),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el expediente');
      }
  
      const updatedExpediente = await response.json();
      console.log('Expediente actualizado con éxito:', updatedExpediente);
  
      return updatedExpediente;
    } catch (error) {
      console.error('Error al actualizar el expediente:', error);
      throw error; 
    }
  };