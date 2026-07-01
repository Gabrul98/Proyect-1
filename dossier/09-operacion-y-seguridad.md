# 09 · Operación y Seguridad

Proyecto C-4 · Cuesta de Cayma N°4, Cayma, Arequipa

---

## 1. Objeto y alcance

Manual de operación resumido de las cuatro unidades de negocio del edificio —café (P1), restaurante day-to-night (P2), salones corporativos (P3) y club (S−1 a S−3)— con foco en las dos variables que deciden la vida del proyecto en un distrito residencial premium y Ambiente Urbano Monumental (ZRE-CH): **seguridad de personas** y **convivencia vecinal**. El principio rector: el club opera con estándares de hotel de lujo, no de discoteca; la discreción no es estética, es procedimiento.

**Cifras base (fuente única `levels.js`):** aforo nocturno club **350** (pista "La Catedral" 120 · boxes VIP 70 · lounge + balcón 90 · speakeasy "El Secreto" 35 · circulación/barras 35); aforo diurno **110** (café 40 · restaurante 70); terraza de azotea 45 (solo día). Dos rutas de evacuación verticales: núcleo (frente, salida a Cacique Alpaca) y escalera posterior de servicio/evacuación (salida al Pasaje Peatonal).

## 2. Organigrama y dotación

### 2.1 Estructura

```
Gerente General (GG)
├── Gerente de Operaciones Nocturnas ── jefes de piso S−1/S−2/S−3, puerta, guardarropa
├── Chef Ejecutivo ───────────────────── cocina principal P2, cocina de apoyo P1, room service de boxes
├── Jefe de Barra ────────────────────── barra principal, lounge, El Secreto, barra ciega VIP, cava P2
├── Head of Hospitality / CRM ────────── hosts de box, membresías, perfiles de miembro (oficina P3)
├── Jefe Técnico AV ──────────────────── sonido, luces, video, kinetic array, booking técnico de artistas
├── Jefe de Seguridad ────────────────── equipo de puerta y pisos, CCTV, aforo digital, plan INDECI
└── Administración & Finanzas ────────── caja, compras, planilla, licencias
```

Siete reportes directos, una sola cadena de mando en la noche: durante operación de club, el **Gerente de Operaciones Nocturnas** es la máxima autoridad en sitio y el único que puede autorizar excepciones de puerta (con registro en CRM).

### 2.2 Headcount por noche de club

Ratio de seguridad **1:35** sobre aforo máximo (350) → **10 agentes**, sin uniforme táctico (traje oscuro, pinganillo), perfil de host-protector.

| Posición | Jue | Vie/Sáb | Ubicación |
|---|---:|---:|---|
| Gerente de operaciones nocturnas | 1 | 1 | Itinerante |
| Jefe de piso / caja-admin | 2 | 2 | S−1 y S−3 |
| Hosts de puerta y drop-off | 2 | 2 | Bahía P1 / Cacique Alpaca |
| Host de recepción (lista de referidos) | 1 | 1 | Recepción P1 |
| Seguridad (incl. jefe de seguridad y operador CCTV) | 10 | 10 | Puerta 3 · S−1 2 · S−2 2 · S−3 2 · CCTV 1 |
| Guardarropa | 1 | 1 | Esclusa S−1 |
| Bartenders (barra principal 4 · lounge 2 · El Secreto 2 · barra ciega VIP 2) | 10 | 11 | S−3/S−1/S−2 |
| Barbacks | 3 | 3 | Todas las barras |
| Hosts de box (1 por box) | 7 | 7 | Mezzanine S−2 |
| Runners de servicio | 2 | 3 | S−1/S−2 |
| Hospitality/CRM en piso | 2 | 3 | Itinerante + El Secreto |
| Técnica AV (sonido 1 · luces/video 1) | 2 | 2 | Backstage S−3 / cabina |
| Cocina nocturna (mesas frías, room service de boxes) | 3 | 3 | P2 + apoyo S−2 |
| Limpieza continua | 2 | 2 | Baños S−1/S−2/S−3 |
| Paramédico certificado | — | 1 | Sala de primeros auxilios P1 |
| **Total por noche** | **48** | **52** | + DJ/artistas invitados |

### 2.3 Dotación semanal (todas las unidades)

