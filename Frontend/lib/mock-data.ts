export const vehicle = {
  name: 'Tata Nexon EV',
  currentSoC: 42,
  targetSoC: 80,
  batteryCapacity: 60, // kWh
  requiredEnergy: 23.4, // kWh
  departure: '7:00 PM',
  chargingPower: 11, // kW
  estimatedTime: '2h 30m',
}

export const recommendation = {
  windowStart: '2:00 PM',
  windowEnd: '4:30 PM',
  renewable: 82,
  gridDemand: 'Low' as const,
  rate: 4.2, // ₹/kWh
  savings: 27, // ₹
  co2Avoided: 1.8, // kg
}

export const greenness = {
  score: 87,
  renewable: 82,
  gridImpact: 'Low',
  co2Avoided: 1.8,
}

export const snapshot = {
  solar: 78,
  wind: 64,
  gridLoad: 42,
}

export const todayImpact = {
  savings: 27,
  co2Avoided: 1.8,
  renewableUsed: 82,
}

export type EnergyPoint = {
  time: string
  hour: number
  renewable: number
  price: number
  solar: number
  wind: number
  gridDemand: number
}

// 24-hour time-series. Renewable peaks midday, price dips midday, grid demand
// peaks morning + evening. Recommended window ~14:00-16:30.
export const energySeries: EnergyPoint[] = [
  { hour: 0, time: '12 AM', renewable: 28, price: 6.2, solar: 0, wind: 58, gridDemand: 46 },
  { hour: 1, time: '1 AM', renewable: 30, price: 5.9, solar: 0, wind: 62, gridDemand: 42 },
  { hour: 2, time: '2 AM', renewable: 32, price: 5.5, solar: 0, wind: 66, gridDemand: 38 },
  { hour: 3, time: '3 AM', renewable: 33, price: 5.2, solar: 0, wind: 68, gridDemand: 36 },
  { hour: 4, time: '4 AM', renewable: 35, price: 5.0, solar: 2, wind: 70, gridDemand: 38 },
  { hour: 5, time: '5 AM', renewable: 38, price: 5.4, solar: 8, wind: 68, gridDemand: 48 },
  { hour: 6, time: '6 AM', renewable: 44, price: 6.1, solar: 22, wind: 64, gridDemand: 62 },
  { hour: 7, time: '7 AM', renewable: 48, price: 7.2, solar: 36, wind: 60, gridDemand: 78 },
  { hour: 8, time: '8 AM', renewable: 54, price: 7.8, solar: 50, wind: 56, gridDemand: 84 },
  { hour: 9, time: '9 AM', renewable: 60, price: 6.9, solar: 62, wind: 54, gridDemand: 74 },
  { hour: 10, time: '10 AM', renewable: 68, price: 5.8, solar: 72, wind: 52, gridDemand: 62 },
  { hour: 11, time: '11 AM', renewable: 74, price: 5.1, solar: 80, wind: 50, gridDemand: 54 },
  { hour: 12, time: '12 PM', renewable: 78, price: 4.7, solar: 86, wind: 48, gridDemand: 50 },
  { hour: 13, time: '1 PM', renewable: 80, price: 4.4, solar: 90, wind: 50, gridDemand: 46 },
  { hour: 14, time: '2 PM', renewable: 82, price: 4.2, solar: 92, wind: 52, gridDemand: 42 },
  { hour: 15, time: '3 PM', renewable: 83, price: 4.1, solar: 88, wind: 54, gridDemand: 41 },
  { hour: 16, time: '4 PM', renewable: 80, price: 4.3, solar: 78, wind: 58, gridDemand: 44 },
  { hour: 17, time: '5 PM', renewable: 72, price: 5.6, solar: 60, wind: 62, gridDemand: 66 },
  { hour: 18, time: '6 PM', renewable: 64, price: 7.4, solar: 40, wind: 66, gridDemand: 86 },
  { hour: 19, time: '7 PM', renewable: 58, price: 8.1, solar: 20, wind: 70, gridDemand: 92 },
  { hour: 20, time: '8 PM', renewable: 52, price: 7.6, solar: 6, wind: 72, gridDemand: 82 },
  { hour: 21, time: '9 PM', renewable: 48, price: 6.8, solar: 0, wind: 74, gridDemand: 70 },
  { hour: 22, time: '10 PM', renewable: 44, price: 6.2, solar: 0, wind: 76, gridDemand: 58 },
  { hour: 23, time: '11 PM', renewable: 40, price: 5.8, solar: 0, wind: 72, gridDemand: 50 },
]

