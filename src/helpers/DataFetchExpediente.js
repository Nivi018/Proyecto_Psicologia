export const fetchExpedienteData = async (noControl) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expediente/expedientes/${noControl}`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
  
      const userData = await response.json();
      console.log('Resultado de la respuesta de la API:', userData);
  
      const user = userData.usuario;
      const expedientes = userData.expedientes;
  
      return {
        numeroControl: user.no_control,
        nombre: user.nombre,
        apellido:user.apellido,
        edad: user.edad,
        sexo: user.sexo,
        diereccion:user.diereccion,
        telefono: user.telefono,
        carrera: user.ingenieria,
        modalidad: user.modalidad,
        semestre: user.semestre,
        expedientes: expedientes,
      };
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      throw error;
    }
  };