| Unidad | Planilla fija | Por turno / eventuales | Total personas/semana |
|---|---:|---:|---:|
| Club (jue–sáb) | 26 | 26 | 52 |
| Restaurante (mar–dom) | 14 | 4 | 18 |
| Café + brunch azotea (diario) | 8 | 3 | 11 |
| Salones corporativos (lun–jue) | 2 | 3 | 5 |
| Administración, CRM, mantenimiento, seguridad diurna | 10 | 2 | 12 |
| **Total** | **60** | **38** | **~98 personas (≈ 62 FTE)** |

Nota: hay rotación interna deliberada (mozos de restaurante refuerzan noches de club; baristas cubren brunch) para elevar el ingreso del equipo y retener talento — ver riesgo de rotación en cap. 10.

## 3. Horarios de las cuatro unidades

| Unidad | Días | Horario | Observaciones |
|---|---|---|---|
| Café (P1) + terraza azotea | Diario | 07:00–20:00 · terraza sáb/dom 09:00–**18:00** | Terraza sin música exterior; cierre 18:00 es compromiso vecinal irrevocable |
| Restaurante (P2) | Mar–Dom | Almuerzo 12:00–16:00 · Cena 19:00–23:00 (jue–sáb modo night hasta 01:00, interior) | Day-to-night: a las 23:00 baja la luz y se vuelve antesala del club |
| Salones corporativos (P3) | Lun–Jue | 08:00–19:00 (eventos privados hasta 22:00 con autorización de GG) | Directorios, capacitaciones, lanzamientos |
| Club (S−1/S−2/S−3) | Jue–Vie–Sáb | 22:30–04:00 (último ingreso 02:00) | + eventos privados (buy-outs) cualquier día, mismas reglas |

Toda la operación nocturna ocurre **bajo rasante y box-in-box**: a la hora de cierre de la terraza (18:00), el exterior del edificio queda acústicamente en reposo hasta el día siguiente.

## 4. Protocolo de puerta

1. **Pre-registro obligatorio.** No existe taquilla ni venta en puerta. Todo asistente llega referido por un miembro o está en lista de evento; recibe un **pase digital** (QR dinámico + nombre) válido para esa noche. Fase 2: membresía anual con credencial digital en wallet.
2. **Llegada 100 % drop-off.** El host de bahía coordina por app la llegada escalonada de taxis/aplicativos; puerta del auto → puerta del edificio en 6 pasos, sin fila visible en la vereda. Nunca se forma cola en Cacique Alpaca (ver §7).
3. **Verificación en recepción (P1).** Host de recepción valida QR + documento de identidad (mayoría de edad estricta), cruza con CRM (historial, preferencias, incidencias). El conteo de aforo se incrementa al cruzar la esclusa.
4. **Rechazo elegante.** Si alguien llega sin referido válido: no hay discusión en la puerta. Guion fijo: *"Esta noche es un evento privado; con gusto lo registramos para que un miembro pueda invitarlo"* — se toma el contacto y se deriva al café/restaurante si está abierto. La seguridad solo interviene ante insistencia; el episodio se registra en CRM. Nadie es humillado: el rechazado de hoy es el socio de mañana.
5. **Derecho de admisión y no discriminación.** El filtro es el referido y la conducta, nunca el aspecto, origen o condición: política escrita, capacitación semestral, cumplimiento del Código de Protección y Defensa del Consumidor (Ley 29571 — el derecho de admisión se ejerce con criterios objetivos publicados).
6. **Seguridad discreta.** 10 agentes (ratio 1:35), sin uniforme táctico, entrenados en desescalamiento verbal, primeros auxilios y evacuación. Prohibido el contacto físico salvo defensa de terceros; toda intervención se reporta esa misma noche.

## 5. Seguridad y cumplimiento normativo

### 5.1 Aforo digital en tiempo real

- Sensores de **conteo entrada/salida** en la esclusa de S−1 (punto único de acceso al club) + verificación manual del host; dashboard en vivo para gerencia, puerta y CCTV.
- Aforo por zona monitoreado por los jefes de piso: pista 120, boxes 70, lounge+balcón 90, El Secreto 35. Al llegar a **330** (94 %) la puerta pasa a "one-out-one-in"; a **350** se detiene el ingreso sin excepciones, incluida gerencia.
- Registro histórico exportable: es la evidencia ante fiscalizaciones municipales e ITSE.

### 5.2 CCTV

