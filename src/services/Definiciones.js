export function Company ({ empresa }) {
  if (empresa === 0) {
    return 'Multired y Servired'
  } else if (empresa === 1) {
    return 'Multired'
  } else if (empresa === 3) {
    return 'Servired'
  }
}

export function Proceso ({ proceso }) {
  // TODO: 1 -->Técnología 2 -->Contabilidad 3--> Comercial 4--> Administración  5--> Gestión Humana 6--> Gerencia 7--> Tesoreria 8--> Auditoria 9--> Cumplimiento
  if (proceso === 1) {
    return 'Técnología'
  } else if (proceso === 2) {
    return 'Contabilidad'
  } else if (proceso === 3) {
    return 'Comercial'
  } else if (proceso === 4) {
    return 'Administración'
  } else if (proceso === 5) {
    return 'Gestión Humana'
  } else if (proceso === 6) {
    return 'Gerencia'
  } else if (proceso === 7) {
    return 'Tesoreria'
  } else if (proceso === 8) {
    return 'Auditoria'
  } else if (proceso === 9) {
    return 'Cumplimiento'
  }
}

export function State ({ estado }) {
  if (estado === 0) {
    return 'Inactivo'
  } else if (estado === 1) {
    return 'Activo'
  }
}
