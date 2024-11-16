export const deleteExpediente = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expediente/expedienteDelete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar el expediente');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Error al eliminar expediente: ${error.message}`);
    }
  };