| Zona | Cámaras | Nota |
|---|---:|---|
| Bahía drop-off y fachada (Cacique Alpaca) | 2 | Incluye lectura de placas de la bahía |
| Recepción P1 y puerta de acero | 2 | Cobertura del punto de verificación |
| Esclusa, guardarropa y escaleras (núcleo + posterior) | 6 | Ambas rutas de evacuación, todos los niveles |
| Barras (principal, lounge, ciega VIP, cava P2, café) | 5 | Control de caja cashless y de servicio |
| Pista La Catedral y mezzanine | 4 | Vistas cruzadas del vacío |
| Backstage, bodegas, montacargas, cuarto de residuos | 4 | Control de inventario |
| Patio de luz y azotea técnica | 2 | Perimetral |
| **El Secreto** | **1 (solo barra)** | **Sin cámaras en el salón: privacidad por diseño. La cobertura de seguridad es humana (host + seguridad de piso)** |
| **Total** | **26** | Retención **30 días**, grabación cifrada, acceso restringido (jefe de seguridad + GG), protocolo de entrega solo ante requerimiento fiscal/policial |

Cumplimiento de la Ley 29733 (protección de datos personales): señalética de videovigilancia en accesos, banco de datos registrado.

### 5.3 Ley 30037, ITSE y protección INDECI

Marco aplicable: **Ley 30037** y normativa de espectáculos y establecimientos de reunión, **Reglamento de Inspecciones Técnicas de Seguridad en Edificaciones – ITSE (D.S. 002-2018-PCM)**, Norma A.130 (requisitos de seguridad) del RNE. El edificio se diseña para pasar la ITSE de riesgo alto sin observaciones:

- **Dos rutas de evacuación** independientes desde cada nivel: escalera del **núcleo** (salida a Cacique Alpaca) y **escalera posterior** de servicio/evacuación con salida al **Pasaje Peatonal** (accesible desde backstage S−3, apoyo S−2, zona de servicio S−1/P1). Ancho y presurización según A.130; puertas cortafuego con barra antipánico.
- **Luces de emergencia** autónomas en el 100 % de rutas, escaleras, baños y salas; **señalética fotoluminiscente** normalizada (salida, aforo por sala, extintores, zonas seguras).
- **Detección y alarma** centralizada (humo/temperatura), rociadores en sótanos y cocinas, extintores certificados por sector, gabinetes contra incendio; corte de sonido y encendido de luz general **automático** al activarse la alarma.
- **Plan de Seguridad INDECI** con cálculo de evacuación (aforo 350: tiempo objetivo < 3 min a punto de reunión), brigadas (evacuación, primeros auxilios, contraincendio) y **simulacros**: 2 al año con todo el personal + 1 walkthrough mensual por turno.
- **Capacitación**: inducción de seguridad obligatoria antes del primer turno; recertificación semestral (evacuación, extintores, RCP/DEA, desescalamiento). Registro documentado por persona.
- Cartel de **aforo visible por sala** y en recepción, conforme a licencia de funcionamiento.

### 5.4 Consumo responsable e incidentes médicos

- Prohibición absoluta de venta a menores y a personas en estado de intoxicación evidente; bartenders certificados en servicio responsable; agua sin costo en todas las barras.
- Programa "última milla": el host de bahía gestiona el taxi de retorno de cualquier cliente que lo requiera; nadie sale del edificio a buscar transporte a la calle.
- **Paramédico certificado en sitio viernes y sábado** (sala de primeros auxilios en P1, junto a servicio), botiquines y **DEA** en recepción y backstage; convenio de respuesta con clínica privada de Cayma (< 10 min) y protocolo escrito de derivación. Jueves y eventos: brigadista de primeros auxilios del propio staff + convenio activo.
- Todo incidente (médico, de conducta, de seguridad) genera un reporte esa misma noche, revisado por GG a la mañana siguiente; tres incidencias de un mismo invitado = pérdida del privilegio de referido.
- Política de tolerancia cero a sustancias ilegales: registro discreto de admisión, coordinación con PNP cuando corresponde, retiro sin escándalo.

## 6. Convivencia vecinal — compromiso público

El proyecto vive o muere por su relación con el pueblo tradicional de Cayma. Compromisos operativos, publicados y auditables:

