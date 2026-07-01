# 06 · Ingeniería de Flujos y Consumo

Proyecto C-4 · Cuesta de Cayma N°4, Cayma, Arequipa

---

> Tipo de cambio referencial en todo el capítulo: **S/ 3.75 = USD 1.00**.

## 1. Tesis: la arquitectura es la máquina de ventas

En un club boutique de 350 personas de aforo no se compite por volumen: se compite por **gasto por cabeza y por minuto de estancia**. El Proyecto C-4 no confía ese resultado al esfuerzo comercial de la noche, sino al plano. Cada transición del recorrido —cada puerta, cada escalera, cada baranda— está posicionada para elevar la disposición a consumir, y cada punto de venta está donde el flujo natural del cliente lo obliga a pasar frente a él.

Tres principios rigen el diseño de piso:

1. **El descenso es un embudo emocional.** De la vereda a La Catedral (−10.5 m) hay una secuencia de revelaciones que eleva la excitación y el compromiso con la noche. Cliente más comprometido = ticket más alto.
2. **Nadie camina en vano.** Todo trayecto obligatorio (llegar, ir al baño, volver, subir, salir) pasa frente a un punto de venta o de upsell.
3. **El VIP nunca espera y nunca ve la operación.** El mezzanine tiene barra de servicio ciega, baños propios y hosts dedicados: cero fricción, cero cola, cero contacto con la logística.

## 2. Mapa del recorrido del cliente

Secuencia física exacta según planos (fuente única `levels.js`):

| # | Etapa | Nivel / cota | Zona (m² · aforo) | Función en el embudo de consumo |
|---|---|---|---|---|
| 1 | **Drop-off** | P1 vereda ±0.0 | Bahía drop-off (27 m²) | Llegada 100 % taxi/aplicativo: puerta del auto → puerta del edificio en 6 pasos, bajo marquesina ámbar. Sin estacionamiento propio: nadie llega "a ver"; todo el que llega, entra a gastar. |
| 2 | **Recepción & puerta discreta** | P1 ±0.0 | Recepción (28 m² · 15) | Host con lista de referidos, sin taquilla ni letrero. La validación social ("estás en la lista") es el primer disparador de gasto: quien pasó el filtro consume como quien pertenece. Un solo haz cenital sobre la puerta de acero con el símbolo. |
| 3 | **Esclusa & guardarropa** | S−1 −3.5 | Esclusa (10 m² · 8) | Doble puerta acústica en cascada (45 dB de atenuación): el silencio total y el túnel de luz ámbar generan expectativa pura. Guardarropa con ticket digital: manos libres = copa en mano. |
| 4 | **Lounge — Antesala** | S−1 −3.5 | Lounge (30 m² · 50) | Al cruzar la segunda hoja aparece el vacío: la pista se ve 7 m más abajo. Primera copa casi inmediata en la barra del lounge (esquina este, a la vista desde la esclusa). Música propia a 95 dB máx.: aún se conversa, aún se ordena con calma —el ticket de coctelería de autor se decide aquí, no en el ruido. |
| 5 | **Balcón al vacío** | S−1 −3.5 | Balcón (31 m² · 40) | El mirador del club: baranda de vidrio sobre La Catedral, pista con 8–10 dB menos. **Repisas de apoyo para copas a lo largo de la baranda**: consumo de pie sin mesa, sin compromiso de sentarse, con la copa siempre a mano. Zona de rotación rápida de segundas y terceras rondas. |
| 6 | **Descenso al mezzanine** | S−1 → S−2 | Escalera del vacío (lado este) | La escalera bordea el vacío: se baja viendo la fiesta. El que baja ya decidió quedarse. |
| 7 | **Mezzanine VIP** | S−2 −7.0 | 7 boxes (52 m² · 70) + barra ciega + baños VIP | Techo de gasto de la casa: consumo mínimo por box, servicio por host, ritual de botella con cue de luces. El VIP no baja por su bebida jamás. |
| 8 | **La Catedral** | S−3 −10.5 | Pista (86 m² · 120) + barra principal (20 m² · 30) | Clímax: vacío de ~9.6 m, kinetic array, muro LED de 6 × 6.5 m. Menú corto de alta rotación en la barra de sillar de 7.5 m con 4 estaciones POS. |
| 9 | **El Secreto** | S−1 −3.5 | Speakeasy (36 m² · 35) | Capa final del embudo, solo VIP top: coctelería de autor, ticket unitario más alto del edificio por asiento. |

