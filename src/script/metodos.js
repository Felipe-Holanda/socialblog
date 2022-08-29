export class formtData{
  static padTo2Digits(num){
    return num.toString().padStart(2, '0')
  }
  static strDate(date) {        
    return [
      formtData.padTo2Digits(date.getDate()),
      formtData.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
}