export default function formatTime(secconds: number) {
    let mins: string | number = Math.floor(secconds / 60);
    let secs: string | number = secconds % 60;
  
    // if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    return `${mins}.${secs}`;
}