**Por qué cada transición sube la propensión a consumir.** El recorrido alterna compresión y liberación: bahía abierta → recepción íntima → esclusa oscura y silenciosa → lounge con el vacío revelado → balcón suspendido → catedral de 9.6 m de altura. Cada compresión eleva la expectativa; cada liberación la descarga en un punto de venta situado exactamente en la línea de visión (barra del lounge al salir de la esclusa; barra principal al pie de la escalera del vacío en S−3, zona z 8.3–10.7, justo donde desembarca el cliente). La psicología es simple y medible: la primera copa se pide antes de los 4 minutos de haber cruzado la esclusa, y cada nivel descendido añade compromiso ("sunk cost" emocional) que se convierte en rondas adicionales y ascenso de categoría (trago de pozo → autor → botella).

## 3. Posiciones deliberadas: cuatro decisiones de plano que venden solas

### 3.1 Barra principal entre la pista y los baños (S−3)

La barra de sillar de 7.5 m ocupa la franja z 8.2–10.8; la pista, z 11–25; los baños generales, z 3.4–7.6. **Todo retorno del baño a la pista pasa frente a la barra** — sin excepción, porque no existe otro camino. Con 120 personas en pista y un ciclo de baño de ~45–60 min por persona, la barra recibe entre 120 y 160 pasadas frontales adicionales por hora que no dependen de la sed: dependen de la fisiología. La barra está iluminada en ámbar (cinta bajo encimera, sillar retroiluminado, vitrina-museo en la espalda): es el objeto más luminoso y legible del trayecto de vuelta.

### 3.2 Barra de servicio ciega del mezzanine (S−2)

9 m² de barra solo para mozos (zona x 0.3–2.6, z 3.4–7.6), con estación de rituales de botella, cava fría y POS dedicado. **El VIP nunca hace cola: pide a su host y el host despacha en la ciega.** Efectos directos: (a) el gasto VIP no está limitado por la fricción de pedir; (b) las botellas salen escoltadas y con cue de luces, nunca "por la barra"; (c) el mezzanine no genera tráfico descendente hacia la barra principal, que queda íntegra para la pista. La ciega se abastece desde la bodega VIP de S−2 (15 m², vinos y destilados premium, montacargas propio).

### 3.3 Repisas de apoyo en el balcón (S−1)

31 m² de galería de pie con baranda de vidrio y **repisa corrida para copas**: el cliente consume sin mesa, sin reserva y sin mínimo. Es la zona de mayor rotación de tragos por m² del club: se mira la pista, se conversa (8–10 dB menos que abajo) y se vuelve a la barra del lounge, a 10 pasos. El balcón convierte a 40 personas "sin mesa" en consumidores de ritmo alto en vez de estorbos de circulación.

### 3.4 Baños como zona de reset con programa propio

Los tres núcleos de baños (S−3 generales: 6 cubículos unisex + 2 accesibles; S−2 VIP: 4 cubículos + tocador con amenities y atención personal; S−1 lounge: 3 cubículos + tocador) tienen **programa musical propio a bajo nivel y luz cálida 2200 K**. No son un pasillo triste: son un reset sensorial que devuelve al cliente descansado —y con el lavamanos monolítico de piedra volcánica y espejo retroiluminado de S−3 como *zona selfie controlada*: el único punto del club donde la foto está diseñada (ver capítulo 08). Cliente reseteado = 20–30 minutos más de estancia útil.

## 4. Sistema cashless total

El club **no acepta efectivo en ningún punto** (el café y el restaurante sí operan medios convencionales de día).

