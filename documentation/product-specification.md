# Product Specification — Dynamic Pricing Bar Platform (MVP)

> **Objetivo:** Este documento será el **prompt completo** para diseñar el prototipo inicial del MVP en **Figma** y guiar el desarrollo técnico. El sistema permite **variar precios en tiempo real** según horario y demanda, con **predicciones históricas (ML con TensorFlow)**, **multi‑tenant (varias sedes/brands)** y **multi‑usuario**. Stack: **Next.js 15 (App Router)**, **Tailwind CSS**, **shadcn/ui**, **API REST**, **Vercel + GitHub**, **Prisma + PostgreSQL**.

---

## 1) Visión del negocio

**Problema**
Los bares suelen fijar precios estáticos; pierden oportunidades de incrementar rotación en horas valle, optimizar margen en horas pico y mover inventario próximo a vencer. Tampoco aprovechan patrones de demanda por clima, día/feriado o eventos.

**Solución**
Plataforma SaaS para bares/restaurantes que:

* Ajusta **precios dinámicamente** en tiempo real (tickers tipo “bolsa”).
* Usa **Machine Learning (TensorFlow)** para **predecir demanda** y recomendar **multiplicadores de precio** por producto/sede/horario.
* Permite **crashes/promos programadas** para gamificar la compra.
* Opera con **multi‑tenant** (marcas/empresas), **multi‑sede** (locales) y **multi‑usuario** con roles.
* Provee **panel en vivo**, **pizarras de precios** (TV), **reportes** y **API**.

**Usuarios clave**

* **Owner / Admin del Tenant**: configura sedes, usuarios, políticas de precio y reglas ML.
* **Manager de Sede**: monitorea la demanda, lanza “crashes”, gestiona inventario y menús.
* **Bartender/Cajero**: usa la pizarra/pos y registra pedidos.
* **Analyst**: revisa reportes, compara A/B y ajusta estrategias.

**Casos de uso prioritarios**

1. **Pizarra de Precios en Vivo** (TV/monitor): lista de productos con precio fluctuante, alertas de crash, countdown de promos.
2. **Ajuste Automático**: cada X minutos el sistema recalcula precios por demanda real (órdenes/minuto), estacionalidad y reglas.
3. **Predicción**: cada hora/día se generan predicciones de demanda y un **precio recomendado** por producto.
4. **Eventos especiales**: programar campañas (Happy Hour, partido, feriado) para alterar elasticidad/multiplicadores.
5. **Reportes**: margen, rotación, % tiempo en crash, impacto de reglas, inventario crítico.

**Métrica norte (North Star)**
\- **Revenue Uplift por hora** y **Rotación de inventario** vs. precios estáticos.

**Éxito del MVP**

* 1–2 tenants activos, 2–3 sedes cada uno.
* 500+ pedidos/semana ingestados.
* Aumento ≥ **8–12%** de revenue/hora en pruebas A/B simples.

---

## 2) Alcance del MVP (qué sí / qué no)

**Incluye**

* Multi‑tenant, multi‑sede, multi‑rol.
* Catálogo de productos, inventario básico, órdenes y eventos de precio.
* Motor de **pricing** con reglas + **recomendación ML** (batch) → aplica **multiplicadores**.
* Pizarra en vivo (pantallas), panel de control, reportes básicos.
* API REST v1.
* Jobs programados (Vercel Cron) para snapshots y predicciones.

**No incluye (MVP)**

* Pagos en línea, POS fiscal, facturación electrónica.
* Streaming en tiempo real con Kafka (se simula con polling).
* Personalización avanzada del modelo (solo hiperparámetros básicos).

---

## 3) Roadmap (12 semanas)

**Fase 0 — Fundaciones (semana 1)**

* Repo GitHub, CI/CD en Vercel, base de datos Postgres (Railway/Supabase/Neon).
* Diseño de información, auth básica, shadcn/ui.

**Fase 1 — Core Operativo (semanas 2–5)**