export const recommendedWindow = { startHour: 14, endHour: 16.5 }

export const optimizationFactors = [
  { label: 'Renewable Energy', value: 82 },
  { label: 'Low Electricity Cost', value: 91 },
  { label: 'Low Grid Stress', value: 76 },
]

export const optimizationScore = 88

export const scheduleOptions = [
  {
    id: 'cheapest',
    label: 'Cheapest',
    cost: 58,
    renewable: 61,
    window: '3:00 AM – 5:30 AM',
    note: 'Lowest tariff overnight',
  },
  {
    id: 'best',
    label: 'Best Overall',
    cost: 64,
    renewable: 82,
    window: '2:00 PM – 4:30 PM',
    note: 'Balanced cost, renewables & deadline',
    recommended: true,
  },
  {
    id: 'greenest',
    label: 'Greenest',
    cost: 72,
    renewable: 94,
    window: '1:00 PM – 3:30 PM',
    note: 'Maximum renewable energy',
  },
]

export const forecast = {
  solar: { level: 'High', peak: '2:30 PM' },
  wind: { level: 'Moderate', peak: '11:00 PM' },
  grid: { level: 'Low', current: 42 },
  aiText:
    'Renewable generation is expected to peak between 1:30 PM and 4:00 PM. Grid demand is expected to remain below average during this period, making it an ideal window for charging.',
  confidence: 91,
}

export const sessionSummary = {
  total: 24,
  energy: 382, // kWh
  saved: 486, // ₹
  co2: 29.4, // kg
}

export type Session = {
  date: string
  duration: string
  energy: number
  cost: number
  renewable: number
  co2: number
  status: 'Optimized' | 'Completed'
}

export const sessions: Session[] = [
  { date: 'Today', duration: '2h 30m', energy: 23.4, cost: 64, renewable: 82, co2: 1.8, status: 'Optimized' },
  { date: 'Yesterday', duration: '1h 50m', energy: 18.2, cost: 51, renewable: 76, co2: 1.2, status: 'Optimized' },
  { date: 'Sep 10', duration: '2h 10m', energy: 21.7, cost: 69, renewable: 68, co2: 1.0, status: 'Completed' },
  { date: 'Sep 8', duration: '2h 45m', energy: 26.1, cost: 58, renewable: 88, co2: 2.1, status: 'Optimized' },
  { date: 'Sep 6', duration: '1h 30m', energy: 15.4, cost: 47, renewable: 71, co2: 0.9, status: 'Optimized' },
  { date: 'Sep 4', duration: '2h 05m', energy: 20.3, cost: 73, renewable: 59, co2: 0.8, status: 'Completed' },
  { date: 'Sep 2', duration: '2h 20m', energy: 22.8, cost: 61, renewable: 79, co2: 1.5, status: 'Optimized' },
]

export type Station = {
  id: string
  name: string
  status: 'Available' | 'Busy'
  connectorsAvailable: number
  connectorsTotal: number
  load: number
  renewable: number
  tariff: number
  distance: string
}

export const stations: Station[] = [
  {
    id: 'SG01',
    name: 'GreenCharge Station — SG01',
    status: 'Available',
    connectorsAvailable: 8,
    connectorsTotal: 12,
    load: 42,
    renewable: 84,
    tariff: 4.2,
    distance: '1.2 km',
  },
  {
    id: 'SG02',
    name: 'GreenCharge Station — SG02',
    status: 'Busy',
    connectorsAvailable: 2,
    connectorsTotal: 12,
    load: 78,
    renewable: 61,
    tariff: 5.8,
    distance: '2.6 km',
  },
  {
    id: 'SG03',
    name: 'GreenCharge Station — SG03',
    status: 'Available',
    connectorsAvailable: 6,
    connectorsTotal: 10,
    load: 55,
    renewable: 73,
    tariff: 4.9,
    distance: '3.4 km',
  },
  {
    id: 'SG04',
    name: 'GreenCharge Station — SG04',
    status: 'Available',
    connectorsAvailable: 9,
    connectorsTotal: 12,
    load: 34,
    renewable: 90,
    tariff: 3.9,
    distance: '4.1 km',
  },
]