| Componente | Especificación |
|---|---|
| Medio de pago | Pulsera o tarjeta NFC entregada en recepción, vinculada en 20 s a tarjeta de crédito/débito (tokenizada) o a la cuenta de miembro. |
| Tabs por box | Cada box abre un tab único contra el consumo mínimo; cualquier invitado del box carga al tab con su pulsera. Cierre con un toque del host, división de cuenta opcional en el momento. |
| Propina digital | Sugerencias 10 / 13 / 15 % en cada cierre; la propina se distribuye por pool de zona vía planilla, trazable. |
| Recargas | No existen "recargas": es pospago tokenizado con preautorización (S/ 500 general, S/ 3,000 boxes). Cero saldo perdido, cero fila de recarga. |
| Datos | Cada transacción alimenta el CRM de hospitalidad (P3): qué bebe, cuándo, en qué zona, con qué ritmo. El cashless es también el sensor del negocio. |
| POS | 4 estaciones en barra principal, 1 en barra del lounge, 1 dedicado en la ciega VIP, 1 en El Secreto, handhelds para hosts y runners. |

Beneficios operativos medibles: −25 a −35 % de tiempo de transacción por trago, cero cuadre de caja, cero merma de efectivo, y un mapa de calor de consumo por zona y por hora desde la primera noche.

## 5. Tiempos de servicio objetivo

| Servicio | Objetivo | Cómo se cumple |
|---|---|---|
| Trago en barra principal | **< 90 s** desde contacto visual | Menú corto (§8), batch premium, hielera de flujo continuo, 4 POS, layout de estación en "V". |
| Trago en barra del lounge | < 2 min | Carta de autor pero mise en place completa; 2 bartenders en pico. |
| Pedido de box (bebida) | **< 4 min** | Host toma pedido en handheld → ciega despacha → runner sube; ruta host-ciega-box < 25 m. |
| Ritual de botella | < 8 min desde confirmación | Botellas frías en cava de la ciega, cue de luces pre-programado por box (DMX), escolta de 2 personas. |
| Room service de boxes (comida) | < 12 min | Cocina P2 → montaplatos → apoyo S−2 → runner. Menú nocturno corto (ver capítulo 07). |
| El Secreto | < 5 min por cóctel | 12 referencias fijas, estación completa, 35 asientos como máximo. |
| Reposición de hielo/cristalería | Ciclo de 20 min | Barbacks en bucle bodega–barra vía montacargas del backstage S−3. |

## 6. Dotación de personal de piso por noche

Base: noche pico (viernes/sábado, aforo 320–350). Jueves opera con ~70 % de esta dotación.

| Zona | Puesto | Pico | Ratio de diseño |
|---|---|---|---|
| Bahía / puerta (P1) | Host de puerta + seguridad de acceso | 1 + 2 | — |
| Recepción (P1) | Hosts de lista / pulseras NFC | 2 | 1 por cada ~90 ingresos/h |
| Esclusa (S−1) | Guardarropa | 1 | ticket digital, 1 posición |
| Lounge + balcón (S−1) | Bartenders / barback / mozos de piso | 2 / 1 / 2 | 1 bartender por 45 pax de zona |
| Mezzanine VIP (S−2) | Hosts de box | 4 | **1 host por 2 boxes** (7 boxes) |
| Mezzanine VIP (S−2) | Bartenders ciega / barback / runners | 2 / 1 / 3 | 1 runner por ~2.3 boxes |
| Baños VIP (S−2) | Atención de tocador | 1 | — |
| Pista + barra principal (S−3) | Bartenders / barbacks | 4 / 2 | 1 bartender por 35–40 pax de pista |
| Baños generales (S−3) | Atención / orden | 1 | — |
| El Secreto (S−1) | Host propio + bartenders | 1 + 2 | 35 asientos |
| Transversal | Runners de bodega (montacargas) | 2 | bucle de 20 min |
| Transversal | Jefe de piso + jefe de barras | 1 + 1 | — |
| Seguridad interior | Perfil hospitality, sin uniforme táctico | 4 | 1 por ~85 pax |
| **Total piso noche pico** | | **40** | ~1 colaborador por 8.5 clientes |

## 7. KPIs de piso