* Multi‑tenant y roles.
* Productos, sedes, inventario, órdenes.
* Pizarra de precios (Live Board) y panel de control.
* Motor de precios con reglas y **snapshots** cada N min.

**Fase 2 — ML & Predicciones (semanas 6–8)**

* Ingesta histórica a **TimeseriesDemand**.
* Entrenamiento batch TensorFlow (ARIMA-like baseline + DNN simple).
* **Predictions** por producto/sede/horizonte (p. ej., 15–60 min).
* Reglas de aplicación de **precio recomendado** + **A/B (ε‑greedy)**.

**Fase 3 — Experiencia & Reportes (semanas 9–10)**

* Pizarra TV mejorada (ticker, alertas, countdown).
* Reportes de impacto (uplift, rotación, margen).
* Auditoría y API Keys.

**Fase 4 — Pulido y Piloto (semanas 11–12)**

* Hardening de seguridad, RLS en Postgres, límites de tasa.
* Pruebas piloto en 1–2 sedes, checklist de go‑live.

---

## 4) Flujo de datos y lógica de pricing

1. **Eventos**: Órdenes, inventario, calendario y manual overrides generan señales.
2. **Feature engineering**: hora/día, feriado, clima (placeholder), últimas ventas (rolling windows), nivel de stock.
3. **Modelo ML (batch)**: entrena con histórico y publica **Predictions** con `recommendedPrice` y `confidence`.
4. **Motor de Precios**: combina **Reglas** (piso/techo, horarios) + **recomendación ML** → **multiplier** final.
5. **Snapshots**: cada N minutos se escribe `PriceSnapshot` por producto/sede y se refleja en la **Pizarra**.

---

## 5) UX de referencia (para Figma)

**Pantallas**

* **Auth & Tenant Switcher**.
* **Dashboard**: ventas hora, top productos, próximos crashes, estado del motor.
* **Live Price Board (TV)**: lista de productos por categoría, precio actual, variación (↑ ↓ %), temporizador de crash, alertas sonoras.
* **Products**: CRUD, precios base, impuestos, elasticidad (placeholder).
* **Rules**: pisos/techos, horarios, campañas, crash manual con duración.
* **Orders**: feed en tiempo casi real, tickets.
* **ML Settings**: horizonte (min), agresividad del multiplicador, activar A/B.
* **Reports**: revenue uplift, rotación, % crash, margen contribución.
* **Users & Roles**: invitaciones, roles, API keys.

**Componentes (shadcn/ui)**
Cards, Tables, DataTable con filtros, Dialog/Sheet para acciones rápidas, Toaster para alertas, Tabs para vistas de producto, Badge para estado, Progress para KPIs.

---

## 6) API REST v1 (borrador)

* `POST /api/v1/auth/signin`
* `GET /api/v1/tenants` | `POST /tenants`
* `GET /api/v1/tenants/:tenantId/locations` | `POST`
* `GET /api/v1/tenants/:tenantId/users` | `POST` (invitaciones)
* `GET/POST /api/v1/tenants/:tenantId/products`
* `GET/POST /api/v1/tenants/:tenantId/rules`
* `GET/POST /api/v1/tenants/:tenantId/price-events` (crash, override)
* `GET /api/v1/tenants/:tenantId/locations/:locationId/price-snapshots?since=…`
* `GET/POST /api/v1/tenants/:tenantId/orders`
* `GET /api/v1/tenants/:tenantId/predictions?locationId=…&horizon=…`
* `POST /api/v1/tenants/:tenantId/apikeys`

**Auth**: JWT (NextAuth opcional), API Key para integración en pizarra TV.

---

## 7) Especificaciones no funcionales

