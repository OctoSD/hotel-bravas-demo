// Datos ficticios — Hotel Villa Serena ★★★★ · Marbella, España
window.HotelData = {
  property: {
    name: 'Hotel Villa Serena',
    stars: 4,
    location: 'Marbella, Málaga · España',
    rooms: 28,
    currency: 'EUR',
    locale: 'es-ES',
    taxId: 'B-87456321',
    cnae: '5510 · Hoteles y alojamientos',
    convenio: 'Hostelería Málaga 2024-2026',
    compliance: {
      sesHospedajes: { enabled: true, lastSync: 'Hace 5 min', pendingCount: 0 },
      verifactu: { enabled: true, lastSync: 'Hace 12 min', mode: 'VERI*FACTU' },
      ine: { enabled: true, lastReport: '31/10/2026 · ARCE', nextDue: 'En 30 días' },
      rgpd: { dpo: 'dpo@villaserena.es', consentsActive: 143 },
      iva: '10% hostelería',
      touristTax: '0.65 € / persona / noche · Andalucía'
    }
  },

  kpis: {
    today: {
      occupancy: { value: 86, delta: +4 },
      adr: { value: 162, delta: +8 },
      revpar: { value: 139, delta: +12 },
      revenue: { value: 4870, delta: +18 },
      arrivals: 7, departures: 5, inHouse: 24, vacant: 4
    },
    weekly: [68, 72, 78, 85, 82, 88, 86],
    sourceMix: [
      { name: 'Directa',    pct: 42, color: '#2563EB' },
      { name: 'Booking',    pct: 28, color: '#0F1F3D' },
      { name: 'Expedia',    pct: 14, color: '#059669' },
      { name: 'Airbnb',     pct: 10, color: '#D97706' },
      { name: 'Agencias',   pct:  6, color: '#64748B' }
    ]
  },

  rooms: [
    { num: '101', type: 'Standard', floor: 1, hk: 'mint',      status: 'Lista',       guest: null },
    { num: '102', type: 'Standard', floor: 1, hk: 'dusk',      status: 'Sucia',       guest: 'A. García' },
    { num: '103', type: 'Standard', floor: 1, hk: 'lightning', status: 'Limpia',      guest: null },
    { num: '104', type: 'Standard', floor: 1, hk: 'solar',     status: 'Fuera serv.', guest: null },
    { num: '201', type: 'Superior', floor: 2, hk: 'mint',      status: 'Lista',       guest: null },
    { num: '202', type: 'Superior', floor: 2, hk: 'dusk',      status: 'Sucia',       guest: 'M. Rossi' },
    { num: '203', type: 'Superior', floor: 2, hk: 'lightning', status: 'Limpia',      guest: null },
    { num: '204', type: 'Superior', floor: 2, hk: 'dusk',      status: 'Sucia',       guest: 'J. Dubois' },
    { num: '301', type: 'Suite',    floor: 3, hk: 'mint',      status: 'Lista',       guest: null },
    { num: '302', type: 'Suite',    floor: 3, hk: 'lightning', status: 'Limpia',      guest: null }
  ],

  reservations: [
    { id: 'R-2041', guest: 'María Fernández',  room: '305', nights: 3, status: 'confirmed', source: 'Directa',  checkin: '31/10', checkout: '03/11', total: 435, paid: true },
    { id: 'R-2042', guest: 'Thomas Weber',     room: '201', nights: 5, status: 'confirmed', source: 'Booking',  checkin: '31/10', checkout: '05/11', total: 820, paid: true },
    { id: 'R-2043', guest: 'Laure Martin',     room: '303', nights: 2, status: 'pending',   source: 'Expedia',  checkin: '01/11', checkout: '03/11', total: 320, paid: false },
    { id: 'R-2044', guest: 'Giorgio Bianchi',  room: '102', nights: 7, status: 'confirmed', source: 'Airbnb',   checkin: '02/11', checkout: '09/11', total: 1150, paid: true },
    { id: 'R-2045', guest: 'Sarah Johnson',    room: '401', nights: 4, status: 'confirmed', source: 'Directa',  checkin: '02/11', checkout: '06/11', total: 760, paid: true },
    { id: 'R-2046', guest: 'Carlos Reyes',     room: '208', nights: 2, status: 'pending',   source: 'Booking',  checkin: '03/11', checkout: '05/11', total: 320, paid: false }
  ],

  arrivals: [
    { time: '14:00', guest: 'María Fernández',  room: '305', nights: 3, source: 'Directa', requests: 'Cuna extra', vip: false },
    { time: '15:30', guest: 'Thomas Weber',     room: '201', nights: 5, source: 'Booking.com', requests: 'Vista mar', vip: true },
    { time: '16:00', guest: 'Familia Rossi',    room: '402', nights: 7, source: 'Directa', requests: '2 niños, late check-in', vip: false },
    { time: '18:45', guest: 'Laure Martin',     room: '303', nights: 2, source: 'Expedia',  requests: '', vip: false },
    { time: '19:30', guest: 'A. Lindqvist',     room: '110', nights: 4, source: 'Airbnb',   requests: 'Alergia frutos secos', vip: false },
    { time: '20:00', guest: 'B. Hoffmann',      room: '206', nights: 3, source: 'Booking.com', requests: '', vip: false },
    { time: '22:15', guest: 'J. Nakamura',      room: '304', nights: 2, source: 'Directa',  requests: 'Late check-in confirmado', vip: true }
  ],

  departures: [
    { time: '10:00', guest: 'A. García',   room: '102', paid: true,  extras: 48 },
    { time: '11:00', guest: 'M. Rossi',    room: '202', paid: true,  extras: 125 },
    { time: '11:30', guest: 'J. Dubois',   room: '204', paid: false, extras: 94 },
    { time: '12:00', guest: 'K. Petrova',  room: '108', paid: true,  extras: 36 },
    { time: '12:00', guest: 'R. Álvarez',  room: '211', paid: true,  extras: 72 }
  ],

  alerts: [
    { type: 'warning', text: 'Pago pendiente: J. Dubois (hab. 204) · 94 €',       action: 'Cobrar' },
    { type: 'info',    text: '3 mensajes sin responder en el inbox del huésped', action: 'Abrir' },
    { type: 'warning', text: 'Hab. 104 fuera de servicio hace 2 días (fontanería)', action: 'Ver' },
    { type: 'ok',      text: 'SES.Hospedajes · 7 partes enviados hoy',           action: null }
  ],

  inbox: [
    { id: 'C1', guest: 'María Fernández', avatar: 'MF', channel: 'wa', unread: 2, time: '09:42', snippet: 'Perfecto, nos vemos a las 14h', ai: false, status: 'open' },
    { id: 'C2', guest: 'Thomas Weber',    avatar: 'TW', channel: 'wa', unread: 1, time: '09:28', snippet: '¿Tenéis parking disponible?',  ai: true,  status: 'open' },
    { id: 'C3', guest: 'Laure Martin',    avatar: 'LM', channel: 'em', unread: 0, time: '08:51', snippet: 'Confirmado, cambio de fecha',  ai: false, status: 'resolved' },
    { id: 'C4', guest: 'Giorgio Bianchi', avatar: 'GB', channel: 'wa', unread: 3, time: '08:15', snippet: '¿Pueden recomendarnos un restaurante?', ai: true, status: 'open' },
    { id: 'C5', guest: 'Sarah Johnson',   avatar: 'SJ', channel: 'bk', unread: 0, time: 'Ayer',  snippet: 'Thanks for the warm welcome!',    ai: false, status: 'resolved' },
    { id: 'C6', guest: 'A. Lindqvist',    avatar: 'AL', channel: 'em', unread: 1, time: 'Ayer',  snippet: 'Reserva #R-2047 confirmación',    ai: false, status: 'open' }
  ],

  chatSample: [
    { id: 1, type: 'in',   text: 'Hola, buenos días. Llegamos a las 14h aproximadamente.', time: '09:35' },
    { id: 2, type: 'in',   text: '¿Es posible dejar las maletas antes del check-in?', time: '09:35' },
    { id: 3, type: 'out',  text: '¡Buenos días María! Por supuesto, no hay problema. Pueden dejar las maletas en recepción desde las 10h sin coste.', time: '09:38' },
    { id: 4, type: 'note', text: '📝 Nota interna: huésped viaja con cuna extra. Confirmar con housekeeping antes del check-in.', time: '09:39' },
    { id: 5, type: 'in',   text: 'Perfecto, nos vemos a las 14h', time: '09:42' }
  ],

  channels: [
    { name: 'Booking.com', code: 'BK', status: 'ok',      sync: 'hace 2 min',  bookings: 128 },
    { name: 'Expedia',     code: 'EX', status: 'ok',      sync: 'hace 5 min',  bookings: 64 },
    { name: 'Airbnb',      code: 'AB', status: 'ok',      sync: 'hace 1 min',  bookings: 46 },
    { name: 'Google HPA',  code: 'GH', status: 'pending', sync: 'reconectar',  bookings: 12 },
    { name: 'Hotelbeds',   code: 'HB', status: 'ok',      sync: 'hace 8 min',  bookings: 28 },
    { name: 'TripAdvisor', code: 'TA', status: 'offline', sync: 'desactivado', bookings: 0 }
  ],

  kds: [
    { id: 'T-108', room: '305', guest: 'María Fernández', state: 'pending',   timer: '3 min', items: [{q:1,n:'Ensalada César'},{q:2,n:'Agua con gas'},{q:1,n:'Risotto trufa'}] },
    { id: 'T-109', room: '201', guest: 'Thomas Weber',    state: 'preparing', timer: '8 min', items: [{q:1,n:'Gazpacho'},{q:1,n:'Lubina a la sal'},{q:1,n:'Copa vino tinto'}] },
    { id: 'T-107', room: '402', guest: 'F. Rossi',        state: 'ready',     timer: '12 min', items: [{q:4,n:'Menú infantil'},{q:2,n:'Pasta boloñesa'},{q:1,n:'Postre casa'}] },
    { id: 'T-106', room: 'Salón · Mesa 4', guest: 'Walk-in', state: 'preparing', timer: '14 min', items: [{q:2,n:'Paella mariscos'},{q:1,n:'Sangría jarra'}] }
  ],

  // ============ RRHH ============
  // 10 empleados cubriendo todos los sectores
  employees: [
    { id:'E01', name:'Carmen Soto',       initials:'CS', role:'Housekeeper',       dept:'Operaciones · Pisos',      hireDate:'15/03/2022', seniority:'3 años, 8 meses', status:'en_turno',  shiftToday:'07:00–15:00', phone:'+34 652 143 876', email:'carmen@villaserena.es', dni:'45678912-A', ss:'29/12345678/90', iban:'ES21 2100...3251', brutoMes:1540, netoMes:1286, irpf:154, tipoContrato:'Indefinido 40h', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 07:00–15:00' },
    { id:'E02', name:'Dolores Pérez',     initials:'DP', role:'Housekeeper',       dept:'Operaciones · Pisos',      hireDate:'20/08/2024', seniority:'1 año, 2 meses',  status:'en_turno',  shiftToday:'07:00–15:00', phone:'+34 611 203 554', email:'dolores@villaserena.es', dni:'51234567-B', ss:'29/23456789/01', iban:'ES21 2100...8812', brutoMes:1540, netoMes:1289, irpf:151, tipoContrato:'Indefinido 40h', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 07:00–15:00' },
    { id:'E03', name:'Luis Marín',        initials:'LM', role:'Jefe de cocina',    dept:'Operaciones · F&B',        hireDate:'10/02/2019', seniority:'6 años, 8 meses', status:'en_turno',  shiftToday:'13:00–23:00', phone:'+34 663 897 341', email:'luis@villaserena.es', dni:'38457129-C', ss:'29/34567890/12', iban:'ES21 2100...4409', brutoMes:2850, netoMes:2270, irpf:470, tipoContrato:'Indefinido 40h', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 13:00–23:00' },
    { id:'E04', name:'Pedro Sánchez',     initials:'PS', role:'Ayudante cocina',   dept:'Operaciones · F&B',        hireDate:'02/09/2025', seniority:'1 mes',           status:'en_turno',  shiftToday:'13:00–23:00', phone:'+34 644 123 889', email:'pedro@villaserena.es', dni:'77889900-D', ss:'29/45678901/23', iban:'ES21 2100...5566', brutoMes:1420, netoMes:1215, irpf:118, tipoContrato:'Temporal 6 meses', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 13:00–23:00' },
    { id:'E05', name:'Ana Vidal',         initials:'AV', role:'Recepcionista',     dept:'Hospedaje · Recepción',    hireDate:'04/11/2023', seniority:'1 año, 11 meses', status:'en_turno',  shiftToday:'15:00–23:00', phone:'+34 626 471 320', email:'ana@villaserena.es', dni:'45121098-E', ss:'29/56789012/34', iban:'ES21 2100...7721', brutoMes:1680, netoMes:1402, irpf:188, tipoContrato:'Indefinido 40h', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 15:00–23:00' },
    { id:'E06', name:'Jorge Ramos',       initials:'JR', role:'Recepción nocturna',dept:'Hospedaje · Recepción',    hireDate:'12/01/2024', seniority:'1 año, 10 meses', status:'libre',    shiftToday:'23:00–07:00', phone:'+34 650 192 844', email:'jorge@villaserena.es', dni:'49872316-F', ss:'29/67890123/45', iban:'ES21 2100...3344', brutoMes:1820, netoMes:1498, irpf:252, tipoContrato:'Indefinido 40h · plus nocturnidad', convenio:'Hostelería Málaga', nextShift:'Hoy · 23:00–07:00' },
    { id:'E07', name:'Mónica Torres',     initials:'MT', role:'Camarera salón',    dept:'Operaciones · F&B',        hireDate:'08/06/2020', seniority:'5 años, 4 meses', status:'en_turno',  shiftToday:'11:00–19:00', phone:'+34 622 773 918', email:'monica@villaserena.es', dni:'42189763-G', ss:'29/78901234/56', iban:'ES21 2100...9988', brutoMes:1560, netoMes:1308, irpf:164, tipoContrato:'Indefinido 40h', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 11:00–19:00' },
    { id:'E08', name:'Javier Ruiz',       initials:'JR', role:'Mantenimiento',     dept:'Operaciones · Técnico',    hireDate:'15/09/2019', seniority:'6 años, 1 mes',   status:'en_turno',  shiftToday:'08:00–16:00', phone:'+34 657 889 203', email:'javier@villaserena.es', dni:'36721984-H', ss:'29/89012345/67', iban:'ES21 2100...1177', brutoMes:1920, netoMes:1555, irpf:289, tipoContrato:'Indefinido 40h', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 08:00–16:00' },
    { id:'E09', name:'Sara López',        initials:'SL', role:'Recepcionista',     dept:'Hospedaje · Recepción',    hireDate:'03/03/2026', seniority:'7 meses',         status:'vacaciones', shiftToday:'—', phone:'+34 611 445 876', email:'sara@villaserena.es', dni:'52398471-I', ss:'29/90123456/78', iban:'ES21 2100...6543', brutoMes:1600, netoMes:1340, irpf:170, tipoContrato:'Indefinido 40h · período prueba', convenio:'Hostelería Málaga', nextShift:'Lun 11 · 15:00–23:00' },
    { id:'E10', name:'Diego Fernández',   initials:'DF', role:'Camarero salón',    dept:'Operaciones · F&B',        hireDate:'15/07/2026', seniority:'3 meses',         status:'en_turno',  shiftToday:'13:00–23:00', phone:'+34 644 982 115', email:'diego@villaserena.es', dni:'54872169-J', ss:'29/01234567/89', iban:'ES21 2100...4432', brutoMes:1420, netoMes:1215, irpf:118, tipoContrato:'Temporal 6 meses', convenio:'Hostelería Málaga', nextShift:'Vie 1 · 13:00–23:00' }
  ],

  // Fichajes del día (patrón Tile — QR)
  clockinsToday: [
    { emp:'E01', name:'Carmen Soto',     time:'06:58', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E02', name:'Dolores Pérez',   time:'07:03', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E08', name:'Javier Ruiz',     time:'07:55', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E07', name:'Mónica Torres',   time:'10:58', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E03', name:'Luis Marín',      time:'12:52', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E04', name:'Pedro Sánchez',   time:'13:08', type:'in',  method:'QR',   status:'late',  note:'+8 min' },
    { emp:'E10', name:'Diego Fernández', time:'13:00', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E05', name:'Ana Vidal',       time:'14:58', type:'in',  method:'QR',   status:'ok',    note:'' },
    { emp:'E06', name:'Jorge Ramos',     time:'23:00', type:'in',  method:'—',    status:'planned', note:'turno nocturno' }
  ],

  // Turnos planificados próximos 7 días (vista semanal RRHH)
  weeklyShifts: {
    labels: ['Jue 31', 'Vie 1', 'Sáb 2', 'Dom 3', 'Lun 4', 'Mar 5', 'Mié 6'],
    rows: [
      { emp:'Carmen S.',   role:'HK',  shifts:['M','M','M','L','M','M','L'] },
      { emp:'Dolores P.',  role:'HK',  shifts:['M','M','L','M','M','M','M'] },
      { emp:'Luis M.',     role:'COC', shifts:['T','T','T','L','T','T','T'] },
      { emp:'Pedro S.',    role:'COC', shifts:['T','T','T','L','T','T','T'] },
      { emp:'Ana V.',      role:'REC', shifts:['T','T','L','T','T','T','L'] },
      { emp:'Jorge R.',    role:'REC', shifts:['N','N','N','L','L','N','N'] },
      { emp:'Mónica T.',   role:'SAL', shifts:['M','M','L','M','M','L','M'] },
      { emp:'Javier R.',   role:'MAN', shifts:['M','M','L','L','M','M','M'] },
      { emp:'Sara L.',     role:'REC', shifts:['V','V','V','V','V','V','V'] },
      { emp:'Diego F.',    role:'SAL', shifts:['T','T','T','L','T','T','T'] }
    ],
    legend: { M:'Mañana (07–15)', T:'Tarde (13–23)', N:'Noche (23–07)', L:'Libre', V:'Vacaciones' }
  },

  // Nómina mes en curso (octubre)
  payroll: {
    month: 'Octubre 2026',
    totalBruto: 17350,
    totalNeto: 14178,
    totalIrpf: 2074,
    totalSS: 1098,
    totalCost: 22650,
    receiptsEmitted: 6,
    receiptsPending: 4,
    nextCloseDate: '31/10/2026',
    nextPayDate: '05/11/2026'
  },

  // Documentos por empleado (muestra para Carmen E01)
  employeeDocs: {
    E01: [
      { type:'DNI',       title:'DNI vigente',               date:'Expira 15/08/2032', status:'ok',      icon:'id-card' },
      { type:'Contrato',  title:'Contrato indefinido 40h',   date:'Firmado 15/03/2022', status:'ok',     icon:'file-text' },
      { type:'PRL',       title:'Curso Prevención Riesgos',  date:'Vence 02/2027',      status:'ok',      icon:'shield-check' },
      { type:'Nómina',    title:'Recibo nómina septiembre',  date:'Emitido 05/10/2026', status:'ok',      icon:'file-check' },
      { type:'Nómina',    title:'Recibo nómina octubre',     date:'Pendiente emisión',  status:'pending', icon:'clock' },
      { type:'IT',        title:'Alta Seguridad Social',     date:'15/03/2022',          status:'ok',     icon:'check-circle-2' }
    ]
  },

  // ============ OPERACIONES — tasks del día (patrón Tile) ============
  opsTasks: [
    { id:'OT01', sector:'Pisos',    title:'Limpiar hab. 102 (salida 10:00)',   assignee:'Carmen S.',  status:'done',       priority:'alta',  time:'10:30' },
    { id:'OT02', sector:'Pisos',    title:'Limpiar hab. 202 (salida 11:00)',   assignee:'Dolores P.', status:'in_progress',priority:'alta',  time:'11:10' },
    { id:'OT03', sector:'Pisos',    title:'Limpiar hab. 204 (salida 10:30)',   assignee:'Carmen S.',  status:'pending',    priority:'alta',  time:'' },
    { id:'OT04', sector:'Pisos',    title:'Inspección hab. 305',               assignee:'Carmen S.',  status:'pending',    priority:'media', time:'' },
    { id:'OT05', sector:'Cocina',   title:'Mise en place servicio comida',     assignee:'Luis M.',    status:'in_progress',priority:'alta',  time:'13:10' },
    { id:'OT06', sector:'Cocina',   title:'Reposición cámaras frescos',        assignee:'Pedro S.',   status:'pending',    priority:'media', time:'' },
    { id:'OT07', sector:'Cocina',   title:'Preparar desayunos mañana',         assignee:'Pedro S.',   status:'pending',    priority:'baja',  time:'22:00' },
    { id:'OT08', sector:'Salón',    title:'Montaje grupo Weber · mesa 12 pax', assignee:'Mónica T.',  status:'in_progress',priority:'alta',  time:'12:30' },
    { id:'OT09', sector:'Salón',    title:'Limpieza terraza + reposición',     assignee:'Diego F.',   status:'done',       priority:'media', time:'12:45' },
    { id:'OT10', sector:'Técnico',  title:'Reparar grifo hab. 104',            assignee:'Javier R.',  status:'in_progress',priority:'alta',  time:'10:00' },
    { id:'OT11', sector:'Técnico',  title:'Revisar AC hab. 302',               assignee:'Javier R.',  status:'pending',    priority:'media', time:'' },
    { id:'OT12', sector:'Técnico',  title:'Control piscina (pH + cloro)',      assignee:'Javier R.',  status:'done',       priority:'baja',  time:'09:30' }
  ],

  // Mantenimiento — tickets abiertos
  maintenance: [
    { id:'M-412', title:'Fuga grifo baño', room:'104', opened:'29/10 10:15', priority:'alta',  status:'in_progress', assignee:'Javier R.' },
    { id:'M-413', title:'AC no enfría',    room:'302', opened:'30/10 18:40', priority:'media', status:'pending',     assignee:'Javier R.' },
    { id:'M-414', title:'Puerta armario descolgada', room:'207', opened:'31/10 09:12', priority:'baja', status:'pending', assignee:'—' }
  ],

  // ============ FINANZAS ============
  finance: {
    monthRevenue: 142380,
    monthRevenueDelta: +12,
    cashFlow30: { income: 142380, expense: 98470, net: 43910 },
    pendingCollection: 1248,
    pendingPayments: 3420,
    nextInvoices: [
      { to:'Weber Reisen GmbH', amount: 820, dueDate:'05/11', status:'draft' },
      { to:'Grupo Rossi (B2B)', amount: 1150, dueDate:'09/11', status:'draft' }
    ],
    cashFlow7: [4200, 3850, 4870, 5120, 4680, 4950, 4870] // último = hoy
  },

  // Guest view
  guest: {
    name: 'María', fullName: 'María Fernández López',
    room: '305', checkin: '31 oct 2026', checkout: '03 nov 2026', nights: 3,
    reservationId: 'R-2041', adults: 2, children: 0,
    pricePerNight: 145, taxes: 13.05, totalPaid: 435, extras: 48, pendingBalance: 48
  },

  services: [
    { cat: 'Limpieza',    name: 'Cambio de toallas',    desc: 'Entrega en 15 min',          price: 0,  icon: '🧺' },
    { cat: 'Limpieza',    name: 'Limpieza extra',       desc: 'Hoy antes de las 18h',       price: 15, icon: '🧹' },
    { cat: 'Room Service',name: 'Desayuno continental', desc: '7–11h · servido en habit.',  price: 18, icon: '🥐' },
    { cat: 'Room Service',name: 'Cena ligera',          desc: 'Carta nocturna',             price: 32, icon: '🍽' },
    { cat: 'Bar',         name: 'Botella de vino',      desc: 'Albariño DO Rías Baixas',    price: 28, icon: '🍷' },
    { cat: 'Bar',         name: 'Minibar premium',      desc: 'Reposición nocturna',        price: 12, icon: '🥂' },
    { cat: 'Extras',      name: 'Late check-out',       desc: 'Hasta las 15h · +50% noche', price: 72, icon: '🕐' },
    { cat: 'Extras',      name: 'Parking cubierto',     desc: '24h · plaza asignada',       price: 18, icon: '🅿️' }
  ],

  // Housekeeping queue para el empleado (vista limpieza)
  hkQueue: [
    { room: '102', priority: 'alta',   state: 'dusk',      guest: 'A. García salió 10:00',  type: 'Standard',  checkIn: 'Nuevo huésped 15:30' },
    { room: '202', priority: 'alta',   state: 'dusk',      guest: 'M. Rossi salió 11:00',   type: 'Superior',  checkIn: 'Libre' },
    { room: '204', priority: 'media',  state: 'dusk',      guest: 'J. Dubois salió 10:30',  type: 'Superior',  checkIn: 'Nuevo huésped 18:00' },
    { room: '104', priority: 'baja',   state: 'solar',     guest: 'Fontanería · ducha',     type: 'Standard',  checkIn: 'Fuera serv.' },
    { room: '305', priority: 'media',  state: 'lightning', guest: 'Lista p/ inspección',    type: 'Superior',  checkIn: 'Nuevo huésped 14:00' },
    { room: '301', priority: 'baja',   state: 'mint',      guest: 'Lista',                  type: 'Suite',     checkIn: '--' },
    { room: '101', priority: 'baja',   state: 'mint',      guest: 'Lista',                  type: 'Standard',  checkIn: '--' }
  ]
};
