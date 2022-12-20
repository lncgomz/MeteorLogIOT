export default interface IMeteorlogData {
  id: any | null,
  deviceId: string,
  temperature: number,
  humidity: number,
  createdAt: Date
}
export interface MeteorLogRow {
  id: any | null,
  deviceId: string,
  temperature: number,
  humidity: number,
  date: string,
  time: string
}