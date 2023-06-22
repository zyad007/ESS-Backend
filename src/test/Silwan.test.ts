import { isValidPhone } from "../utils/validations";
import { filter } from "../utils/validations";
import {calculateGrade, findMaximumGrade} from "../utils/utils";
import { validateUser } from "../utils/utils";
import UserType from "../types/User";
import User from "../models/User";

test("Phone Validator", () => {
    let phone:string;
    let expected:boolean;
    //Statement Coverage

    //test case 1
    phone = ""
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 2
    phone = "0102736asd"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 3
    phone = "11027362455"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 4
    phone = "012345"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 5
    phone = "01012345678"
    expected = true;
    expect(isValidPhone(phone)).toBe(expected);
    
    //Condition Coverage

    //test case 1
    phone = ""
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 2
    phone = "00102736245"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 3
    phone = "110102736245"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 4
    phone = "012345"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 5
    phone = "01023456789"
    expected = true;
    expect(isValidPhone(phone)).toBe(expected);

    
    //Multiple Condition Coverage

    //test case 1
    phone = ""
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 2
    phone = "5512345678"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 3
    phone = "5123456789"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 4
    phone = "0512345678"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);
    
    //test case 5
    phone = "012345"
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);

    //test case 6
    phone = "01234567891"
    expected = true;
    expect(isValidPhone(phone)).toBe(expected);

    //test case 7
    phone = "0123456789"
    expected = true;
    expect(isValidPhone(phone)).toBe(expected);

    //Path Coverage

})

test("Filtering Entities", () => {
    let search:string;
    let sort:string;
    let users:UserType[];
    let expected:UserType[];
    //Statement Coverage

    //Test Case 1
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'id'
    expected = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);
    
    //Test Case 2
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'name'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 3
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'email'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);
    //Condition Coverage

    //Test Case 1
    users = [];
    search = "a";
    sort = "id";
    expected = [];
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 2
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'id'
    expected = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);
    
    //Test Case 3
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'name'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 4
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'email'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);
    
    //Multiple Condition Coverage

    //Test Case 1
    users = [];
    search = "a";
    sort = "id";
    expected = [];
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 2
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'id'
    expected = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);
    
    //Test Case 3
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'name'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 4
    users = [{
        id:1,
        name:'hashas',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'h'
    sort = 'name'
    expected = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 5
    users = [{
        id:1,
        name:'zyad',
        email:'hazem@mail.com'
    }];
    search = 'h'
    sort = 'name'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);

    //Test Case 6
    users = [{
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }, {
        id:2,
        name:'ali',
        email:'ali@mail.com'
    }, {
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }];
    search = 'd'
    sort = 'email'
    expected = [{
        id:3,
        name:'ahmed',
        email:'ahmed@mail.com'
    }, {
        id:1,
        name:'zyad',
        email:'zyad@mail.com'
    }]
    expect(filter(search, sort, users).length).toBe(expected.length);
    //Path Coverage

    //Loop Coverage

})

test("Create User Validation", () => {
    let user:UserType;
    let expected:boolean;
    //Statement Coverage

    //Condition Coverage

    //Multiple Condition Coverage

    //Path Coverage

})

test("Calculating Grades", () => {
    let grade:number;
    let expexted:string;
    //Statement Coverage

    //Condition Coverage

    //Multiple Condition Coverage

    //Path Coverage

})

test("Get Max", () => {
    let grades:number[];
    let expexted:number;
    //Statement Coverage

    //Condition Coverage

    //Multiple Condition Coverage

    //Path Coverage

    //Loop Coverage

})
