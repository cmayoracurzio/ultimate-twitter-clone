export function abbreviateNumber(value: number): string {
  let newValue: number | string = value;
  if (value >= 1000) {
    const suffixes: string[] = ["", "k", "M", "B", "T"];
    let suffixNum: number = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }

    newValue = newValue.toPrecision(3);
    newValue = newValue.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
    newValue += suffixes[suffixNum];
  }
  return newValue.toString();
}