* **Despliegue**: Vercel (prod, preview), CI GitHub Actions.
* **Base de datos**: PostgreSQL (Neon/Supabase/Railway).
* **Seguridad**: RLS por `tenantId` (policies), claves hashed (bcrypt/argon2), rate‑limit (middleware).
* **Observabilidad**: logs estructurados, trazas (OpenTelemetry opcional), métricas básicas.
* **Jobs**: Vercel Cron para snapshots (cada 1–5 min) y entrenamiento nocturno/por hora.
* **Internacionalización**: es‑PE en UI (MVP), monedas: PEN.

---

## 8) Variables de entorno (ejemplo)

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
JWT_SECRET=
VERCEL_ENV=
PRICE_SNAPSHOT_INTERVAL_MIN=1
ML_TRAIN_SCHEDULE_CRON=0 * * * *
API_RATE_LIMIT=100
```

---

## 9) Datos seed (ejemplo rápido)

* **Productos**: Pisco Sour (base 22.00), Gin Tonic (base 24.00), Lager 330ml (base 12.00), Nachos (base 28.00).
* **Sedes**: Miraflores (America/Lima), Barranco.
* **Reglas**: Happy Hour 18:00–20:00 (multiplier 0.85), Piso 0.7×, Techo 1.5×.

---

## 10) Modelo de datos — `schema.prisma` (MVP)

> Copiar y pegar en `/prisma/schema.prisma`. Ajustar provider y url.

```prisma
// ---------- Generators & Datasource ----------
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ---------- Enums ----------
enum Role {
  OWNER
  ADMIN
  MANAGER
  BARTENDER
  ANALYST
}

enum OrderStatus {
  OPEN
  PAID
  VOID
}

enum PriceEventType {
  ADJUSTMENT
  CRASH_START
  CRASH_END
  RULE_APPLIED
  MANUAL_OVERRIDE
}

enum PriceSource {
  BASE
  RULE
  ML_RECOMMENDATION
  MANUAL
}

enum TrainingStatus {
  QUEUED
  RUNNING
  SUCCEEDED
  FAILED
}

enum ActorType {
  USER
  API_KEY
  SYSTEM
}

// ---------- Core Multi-tenant ----------
model Tenant {
  id        String      @id @default(cuid())
  name      String
  slug      String      @unique
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  locations   Location[]
  memberships Membership[]
  users       User[]     @relation("TenantUsers")
  products    Product[]
  rules       PriceRule[]
  apiKeys     ApiKey[]
  audits      AuditLog[]
}

model Location {
  id        String    @id @default(cuid())
  tenantId  String
  tenant    Tenant    @relation(fields: [tenantId], references: [id])
  name      String
  slug      String
  address   String?
  timezone  String    @default("America/Lima")
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  priceSnapshots PriceSnapshot[]
  priceEvents    PriceEvent[]
  inventories   Inventory[]
  orders        Order[]
  demandSeries  TimeseriesDemand[]
  predictions   Prediction[]

  @@unique([tenantId, slug])
}

model User {
  id        String      @id @default(cuid())
  email     String      @unique
  name      String?
  image     String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  memberships Membership[]
  sessions    Session[]
  audits      AuditLog[] @relation("AuditActorUser")

  // Optional: relation to Tenants via memberships
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}

model Membership {
  id        String   @id @default(cuid())
  userId    String
  tenantId  String
  role      Role
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id])
  tenant Tenant @relation(fields: [tenantId], references: [id])

  @@unique([userId, tenantId])
}