1. **Cero ruido.** Todo el programa sonoro es subterráneo, box-in-box; nada suena al aire libre. **Monitoreo acústico continuo** con sensores en fachada y lindero posterior; inmisión nocturna ≤ 50 dB(A) (ECA zona residencial, D.S. 085-2003-PCM). **Reporte mensual** de niveles a disposición de la junta vecinal y la municipalidad. Limitadores sellados en todos los sistemas de sonido.
2. **Drop-off gestionado.** Hosts en bahía coordinan llegadas y salidas escalonadas; prohibido el uso de bocina (instrucción enviada al conductor por app), prohibido esperar estacionado en Cacique Alpaca. Convenio con playas de estacionamiento cercanas cubre el requerimiento normativo (~15 plazas) para personal y clientes que insistan en auto propio.
3. **Terraza cierra 18:00**, sin música exterior, todos los días, sin excepciones ni "eventos especiales".
4. **Línea directa de vecinos** (WhatsApp + teléfono) atendida por el gerente de turno, 24/7 en noches de operación; toda queja se responde en < 15 minutos y queda en bitácora revisada por el GG.
5. **Mantenimiento de fachada** y del frente de calle (limpieza diaria de vereda y bahía, iluminación tenue, cero publicidad luminosa) como obligación permanente en un Ambiente Urbano Monumental.
6. Salidas 02:00–04:00 en goteo gestionado por hosts: sin aglomeración en vereda, sin consumo en la calle.

## 7. Residuos y logística de proveedores

- **Cuarto de residuos refrigerado en P1** (zona de servicio): orgánicos fríos sin olores ni vectores; segregación en fuente (vidrio/orgánico/reciclable/general) con pesaje para KPI de mermas.
- **Todo movimiento logístico por el retiro posterior (Pasaje Peatonal), en horario diurno** (09:00–17:00, nunca dom): recepción de proveedores, retiro de residuos por EO-RS registrada, retorno de envases de vidrio al distribuidor. La fachada principal jamás ve una jaba ni una bolsa.
- Montacargas interno conecta la logística de P1 con las bodegas de S−2/S−3: el abastecimiento de barras se hace de día, el club nunca se abastece con público dentro.
- Aceites usados y residuos peligrosos (lámparas, baterías UPS) con manifiesto y operador autorizado.

## 8. Matriz de riesgos operativos

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|---|
| 1 | Queja vecinal por ruido → presión municipal | Baja | Muy alto | Box-in-box sobredimensionado, monitoreo continuo con reportes mensuales, limitadores sellados, línea directa < 15 min, terraza cierra 18:00 |
| 2 | Congestión/bocinas en Cacique Alpaca en horas pico | Media | Alto | Drop-off escalonado con hosts, instrucción anti-bocina por app, convenio de playas (~15 plazas), salidas en goteo |
| 3 | Exceso de aforo en fiscalización | Baja | Muy alto | Conteo digital entrada/salida con corte automático a 350, punto único de acceso, registro exportable, cartel por sala |
| 4 | Incidente médico grave (intoxicación, caída) | Media | Alto | Paramédico vie/sáb + DEA, brigadas capacitadas, convenio clínica < 10 min, barandas de vidrio acústico normadas en vacíos, servicio responsable de alcohol |
| 5 | Incendio/emergencia en sótanos | Baja | Crítico | 2 rutas de evacuación (núcleo + Pasaje Peatonal), detección + rociadores, corte automático de sonido y luz general, 2 simulacros/año, plan INDECI |
| 6 | Incidente de conducta / pérdida de control de puerta | Media | Medio | Ratio 1:35, desescalamiento verbal, rechazo elegante con guion, CRM de incidencias, tolerancia cero sustancias |
| 7 | Filtración de la ubicación / masificación del "secreto" | Media | Medio | Sin letrero ni redes con dirección, pase QR nominal de un solo uso, política anti-fotos en El Secreto (sin cámaras salvo barra), NDA en eventos privados |
| 8 | Corte eléctrico durante operación | Media | Medio | Grupo electrógeno insonorizado en azotea + UPS para emergencia, aforo y CCTV; protocolo de show-stop ordenado |
| 9 | Robo interno / mermas de barra | Media | Medio | Operación 100 % cashless, POS por barra, CCTV en todas las barras y bodegas, inventario ciego semanal |
| 10 | Fiscalización sanitaria (cocinas) | Baja | Medio | Cocina central única con trazabilidad, cuarto de residuos refrigerado, certificaciones del personal, autoinspección mensual del chef ejecutivo |

**Regla de oro operativa:** ante cualquier conflicto entre facturación y convivencia/seguridad, gana la convivencia. Una noche corta se recupera; la licencia social del barrio, no.