| KPI | Definición | Objetivo año 1 | Fuente de dato |
|---|---|---|---|
| Gasto por cabeza por zona | Consumo total zona / personas únicas zona | Ver tabla §9 | Cashless + conteo NFC |
| Rotación de box | Tabs cerrados por box por noche | ≥ 1.3 (viernes), 1.0 (sábado: una sola fiesta larga) | Tabs |
| % ocupación de boxes | Boxes vendidos / 7 | ≥ 85 % vie–sáb, ≥ 60 % jue | Reservas CRM |
| % ocupación de aforo | Pico de personas / 350 | ≥ 80 % vie–sáb | Conteo de acceso |
| Tiempo medio de estancia | Salida − ingreso (pulsera) | ≥ 3.5 h general, ≥ 4.5 h boxes | NFC |
| Tiempo de servicio barra | Contacto visual → entrega | < 90 s (P90) | Muestreo + POS |
| Mix de venta | % botellas / cócteles / cerveza | 45 / 40 / 15 en valor | POS |
| Ingreso por noche | Total cashless | S/ 95,000–120,000 (USD 25,300–32,000) sábado pico | POS |
| Merma de barra | Costo teórico vs. real | < 2.5 % | Inventario semanal |
| Conversión lounge→club | % de ingresos que descienden de S−1 | > 75 % antes de la 1:30 | NFC por nivel |

## 8. Tácticas anti-cuello de botella

- **Hielera de flujo continuo en barra principal** (especificada en planos): el hielo cae por gravedad a cada estación; ningún bartender abandona su puesto por hielo. Los barbacks reponen cristalería y garnish en ciclos de 20 min vía montacargas del backstage (S−3, salida al Pasaje Peatonal: la logística jamás cruza al público).
- **Batch cocktails premium**: los 4 cócteles de mayor rotación se preparan en batch diario (control de merma y consistencia), se terminan a la vista (cítrico, top, garnish). Resultado: cóctel de autor en tiempos de highball.
- **Menú corto de alta rotación en pista vs. carta amplia en boxes**: la barra principal vende 12 referencias (4 batch, 4 highballs, 2 cervezas, 2 sin alcohol); la carta completa de autor vive en el lounge, los boxes y El Secreto, donde hay tiempo y margen. El menú corto es la táctica número uno para sostener < 90 s.
- **Doble frente de barra**: los 7.5 m de la barra principal operan 4 estaciones espejadas; en pico se abre "modo dos filas" con runners que despachan pedidos simples por los extremos.
- **Preautorización NFC**: elimina el cuello clásico (pago), no solo lo acelera.
- **El balcón como válvula**: cuando la pista llega a 110–120, seguridad modula el descenso desde S−1 y el balcón (40 pax, repisas, propia oferta desde la barra del lounge) absorbe la espera convirtiéndola en consumo, no en cola.

## 9. Gasto medio objetivo por zona (por cabeza, por noche)

| Zona | Aforo de diseño | Gasto medio objetivo | USD aprox. | Palancas principales |
|---|---|---|---|---|
| Pista — La Catedral (S−3) | 120 | S/ 170 | 45 | Menú corto < 90 s, retorno de baños frente a barra |
| Lounge — Antesala (S−1) | 50 | S/ 220 | 59 | Primera copa < 4 min, coctelería de autor |
| Balcón al vacío (S−1) | 40 | S/ 200 | 53 | Repisas de apoyo, rotación de rondas |
| Boxes VIP — Galería Oeste (S−2, 4 boxes · 40 pax) | 40 | S/ 480 | 128 | Mínimo por box S/ 2,500; host + ciega |
| Boxes VIP — Palco Frontal (S−2, 3 boxes · 30 pax) | 30 | S/ 650 | 173 | Mínimo por box S/ 4,000 (mejor vista de la casa) |
| El Secreto (S−1) | 35 | S/ 380 | 101 | 12 cócteles de autor + pairing |
| **Promedio ponderado club** | 315 útiles | **≈ S/ 290** | **≈ 77** | — |

Con 320 asistentes y S/ 290 de gasto medio ponderado, la noche pico rinde **≈ S/ 93,000 (USD 24,800)** solo en piso, sin contar cover de eventos especiales ni ingresos de El Secreto por reserva. La arquitectura —no el descuento, no la publicidad— es la que sostiene ese número.
