import UserType from "../types/User";
import validator from "validator";
import bcrypt from "bcrypt";

export function isValidName(name:string):boolean {

    if(name.length === 0) {    //Empty Name
        return false;
    }else if(/\d/.test(name)) {    //Name Containing Numbers
        return false;
    }else {
        return true;        //Valid Name
    }
}

export function isValidAge(age:number):boolean {
    if(age < 0) {    //Non positive Number
        return false;
    }else if(age < 18 || age > 60) { //Not in Valid range to register
        return false;
    }else {
        return true;    //Valid Age
    }
}
export function isValidPhone(phone:string):boolean {
    const regExp: RegExp = /[a-zA-z]/g;
    if(phone.length === 0){
        return false;
    }else if(regExp.test(phone)) {
        return false;
    }else if(phone[0] !== '0' || phone[1] !== '1') {
        return false;
    }else if(phone.length !== 11){
        return false;
    }else {
        return true;
    }
}
export function isValidEmail(email:string):boolean {
    const regExp: RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    if(email.length === 0) {
        return false;
    }else if(!regExp.test(email)) {
        return false;
    }else {
        return true;
    }
}
export function isValidPassword(password:string):boolean {
    if(password.length === 0) {
        return false;
    }else if(password.length < 8 || password.length > 20) {
        return false;
    }else {
        return true;
    }
}

export function searchUser(search:string, sort:string, users:UserType[]):UserType[] {
    const tempUsers: UserType[] = [];
    
    for(let i=0; i<users.length; i++) {
        if(users[i].name?.includes(search) || users[i].email?.includes(search))
            tempUsers.push(users[i])
    }

    if(sort === 'id') {
        return tempUsers.sort((a, b) => (Number(a.id) > Number(b.id)) ? 1 : -1 );
    }

    if(sort === 'name') {
        return tempUsers.sort((a, b) => (String(a.name) > String(b.name)) ? 1 : -1 );
    }

    if(sort === 'email') {
        return tempUsers.sort((a, b) => (String(a.email) > String(b.email)) ? 1 : -1 );
    }

    return tempUsers;
}

export async function validateUser(user:UserType, confirmPassword:string):Promise<Boolean> {
    if(!validator.isEmail(user.email as string)) {
        return false;
    }

    if(Number(user.age) < 21) {
        return false;
    }

    if(Number(user.password?.length) < 8) {
        return false
    }

    const passwordHash: string = await bcrypt.hash(confirmPassword, 8);

    if(passwordHash !== user.password) {
        return false;
    }
    
    return true;
}