// ---------- Catalog & Inventory ----------
model Product {
  id         String   @id @default(cuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  sku        String
  name       String
  category   String?
  basePrice  Decimal  @db.Decimal(10,2)
  taxRate    Decimal  @db.Decimal(4,2) @default(0.00)
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  priceSnapshots PriceSnapshot[]
  priceEvents    PriceEvent[]
  orderItems     OrderItem[]
  inventories    Inventory[]
  demandSeries   TimeseriesDemand[]
  predictions    Prediction[]

  @@unique([tenantId, sku])
}

model Inventory {
  id         String   @id @default(cuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  locationId String
  location   Location @relation(fields: [locationId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  quantity   Int      @default(0)
  lowStockThreshold Int @default(10)
  updatedAt  DateTime @updatedAt

  @@unique([tenantId, locationId, productId])
}

// ---------- Pricing Engine ----------
model PriceRule {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  name      String
  // Examples: time-of-day, floor/ceiling, campaign
  kind      String
  params    Json
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model PriceEvent {
  id          String         @id @default(cuid())
  tenantId    String
  tenant      Tenant         @relation(fields: [tenantId], references: [id])
  locationId  String?
  location    Location?      @relation(fields: [locationId], references: [id])
  productId   String?
  product     Product?       @relation(fields: [productId], references: [id])
  type        PriceEventType
  multiplier  Decimal?       @db.Decimal(6,3)
  price       Decimal?       @db.Decimal(10,2)
  note        String?
  startsAt    DateTime       @default(now())
  endsAt      DateTime?
  createdById String?
  createdAt   DateTime       @default(now())
}

model PriceSnapshot {
  id          String       @id @default(cuid())
  tenantId    String
  tenant      Tenant       @relation(fields: [tenantId], references: [id])
  locationId  String
  location    Location     @relation(fields: [locationId], references: [id])
  productId   String
  product     Product      @relation(fields: [productId], references: [id])
  price       Decimal      @db.Decimal(10,2)
  source      PriceSource
  multiplier  Decimal      @db.Decimal(6,3)
  createdAt   DateTime     @default(now())

  @@index([tenantId, locationId, productId, createdAt])
}

// ---------- Orders ----------
model Order {
  id          String     @id @default(cuid())
  tenantId    String
  tenant      Tenant     @relation(fields: [tenantId], references: [id])
  locationId  String
  location    Location   @relation(fields: [locationId], references: [id])
  cashierId   String?
  status      OrderStatus @default(OPEN)
  total       Decimal     @db.Decimal(10,2) @default(0.00)
  createdAt   DateTime    @default(now())

  items OrderItem[]
}

model OrderItem {
  id         String   @id @default(cuid())
  orderId    String
  order      Order    @relation(fields: [orderId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  qty        Int      @default(1)
  unitPrice  Decimal  @db.Decimal(10,2)
  finalPrice Decimal  @db.Decimal(10,2)
}

// ---------- ML & Analytics ----------
model TimeseriesDemand {
  id         String   @id @default(cuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  locationId String
  location   Location @relation(fields: [locationId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  ts         DateTime
  orders     Int      @default(0)
  unitsSold  Int      @default(0)
  revenue    Decimal  @db.Decimal(12,2) @default(0.00)

  @@index([tenantId, locationId, productId, ts])
}

model Prediction {
  id               String   @id @default(cuid())
  tenantId         String
  tenant           Tenant   @relation(fields: [tenantId], references: [id])
  locationId       String
  location         Location @relation(fields: [locationId], references: [id])
  productId        String
  product          Produproduct-spec.mdie
Perfecto Rodrigo 🚀 Aquí tienes el product-spec.md completo, con el schema.prisma terminado y ajustado para tu MVP de Dynamic Pricing Bar Platform. Lo puedes copiar directamente en tu repositorio (docs/product-spec.md y /prisma/schema.prisma).

⸻

📄 Product Specification — Dynamic Pricing Bar Platform (MVP)

Este documento es el prompt central para diseñar el prototipo en Figma y guiar el desarrollo técnico del MVP.

(👉 Todo lo anterior que escribiste en las secciones 1–9 se mantiene igual.
Aquí solo completo la parte faltante de 10) Modelo de datos).

⸻

10) Modelo de datos — schema.prisma (MVP)

// ---------- Generators & Datasource ----------
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ---------- Enums ----------
enum Role {
  OWNER
  ADMIN
  MANAGER
  BARTENDER
  ANALYST
}

enum OrderStatus {
  OPEN
  PAID
  VOID
}

enum PriceEventType {
  ADJUSTMENT
  CRASH_START
  CRASH_END
  RULE_APPLIED
  MANUAL_OVERRIDE
}

enum PriceSource {
  BASE
  RULE
  ML_RECOMMENDATION
  MANUAL
}

enum TrainingStatus {
  QUEUED
  RUNNING
  SUCCEEDED
  FAILED
}

enum ActorType {
  USER
  API_KEY
  SYSTEM
}

// ---------- Core Multi-tenant ----------
model Tenant {
  id        String      @id @default(cuid())
  name      String
  slug      String      @unique
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  locations   Location[]
  memberships Membership[]
  users       User[]     @relation("TenantUsers")
  products    Product[]
  rules       PriceRule[]
  apiKeys     ApiKey[]
  audits      AuditLog[]
}

model Location {
  id        String    @id @default(cuid())
  tenantId  String
  tenant    Tenant    @relation(fields: [tenantId], references: [id])
  name      String
  slug      String
  address   String?
  timezone  String    @default("America/Lima")
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  priceSnapshots PriceSnapshot[]
  priceEvents    PriceEvent[]
  inventories   Inventory[]
  orders        Order[]
  demandSeries  TimeseriesDemand[]
  predictions   Prediction[]

  @@unique([tenantId, slug])
}

model User {
  id        String      @id @default(cuid())
  email     String      @unique
  name      String?
  image     String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  memberships Membership[]
  sessions    Session[]
  audits      AuditLog[] @relation("AuditActorUser")
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  token        String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}

model Membership {
  id        String   @id @default(cuid())
  userId    String
  tenantId  String
  role      Role
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id])
  tenant Tenant @relation(fields: [tenantId], references: [id])

  @@unique([userId, tenantId])
}

// ---------- Catalog & Inventory ----------
model Product {
  id         String   @id @default(cuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  sku        String
  name       String
  category   String?
  basePrice  Decimal  @db.Decimal(10,2)
  taxRate    Decimal  @db.Decimal(4,2) @default(0.00)
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  priceSnapshots PriceSnapshot[]
  priceEvents    PriceEvent[]
  orderItems     OrderItem[]
  inventories    Inventory[]
  demandSeries   TimeseriesDemand[]
  predictions    Prediction[]

  @@unique([tenantId, sku])
}

model Inventory {
  id         String   @id @default(cuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  locationId String
  location   Location @relation(fields: [locationId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  quantity   Int      @default(0)
  lowStockThreshold Int @default(10)
  updatedAt  DateTime @updatedAt

  @@unique([tenantId, locationId, productId])
}

// ---------- Pricing Engine ----------
model PriceRule {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  name      String
  kind      String // Ej: "time-of-day", "floor/ceiling", "campaign"
  params    Json
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model PriceEvent {
  id          String         @id @default(cuid())
  tenantId    String
  tenant      Tenant         @relation(fields: [tenantId], references: [id])
  locationId  String?
  location    Location?      @relation(fields: [locationId], references: [id])
  productId   String?
  product     Product?       @relation(fields: [productId], references: [id])
  type        PriceEventType
  multiplier  Decimal?       @db.Decimal(6,3)
  price       Decimal?       @db.Decimal(10,2)
  note        String?
  startsAt    DateTime       @default(now())
  endsAt      DateTime?
  createdById String?
  createdAt   DateTime       @default(now())
}

model PriceSnapshot {
  id          String       @id @default(cuid())
  tenantId    String
  tenant      Tenant       @relation(fields: [tenantId], references: [id])
  locationId  String
  location    Location     @relation(fields: [locationId], references: [id])
  productId   String
  product     Product      @relation(fields: [productId], references: [id])
  price       Decimal      @db.Decimal(10,2)
  source      PriceSource
  multiplier  Decimal      @db.Decimal(6,3)
  createdAt   DateTime     @default(now())

  @@index([tenantId, locationId, productId, createdAt])
}

// ---------- Orders ----------
model Order {
  id          String      @id @default(cuid())
  tenantId    String
  tenant      Tenant      @relation(fields: [tenantId], references: [id])
  locationId  String
  location    Location    @relation(fields: [locationId], references: [id])
  cashierId   String?
  status      OrderStatus @default(OPEN)
  total       Decimal     @db.Decimal(10,2) @default(0.00)
  createdAt   DateTime    @default(now())

  items OrderItem[]
}

model OrderItem {
  id         String   @id @default(cuid())
  orderId    String
  order      Order    @relation(fields: [orderId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  qty        Int      @default(1)
  unitPrice  Decimal  @db.Decimal(10,2)
  finalPrice Decimal  @db.Decimal(10,2)
}

// ---------- ML & Analytics ----------
model TimeseriesDemand {
  id         String   @id @default(cuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  locationId String
  location   Location @relation(fields: [locationId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  ts         DateTime
  orders     Int      @default(0)
  unitsSold  Int      @default(0)
  revenue    Decimal  @db.Decimal(12,2) @default(0.00)

  @@index([tenantId, locationId, productId, ts])
}

model Prediction {
  id               String   @id @default(cuid())
  tenantId         String
  tenant           Tenant   @relation(fields: [tenantId], references: [id])
  locationId       String
  location         Location @relation(fields: [locationId], references: [id])
  productId        String
  product          Product  @relation(fields: [productId], references: [id])
  horizonMinutes   Int
  recommendedPrice Decimal  @db.Decimal(10,2)
  confidence       Decimal  @db.Decimal(5,2)
  createdAt        DateTime @default(now())
}

// ---------- API Keys & Audits ----------
model ApiKey {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  key       String   @unique
  name      String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

model AuditLog {
  id        String    @id @default(cuid())
  tenantId  String
  tenant    Tenant    @relation(fields: [tenantId], references: [id])
  actorType ActorType
  actorId   String?
  action    String
  details   Json?
  createdAt DateTime  @default(now())

  user   User?   @relation("AuditActorUser", fields: [actorId], references: [id])
}

Perfecto Rodrigo 🙌 Te armo un prompt completo y estructurado para Figma, pensado para que al pasarlo a Figma AI (o a un diseñador en Figma) puedan construir el prototipo MVP con todos los layouts, pantallas y componentes descritos en el product-spec.md.

⸻

🎨 Prompt completo para Figma (Dynamic Pricing Bar Platform — MVP)

Instrucción general para Figma AI / Diseñador:
Crea un prototipo navegable en Figma de la plataforma Dynamic Pricing Bar Platform (MVP). Usa estilo SaaS moderno, colores oscuros con acentos neón (verde lima 🔋 y púrpura 🍇) para dar sensación de “bolsa de valores/bar nocturno”.
Tipografía: Inter o Manrope.
Diseño responsive: desktop primero (1440px), adaptable a tablets y mobile.
Componentes base: shadcn/ui + TailwindCSS tokens.

⸻

1) Layouts globales
	•	Header (top nav)
	•	Logo (DynamicBar)
	•	Tenant Switcher (dropdown con logo/nombre del bar)
	•	Notificaciones (icono campana)
	•	User Avatar + menú (Perfil, Configuración, Logout)
	•	Sidebar (izquierda)
Secciones con íconos (lucide-react style):
	1.	Dashboard
	2.	Live Price Board
	3.	Products
	4.	Rules
	5.	Orders
	6.	ML Settings
	7.	Reports
	8.	Users & Roles
	9.	Settings (API Keys, Auditoría)

⸻

2) Pantallas principales

🔑 Auth & Tenant Switcher
	•	Login simple con email/password y botón “Sign in with Google”.
	•	Card centrada, branding con logo y fondo degradado neón.
	•	Tenant Switcher: lista de bares con logo/nombre, botón “+ Create Tenant”.

⸻

📊 Dashboard
	•	Cards con métricas clave:
	•	Ventas por hora (gráfico lineal mini)
	•	Top productos (tabla compacta)
	•	Próximos crashes programados (lista)
	•	Estado del motor (badge: activo/inactivo)
	•	KPI progress bars para “Revenue uplift %” y “Rotación inventario”.

⸻

📺 Live Price Board (TV mode)
	•	Lista de productos (tabla tipo bolsa):
	•	Producto + categoría
	•	Precio actual (grande, en neón)
	•	Variación % (flecha ↑ ↓ verde/rojo)
	•	Countdown si hay crash/promo
	•	Banner superior para alertas en tiempo real: “Crash en Pisco Sour -30%”
	•	Opción fullscreen para monitores/TV.

⸻

🍸 Products
	•	Tabla CRUD:
	•	SKU, Nombre, Categoría, Precio Base, Activo
	•	Botón “+ Add Product” abre modal (nombre, precio, impuestos, elasticidad).
	•	Tabs para filtrar: Activos / Inactivos.
	•	Inline edit para precios base.

⸻

⚙️ Rules
	•	Listado de reglas con:
	•	Nombre, Tipo (time-of-day, floor, ceiling, campaign), Estado (activo/inactivo).
	•	Botón “+ Create Rule” → modal con JSON params y horario selector.
	•	Opción manual: “Lanzar Crash” con slider de duración (5–30 min).

⸻

🧾 Orders
	•	Feed en tiempo casi real:
	•	Ticket ID, Hora, Productos, Total, Estado.
	•	Badge OPEN / PAID / VOID.
	•	Vista detalle al hacer click → items + precios.

⸻

🤖 ML Settings
	•	Panel con sliders:
	•	Horizonte de predicción (15–60 min).
	•	Agresividad del multiplicador (0.5× – 2×).
	•	Toggle activar A/B (ε-greedy).
	•	Card con “Último entrenamiento” (status RUNNING/FAILED).

⸻

📈 Reports
	•	Gráficas:
	•	Revenue uplift por hora (línea comparativa: dinámico vs estático).
	•	Rotación inventario (barras).
	•	% tiempo en crash/promos (dona).
	•	Tabla exportable (CSV/PDF).

⸻

👤 Users & Roles
	•	Tabla:
	•	Email, Nombre, Rol, Estado.
	•	Botón “Invite User” → modal con email + rol (OWNER/ADMIN/MANAGER/BARTENDER/ANALYST).
	•	Chips de roles con colores distintos.

⸻

🔐 Settings (API Keys & Audit)
	•	API Keys:
	•	Lista de claves, estado, botón “Generate Key”.
	•	Audit Log:
	•	Timeline con iconos (user, API, system), acción y fecha.

⸻

3) Componentes (usar estilo shadcn/ui)
	•	Cards (stats, KPIs, login).
	•	Tables con filtros y paginación.
	•	Dialog/Sheet para CRUD rápido.
	•	Tabs para vistas de producto.
	•	Badge para estados.
	•	Progress para métricas (uplift, stock).
	•	Toast/Toaster para alertas.
	•	Countdown Timer animado.

⸻

4) Interacciones
	•	Sidebar con hover expandible.
	•	Pizarra TV → animaciones tipo ticker (marquee lateral).
	•	Crashes → highlight con animación vibrante (shake + flash).
	•	Charts: usar librería estilo Recharts/Chart.js (placeholder).

⸻

5) Branding visual
	•	Paleta:
	•	Fondo oscuro (#0D0D0F)
	•	Neón lima (#C6FF00)
	•	Púrpura acento (#A020F0)
	•	Blanco puro (#FFFFFF)
	•	Grises neutros (#222, #444, #666)
	•	Íconos: lucide-react (minimalistas, lineales).

⸻

✅ Resultado esperado:
Un prototipo navegable en Figma con todas las pantallas conectadas, siguiendo flujo:
Login → Tenant Switcher → Dashboard → (Live Board, Products, Rules, Orders, ML, Reports, Users).