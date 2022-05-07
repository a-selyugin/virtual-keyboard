export default class Key {
  constructor(name, languages, engKey, engKeyShifted, rusKey, rusKeyShifted, exceptionsArray) {
    this.name = name;
    this.languages = languages;
    this.engKey = engKey;
    this.engKeyShifted = engKeyShifted;
    this.rusKey = rusKey;
    this.rusKeyShifted = rusKeyShifted;
    this.eng = {
      lowerCase: engKey,
      shifted: engKeyShifted,
      caps: exceptionsArray.includes(engKey) ? engKey : engKey.toUpperCase(),
      shiftPlusCaps: exceptionsArray
        .includes(engKey) ? engKey : engKeyShifted.toLowerCase(),
    };
    this.rus = {
      lowerCase: rusKey,
      shifted: rusKeyShifted,
      caps: exceptionsArray.includes(rusKey) ? rusKey : rusKey.toUpperCase(),
      shiftPlusCaps: exceptionsArray
        .includes(rusKey) ? rusKey : rusKeyShifted.toLowerCase(),
    };
  }
}
