import Course from "../models/Course";
import validator from "validator";
import bcrypt from "bcrypt";
import UserType from "../types/User";
import { isValidEmail, isValidPassword } from "./validations";

export const makeid = (length:number):string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export const calculateGrade = (grade:number, maxGrade:number):string => {
  const percent = (grade/maxGrade) * 100;
  if(percent < 50) {
    return "Failed"
  }else if (percent < 65 && percent > 50) {
    return "Well"
  }else if (percent < 75 && percent > 65) {
    return "Good"
  }else if (percent < 85 && percent > 75) {
    return "Very Good"
  }else {
    return "Excellent"
  }
}
export const findMaximumGrade = (grades:number[]):number => {
  if(grades.length === 0) {
    return -1;
  }
  let max = grades[0]
  for(let i=1;i<grades.length;i++) {
    if(max < grades[i])
      max = grades[i]
  }
  return max
}
export async function validateUser(user:UserType):Promise<Boolean> {
  if(!isValidEmail(user.email as string)) {
      return false;
  }

  if(!isValidPassword(user.password as string)) {
    return false;
  }
  return true;
}

