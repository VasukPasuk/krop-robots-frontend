export function countDaysAfter(targetDate: string): number {
  const target = new Date(targetDate);
  const current = new Date();
  const differenceInTime = current.getTime() - target.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  return differenceInDays > 0 ? differenceInDays : 0;
}
