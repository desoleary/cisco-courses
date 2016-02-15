module demo_02_03a {
    var person;
    person = 'John Papa';
    console.log(person.substring(1,4));

    person = {
        name: 'Colleen',
        age:  25
    };
    console.log(person.substring(1,4)); // Runtime Error!
}

//module demo_02_03b {
//    var person :string;
//    person = 'John Papa';
//    console.log(person.substring(1,4));
//
//    // Compile Error!
//    person = {
//        name: 'Colleen',
//        age:  25
//    };
//    console.log(person.substring(1,4));
//}