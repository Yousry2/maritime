export function convertTimeDifferenceToDate(timeDifferenceInMilliseconds: number) {
     const seconds = Math.floor(timeDifferenceInMilliseconds / 1000),
          minutes = Math.floor(seconds / 60),
          hours = Math.floor(minutes / 60),
          days = Math.floor(hours / 24),
          months = Math.floor(days / 30);

     return {
          seconds: seconds % 60,
          minutes: minutes % 60,
          hours: hours % 24,
          days: days % 30,
          months: months % 12,
     };
}
