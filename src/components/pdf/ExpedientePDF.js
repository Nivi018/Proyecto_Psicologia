import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../assets/LogoTec.png'; 

export const ExpedientePDF = ({ expediente, paciente }) => {
  if (!expediente || !paciente) {
    return <Text>No se encontraron datos del expediente.</Text>;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.headerText}>Departamento de Psicología</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>Expediente del Paciente</Text>

        {/* Información del paciente */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre del Paciente:</Text>
            <Text style={styles.value}>
              {paciente.nombre + " " + paciente.apellido || 'Nombre no disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Número de control:</Text>
            <Text style={styles.value}>
              {paciente.numeroControl || 'Número de control no disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Carrera:</Text>
            <Text style={styles.value}>
              {paciente.carrera || 'Carrera no disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Semestre:</Text>
            <Text style={styles.value}>
              {paciente.semestre || 'Semestre no disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>
              {paciente.telefono || 'Teléfono no disponible'}
            </Text>
          </View>
        </View>

        {/* Sección de contenido */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Motivo de consulta:</Text>
            <Text style={styles.value}>
              {expediente.motivo_consulta || 'Motivo no disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Número de sesiones:</Text>
            <Text style={styles.value}>
              {expediente.numero_sesiones || 'No disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Plan de orientación:</Text>
            <Text style={styles.value}>
              {expediente.plan_orientacion || 'No disponible'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Seguimiento:</Text>
            <Text style={styles.value}>
              {expediente.seguimiento || 'No disponible'}
            </Text>
          </View>
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Este documento es confidencial</Text>
        </View>
      </Page>
    </Document>
  );
};
// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    padding: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2E7D32',
    textTransform: 'uppercase',
  },
  section: {
    padding: 15,
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E7D32',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    width: '40%',
  },
  value: {
    fontSize: 14,
    color: '#555',
    width: '60%',
    textAlign: 'left',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  footer: {
    marginTop: 'auto',
    padding: 10,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
  },
  footerText: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});