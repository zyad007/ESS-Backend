import { isValidAge, isValidEmail, isValidName, isValidPhone, isValidPassword } from "../utils/validations";

test("Name Validations", () => {
    // test case 1
    let name = "";
    let expected = false;
    expect(isValidName(name)).toBe(expected);

    // test case 2
    name = "anas123";
    expected = false;
    expect(isValidName(name)).toBe(expected);

    // test case 3
    name = "anas hesham";
    expected = true;
    expect(isValidName(name)).toBe(expected);
})

test("Age Validations", () => {
    // test case 1
    let age = -2;
    let expected = false;
    expect(isValidAge(age)).toBe(expected);

    // test case 2
    age = 12;
    expected = false;
    expect(isValidAge(age)).toBe(expected);

    // test case 3
    age = 62;
    expected = false;
    expect(isValidAge(age)).toBe(expected);

    // test case 4
    age = 22;
    expected = true;
    expect(isValidAge(age)).toBe(expected);
})

test("Phone Validations", () => {
    // test case 1
    let phone = "";
    let expected = false;
    expect(isValidPhone(phone)).toBe(expected);

    // test case 2
    phone = "as1234567";
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);

    // test case 3
    phone = "09024104452";
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);

    // test case 4
    phone = "011401065522";
    expected = false;
    expect(isValidPhone(phone)).toBe(expected);

    // test case 5
    phone = "01140106552";
    expected = true;
    expect(isValidPhone(phone)).toBe(expected);
})

test("Email Validations", () => {
    // test case 1
    let email = "";
    let expected = false;
    expect(isValidEmail(email)).toBe(expected);

    // test case 2
    email = "zyad@anas-com";
    expected = false;
    expect(isValidEmail(email)).toBe(expected);

    // test case 3
    email = "zyad@mail.com";
    expected = true;
    expect(isValidEmail(email)).toBe(expected);
})

test("password Validations", () => {
    // test case 1
    let password = "";
    let expected = false;
    expect(isValidPassword(password)).toBe(expected);

    // test case 2
    password = "zyad";
    expected = false;
    expect(isValidPassword(password)).toBe(expected);

    // test case 3
    password = "zyadbichoyanasahmedadham";
    expected = false;
    expect(isValidPassword(password)).toBe(expected);


    // test case 4
    password = "zyad123456";
    expected = true;
    expect(isValidPassword(password)).toBe(expected);
})